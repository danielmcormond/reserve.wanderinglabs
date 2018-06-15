class AvailabilityRequest < ApplicationRecord
  extend Enumerize

  belongs_to :user
  belongs_to :facility
  has_many :availability_matches
  has_many :availability_notifications

  serialize :specific_site_ids, Array
  enumerize :site_type, in: %i[group tent_walk_in tent other rv rv_tent], predicates: { prefix: true }

  enumerize :status, in: %i[active paused canceled ended], predicates: { prefix: true }

  scope :active, (-> { where(status: :active).where('date_end > ?', Time.now.to_date) })

  scope :premium, (-> { includes(:user).where(users: { premium: true }) })
  scope :not_premium, (-> { includes(:user).where(users: { premium: false }) })

  after_create :welcome_email

  validates :user, presence: true
  validates :stay_length, presence: true

  def available_matches(notified = false)
    availability_matches
      .send(notified ? 'notified' : 'notifiable')
      .available
      .includes(site: [:facility])
      .order('avail_date ASC')
  end

  def cache_site_ids(commit = false)
    self.site_ids = site_matcher.matching_site_ids
    save if commit
    site_ids.size
  end

  def site_matcher
    SiteMatcher.new(self)
  end

  def availability_matcher
    last_import = facility.availability_imports.last
    return if last_import.nil?
    AvailabilityMatcher::Index.call(last_import, self)
  end

  def availability_finder
    AvailabilityMatcher::Finder.new(nil, self).matching_availabilities
  end

  def welcome_email
    user.notification_methods.each do |nm|
      next unless nm.notification_type == :email
      next if imported?
      NotifierMailer.new_availability_request(self.reload, nm).deliver
    end
  end

  def sms_body
    alert = []
    alert << "-- Availability Alert --\n#{serialized[:facility][:name]}"
    alert << "Date: #{last_match[:avail_date]}"
    alert << "Nights: #{last_match[:length]}"
    alert << "Site: #{last_match[:site][:site_num]}"
    alert << "#{ENV['RESERVE_URL']}/t/#{last_match[:short]}"
    if available_matches.count > 1
      alert << "(Plus #{available_matches.count - 1} other options)"
    end
    alert.join("\n")
  end

  def serialized
    @_a_r_s ||= AvailabilityRequestSerializer.new(self).serializable_hash
  end

  def last_match
    @_l_m ||= AvailabilityMatchSerializer.new(available_matches.first).serializable_hash
  end
end
