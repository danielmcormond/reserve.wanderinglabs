class Agency < ApplicationRecord
  has_many :facilities
  has_many :facility_groups
end
