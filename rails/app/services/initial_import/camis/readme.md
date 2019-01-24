agency = Agency.create({
  name: "Washington State Parks",
  details: {
    'url': 'https://washington.goingtocamp.com'
  }
})


curl 'https://washington.goingtocamp.com/api/maps/mapdatabyid' -H 'content-type: application/json' --data-binary '{"mapId":-2147483390,"completedDate":"2019-01-22T16:09:54.306Z","startDate":"2019-01-22T00:00:00","endDate":"2019-01-23T00:00:00","releasePersonalInformation":false,"isReserving":true,"getDailyAvailability":false,"partySize":1,"filterData":"[]"}' --compressed
