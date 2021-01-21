class Agency < ApplicationRecord
  has_many :facilities
  has_many :facility_groups

  scope :active, (-> { where(active: true) })

  def cache_active
    update(active: facilities.active.count.positive?)
  end
end
