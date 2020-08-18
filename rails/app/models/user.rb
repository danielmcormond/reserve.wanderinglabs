class User < ApplicationRecord
  has_many :notification_methods, dependent: :destroy
  has_many :availability_requests, dependent: :destroy
  has_many :payments

  validates :email, presence: true, uniqueness: true

  after_create :init_notification_method

  def mark_premium
    update_attributes(premium: true, premium_until: 1.year.from_now, sms_limit: sms_limit + 250)
  end

  def generate_auth_token(force = false)
    return auth_token if force == false && auth_token.present?
    token = SecureRandom.hex
    update_columns(auth_token: token)
    token
  end

  def invalidate_auth_token
    update_columns(auth_token: nil)
  end

  def generate_login_token
    token = SecureRandom.hex
    update_attributes(login_token: token)
    token
  end

  def init_notification_method
    return if notification_methods.count.positive?
    notification_methods.create(notification_type: :email, param: email, locked: true)
  end

  def sms_under_limit
    sms_count < sms_limit
  end

  def sms_cache
    count = AvailabilityNotification
      .where(throttled: false)
      .where(notification_method_id: notification_methods
      .where(notification_type: :sms)
      .map(&:id))
      .count
    update_attributes(sms_count: count)
  end


  # Little helpful admin methods
  def login_url
    generate_login_token unless login_token.present?
    ENV['RESERVE_URL'] + '/sign-in/' + login_token
  end

  def settings_url
    login_url + "/settings"
  end

  def ar
    availability_requests.map { |ar| ar.serialized }
  end

  def self.e(email)
    where(email: email).first
  end

  def premium_welcome
    NotifierMailer.premium_welcome(self).deliver!
  end
end
