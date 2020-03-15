class AvailabilitySerializer < ActiveModel::Serializer
  attributes :id, :avail_at, :avail_date, :avail_min, :length
  belongs_to :site

  def avail_date
    object.avail_at.min
  end

  def avail_min
    object.avail_at.min
  end

  def length
    object.avail_at.to_a.size
  end
end
