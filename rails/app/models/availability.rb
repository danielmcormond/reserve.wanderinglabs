class Availability < ApplicationRecord
  belongs_to :availability_import
  belongs_to :site

  scope :avail_length, (lambda do |avail_length|
    where('(upper(avail_at) - lower(avail_at)) >= ?', avail_length)
  end)
end
