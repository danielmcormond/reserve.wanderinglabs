class ApplicationMailer < ActionMailer::Base
  include Resque::Mailer
  default from: 'info@wanderinglabs.com'
  layout 'mailer'
end
