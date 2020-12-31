class StatsMonth
  @queue = :other

  def self.perform
    notifier = Slack::Notifier.new(
      ENV['SLACK_HOOK'],
      channel: '#statsmonth',
      username: 'statBot',
    )
    notifier.ping output
  end

  def self.output
    currency
  end

  def self.months
    Payment.approved.select("to_char(created_at,'YYYY-MM') as yyyymm, sum(total) as sum_total").group("to_char(created_at,'YYYY-MM')").order("to_char(created_at,'YYYY-MM')")
  end

  def self.currency
    months.map do |month|
      sum_formatted = ActionController::Base.helpers.number_to_currency(month["sum_total"])
      "#{month["yyyymm"]}: #{sum_formatted}"
    end.join("\n")
  end
end

# F: #{Facility.active_facilities.count}
