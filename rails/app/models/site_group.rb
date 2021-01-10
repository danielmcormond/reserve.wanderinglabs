class SiteGroup < ApplicationRecord
  has_many :sites
  belongs_to :facility
end
