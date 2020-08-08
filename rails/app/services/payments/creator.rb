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
    payment = Payment.new(payment_params)
    if payment.save
      if user
        user.mark_premium
        NotifierMailer.premium_welcome(user).deliver!
      end
    else
      Rails.logger.fatal("CREATE PAYMENT: #{payment.to_json}")
    end
    payment
  end

  def payment_params
    {
      user: user,
      provider: :paypal,
      status: paypal_payment.state,
      total: paypal_payment.transactions[0].amount.total,
      email: paypal_payment.payer.payer_info.email,
      params: params,
      details: paypal_payment.to_hash,
      paid_at: Time.now,
    }
  end

  def paypal_payment
    # Rails.logger.warn("PAYMENT - #{params_id} - #{ENV['PAYPAL_ID']} - #{params.inspect}")
    @_paypal ||= PayPal::SDK::REST::Payment.find(params_id)
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
