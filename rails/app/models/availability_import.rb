class AvailabilityImport < ApplicationRecord
  belongs_to :facility
  belongs_to :site_group, optional: true
  has_many :availabilities

end
