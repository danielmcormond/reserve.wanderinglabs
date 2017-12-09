class AvailabilitySerializer < ActiveModel::Serializer
  attributes :id, :avail_date
  belongs_to :site
end
