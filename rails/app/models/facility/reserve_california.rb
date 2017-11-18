class Facility::ReserveCalifornia < Facility
  def park_id
    details['park_id']
  end

  def sub_name

  end

  def sns_scraper
    ENV['AWS_SNS_SCRAPER_RC']
  end
end
