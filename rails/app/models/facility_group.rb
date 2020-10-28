class FacilityGroup < ApplicationRecord
  has_many :facilities
  belongs_to :agency
end
