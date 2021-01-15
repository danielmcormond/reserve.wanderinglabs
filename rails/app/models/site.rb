class Site < ApplicationRecord
  extend Enumerize
  has_many :availabilities, dependent: :destroy
  has_many :availability_matches, dependent: :destroy
  belongs_to :facility
  belongs_to :site_group, optional: true

  enumerize :site_type,
            in: %i[group tent_walk_in tent other rv],
            predicates: { prefix: true }

  enumerize :site_layout,
            in: %i[back_in pull_thru other head_in hike_in],
            predicates: { prefix: true }

  scope :lookup, (->(start) { where('site_num ILIKE ?', "%#{start}%").order('site_num ASC').limit(25) })

  scope :electric, (->(lngth) { where('electric >= ?', lngth) })
  scope :site_length, (->(lngth) { where('length >= ?', lngth) })
end
