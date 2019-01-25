GRAYLOG = GELF::Notifier.new(
  '157.230.59.29',
  12_201,
  'WAN',
  host: "rails-#{Rails.env}",
  facility: 'rails',
)
