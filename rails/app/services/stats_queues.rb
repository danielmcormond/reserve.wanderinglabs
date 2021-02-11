class StatsQueues
  @queue = :stats

  def self.perform
    delay = Resque.peek('matcher', 0, 10).select { |job| job['args'][1] }.map { |job| Time.now - Time.parse(job['args'][1]) }
    delay_avg = delay.size.zero? ? 0 : (delay.reduce(:+).to_f / delay.size).round(2)

    return if delay_avg < 30

    output = <<~OUTPUT
      HIGH QUEUE: #{delay_avg}s :: #{Resque.size('matcher')}
    OUTPUT

    notifier = Slack::Notifier.new(
      ENV['SLACK_HOOK'],
      channel: '#stats',
      username: 'statBot',
    )
    notifier.ping output
  end
end
