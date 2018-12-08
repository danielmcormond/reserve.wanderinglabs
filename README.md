# Notification system for campsite availabilities

A service that uses api's or screen scrapes camping reservation websites. A front end allows users to creation notification requests for campsite availabilities. The service then notifies them by email or text when/if a campsite becomes available.

#### http://reserve.wanderinglabs.com

Works with the following:
- Reserve America
- Recreation.gov
- Reserve California
- Camas (Washington State Parks)

### /frontend
  - React UI

### /rails
  - Ruby on Rails
  - API
  - Availability Matching
  - Notifications

### /scrapers
  - nodejs
  - Different website and API scrapers


This is the third iteration of the service. It originally started out for my own personal use to get campsites in the Florida Keys and as a way to both learn and experiment with new technologies.

Version 1: https://github.com/tiwatson/wanderinglabs-availability
- Ruby on Rails with an AngularJs front end.

Version 2: https://github.com/tiwatson/wandering-labs-availability-2
- Node.js with an AngularJs front end. "Serverless" using AWS Lambda, API Gateway, DynamoDB

Version 3: https://github.com/tiwatson/reserve.wanderinglabs
- Ruby on Rails backend/api, node.js scrapers, React/Redux front end.
