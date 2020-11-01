class ReserveUrl
  attr_reader :availability_match

  def initialize(availability_match)
    @availability_match = availability_match
  end

  def facility
    @facility ||= availability_match.facility
  end

  def reserve_class
    "Reserve::#{facility.class.name.split("::").last}".constantize
  end

  def params
    reserve_class.new(availability_match).params
  end
end
