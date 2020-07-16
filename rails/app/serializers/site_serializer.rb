class SiteSerializer < ActiveModel::Serializer
  attributes :id, :site_num, :site_type, :water, :sewer, :electric, :length, :loop, :site_type2, :ada, :premium
  has_many :availabilities, if: -> { @instance_options[:render_availabilities] }
  belongs_to :facility, if: -> { @instance_options[:render_facility] }

  def loop
    return unless object.details.is_a?(Hash)

    object.details.try(:[], 'Loop')
  end

  def site_type2
    return unless object.details.is_a?(Hash)

    object.details.try(:[], 'SiteType')
  end
end
