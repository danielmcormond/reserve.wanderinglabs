class User < ApplicationRecord
  has_many :notification_methods, dependent: :destroy
  has_many :availability_requests, dependent: :destroy
  has_many :payments

  validates :email, presence: true, uniqueness: true

  after_create :init_notification_method

  def admin?
    ENV['ADMIN_IDS']&.split(",")&.map(&:to_i)&.include?(id) == true
  end

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

  def sms_over_limit
    !sms_under_limit
  end
  alias sms_over_limit? sms_over_limit

  def sms_under_limit
    sms_count < sms_limit
  end

  def sms_cache
    update(sms_count: sms.count)
  end

  def sms
    AvailabilityNotification
      .where(throttled: false)
      .where(
        notification_method_id: notification_methods.where(notification_type: :sms).map(&:id)
      )
  end

  def sms_realtime
    @sms_realtime ||= notification_methods.sum(&:sms_count)
  end

  def sms_reset(realtime = false)
    new_count = realtime ? sms_realtime : [sms_limit, sms_realtime].max
    update(sms_limit: new_count) if realtime
    sms.offset(new_count).update_all(throttled: true)
    sms_cache
  end

  def web
    AvailabilityNotification
      .where(throttled: false)
      .where(
        notification_method_id: notification_methods.where(notification_type: :web).map(&:id)
      )
  end

  def web_cache
    update(web_count: web.count)
  end

  # Little helpful admin methods
  def login_url
    generate_login_token unless login_token.present?
    ENV['RESERVE_URL'] + '/sign-in/' + login_token
  end

  def settings_url
    login_url + "/settings"
  end

  def ar(active = true)
    scope = availability_requests
    scope = scope.active if active
    scope.map { |ar| ar.serialized }
  end

  def self.e(email)
    where(email: email).first
  end

  def premium_welcome
    NotifierMailer.premium_welcome(self).deliver!
  end

  def about
    {
      email: email,
      created_at: created_at,
      request_count: availability_requests.count,
      payments: payments.sum(:total),
      payments_dates: payments.map(&:created_at),
      last: availability_requests.last.created_at,
      sms_limit: sms_limit,
      sms_count: sms_count,
      sms_realtime: sms_realtime
    }
  end

  def sms_add(number)
    notification_methods.create(notification_type: :sms, param: number)
  end

  def self.n(c)
    User.where('sms_count >= sms_limit').offset(c).first
  end
end
