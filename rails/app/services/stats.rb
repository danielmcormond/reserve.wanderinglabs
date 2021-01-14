class Stats
  @queue = :other

  Time.zone = 'MST'

  FACILITIES = [
    Facility::MaricopaCounty,
    Facility::Rec1,
    Facility::ReserveCalifornia,
    Facility::ReserveAmerica,
    Facility::RecreationGovBa,
    Facility::UseDirect
  ].freeze

  TIMEFRAMES = [
    {
      name: 'total',
      value: ->{ Payment.approved.first.created_at }
    },
    {
      name: 'Year',
      value: ->{ 365.days.ago }
    },
    {
      name: 'YTD',
      value: -> { Time.zone.now.at_beginning_of_year }
    },
    {
      name: 'Month',
      value: -> { 1.month.ago }
    },
    {
      name: 'MTD',
      value: -> { Time.zone.now.at_beginning_of_month }
    },
    {
      name: '24hrs',
      value: -> { 1.day.ago }
    },
    {
      name: 'Day',
      value: -> { Time.zone.now.at_beginning_of_day }
    },
    {
      name: 'Hour',
      value: -> { 1.hour.ago }
    }
  ].freeze

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
    TIMEFRAMES.map do |timeframe|
      ago = timeframe[:value].call
      duration = (0.day.ago - ago).round / 86400
      sum = Payment.approved.where('created_at > ?', ago).sum(:total)
      sum_per_day = if duration > 1
                      sum / duration
                    else
                      '-'
                    end
      sum_formatted = ActionController::Base.helpers.number_to_currency(sum)
      sum_per_day_formatted = ActionController::Base.helpers.number_to_currency(sum_per_day)
      "#{timeframe[:name]}: #{sum_formatted} (#{sum_per_day_formatted})"
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
