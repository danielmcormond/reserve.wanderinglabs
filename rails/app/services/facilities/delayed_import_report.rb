module Facilities
  class DelayedImportReport
    @queue = :other

    attr_reader :scope

    def initialize(scope = Facility.active.inservice.active_facilities)
      @scope = scope
    end

    def perform
      notifier = Slack::Notifier.new(
        ENV['SLACK_HOOK'],
        channel: '#scraper',
        username: 'WanderingBot'
      )
      notifier.ping output.pretty_inspect
    end

    def output
      scope.order(last_import: :asc).limit(100).map do |facility|
        facility.slice(:id, :type, :name, :sub_name, :last_import, :last_scrape_attempt).merge(active_requests: facility.availability_requests.count)
      end
    end
  end
end
