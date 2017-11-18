class Sns
  require 'aws-sdk'

  def self.publish(facility)
    sns = Aws::SNS::Resource.new
    topic = sns.topic(facility.sns_scraper)
    topic.publish(
      subject: 'Test Subject',
      message: facility.scraper_details.to_json
    )
  end
end
