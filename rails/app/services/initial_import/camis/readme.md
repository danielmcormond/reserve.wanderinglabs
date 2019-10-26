agency = Agency.create({
  name: "Washington State Parks",
  details: {
    'url': 'https://washington.goingtocamp.com'
  }
})


curl 'https://washington.goingtocamp.com/api/maps/mapdatabyid' -H 'content-type: application/json' --data-binary '{"mapId":-2147483390,"completedDate":"2019-10-22T16:09:54.306Z","startDate":"2019-10-22T00:00:00","endDate":"2019-01-23T00:00:00","releasePersonalInformation":false,"isReserving":true,"getDailyAvailability":false,"partySize":1,"filterData":"[]"}' --compressed

a.facilities.each do |f|
  begin
    InitialImport::Camis::FacilitySites.new(f).import
  rescue => e
    puts "FAIL"
  end
end




curl 'https://reserve.southcarolinaparks.com/aiken/camping/' -H 'authority: reserve.southcarolinaparks.com' -H 'cache-control: max-age=0' -H 'origin: https://reserve.southcarolinaparks.com' -H 'upgrade-insecure-requests: 1' -H 'content-type: application/x-www-form-urlencoded' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36' -H 'sec-fetch-mode: navigate' -H 'sec-fetch-user: ?1' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'sec-fetch-site: same-origin' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9,cs;q=0.8' --data 'stage=1&park_id=1&paKeys=&joinList=false&readPolicy=false&coupon=&firstname=&lastname=&priAdd1=&priCity=&priState=&priZip=&phone1=&priEmail=&cardAddress=&cardCity=&cardState=&cardName=&cardZip=&date_range=2019-10-29+to+2019-10-31&next=true' --compressed
