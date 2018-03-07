class Payments::Sync
  attr_reader :paypal_payment

  def initialize(paypal_payment)
    @paypal_payment = paypal_payment
  end

  def sync
    if exists?
      puts "Payment already exists.. #{paypal_payment.id}"
      return
    end

    puts "Creating Payment.. #{paypal_payment.id} / #{paypal_payment.create_time}"
    Payments::Creator.create(id: paypal_payment.id)
  end

  def exists?
    Payment.where('details @> ?', { id: paypal_payment.id }.to_json).count.positive?
  end

  def self.sync
    paypal_payments.each do |p|
      new(p).sync
    end
    nil
  end

  def self.paypal_payments
    PayPal::SDK::REST::Payment.all(count: 10).payments
  end
end
