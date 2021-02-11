class Payments::Creator
  attr_reader :params, :current_user

  def self.create(params, current_user = nil)
    new(params, current_user).create
  end

  def initialize(params, current_user = nil)
    @params = params.deep_symbolize_keys
    @current_user = current_user
  end

  def user
    current_user || User.find_or_create_by(email: paypal_payment.payer.payer_info.email)
  end

  def exists?
    Payment.where('details @> ?', { id: params_id }.to_json).count.positive?
  end

  def create
    payment = Payment.create(user: user, provider: :paypal, params: params)

    if payment.update_attributes(payment_params)
      if user
        if user.premium?
          sms_over_limit = user.sms_over_limit?
          user.mark_premium
          user.update(feature_web_notifications: true)
          NotifierMailer.premium_again(user, sms_over_limit).deliver!
        else
          user.mark_premium
          NotifierMailer.premium_welcome(user).deliver!
        end
      end
    else
      Rails.logger.fatal("CREATE PAYMENT: #{payment.to_json}")
    end

    Resque.enqueue(Stats)
    payment
  end

  def payment_params
    {
      status: paypal_payment.state,
      total: paypal_payment.transactions[0].amount.total,
      email: paypal_payment.payer.payer_info.email,
      details: paypal_payment.to_hash,
      paid_at: Time.now
    }
  end

  def paypal_payment
    # Rails.logger.warn("PAYMENT - #{params_id} - #{ENV['PAYPAL_ID']} - #{params.inspect}")
    @paypal_payment ||= PayPal::SDK::REST::Payment.find(params_id)
  end

  def params_id
    params.dig(:id) || params.dig(:details, :paymentID) || params.dig(:payment, :details, :paymentID)
  end
end

__END__

pc = Payments::Creator.new(params[0])

failed_params.map { |p| Payments::Creator.new(p).create }

failed_params = params.select { |p| !Payments::Creator.new(p).exists? }

Payments::Creator.new(failed_params[0]).create
