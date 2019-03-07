class Stats
  @queue = :other

  FACILITIES = [
    Facility::Camis,
    Facility::ReserveCalifornia,
    Facility::ReserveAmerica,
    Facility::RecreationGovBa,
    Facility::PinellasCounty,
  ].freeze

  TIMEFRAMES = {
    year: 1.year,
    month: 1.month,
    week: 1.week,
    day: 1.day,
    hour: 1.hour,
  }.freeze

  def self.perform
    notifier = Slack::Notifier.new(
      ENV['SLACK_HOOK'],
      channel: '#stats',
      username: 'statBot',
    )
    notifier.ping output
  end

  def self.output
    <<~OUTPUT
      Payments: #{Payment.count} / #{Payment.where('created_at > ?', 1.week.ago).count} / #{Payment.where('created_at > ?', 1.day.ago).count} / #{Payment.where('created_at > ?', 1.hour.ago).count}
      $: #{currency}
      AvailabilityRequests:       #{AvailabilityRequest.active.count} / #{AvailabilityRequest.where('created_at > ?', 1.day.ago).active.count}/ #{AvailabilityRequest.where('created_at > ?', 1.hour.ago).active.count}
      AvailabilityMatches:        #{AvailabilityMatch.count} / #{AvailabilityMatch.where('created_at > ?', 1.day.ago).count}/ #{AvailabilityMatch.where('created_at > ?', 1.hour.ago).count}
      AvailabilityMatchClick:     #{AvailabilityMatchClick.count} / #{AvailabilityMatchClick.where('created_at > ?', 1.day.ago).count}/ #{AvailabilityMatchClick.where('created_at > ?', 1.hour.ago).count}
      AvailabilityMatchClick (A): #{AvailabilityMatchClick.available.count} / #{AvailabilityMatchClick.where('created_at > ?', 1.day.ago).available.count}/ #{AvailabilityMatchClick.where('created_at > ?', 1.hour.ago).available.count}
      #{imports}
    OUTPUT
  end

  def self.currency
    TIMEFRAMES.map do |frame, duration|
      sum = Payment.where('created_at > ?', duration.ago).sum(:total)
      "#{frame}: #{ActionController::Base.helpers.number_to_currency(sum)} (#{ActionController::Base.helpers.number_to_currency(sum / 1.day)})"
    end.join("\n")
  end

  def self.imports
    i = []
    Stats::FACILITIES.each do |klass|
      ids = klass.pluck(:id)
      i << "#{klass}: #{AvailabilityImport.where(facility_id: ids).count} / #{AvailabilityImport.where(facility_id: ids).where('created_at > ?', 1.day.ago).count} / #{AvailabilityImport.where(facility_id: ids).where('created_at > ?', 1.hour.ago).count}"
    end
    i.join("\n")
  end
end

# F: #{Facility.active_facilities.count}
