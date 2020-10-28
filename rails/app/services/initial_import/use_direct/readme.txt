curl https://reserveohio.com/OhioCampWeb/Facilities/SearchViewUnitAvailabity.aspx?map_id=107


curl 'https://ohiordr.usedirect.com/Ohiordr/rdr/search/place' \
  -H 'authority: ohiordr.usedirect.com' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'origin: https://reserveohio.com' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://reserveohio.com/OhioCampWeb/Facilities/SearchViewUnitAvailabity.aspx' \
  -H 'accept-language: en-US,en;q=0.9' \
  --data-binary '{"PlaceId":"107","Latitude":0,"Longitude":0,"HighlightedPlaceId":0,"StartDate":"10-28-2020","Nights":1,"CountNearby":true,"NearbyLimit":100,"NearbyOnlyAvailable":false,"NearbyCountLimit":10,"Sort":"Distance","CustomerId":"0","RefreshFavourites":true,"IsADA":false,"UnitCategoryId":0,"SleepingUnitId":0,"MinVehicleLength":0,"UnitTypesGroupIds":[]}' \
  --compressed
