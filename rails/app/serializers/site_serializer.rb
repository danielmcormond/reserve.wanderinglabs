class SiteSerializer < ActiveModel::Serializer
  attributes :id, :site_num, :site_type, :water, :sewer, :electric, :length, :loop, :site_type2, :ada, :premium

  def loop
    object.details.try(:[], 'Loop')
  end

  def site_type2
    object.details.try(:[], 'SiteType')
  end
end
