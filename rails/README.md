
https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one

sudo nano /etc/systemd/system/resque.service
sudo systemctl restart resque && sudo systemctl restart resque-scheduler
ssh deploy@192.34.56.219


* Premium Scrape Plan *

Facility has premium_scrape:boolean
  - toggle it every pre scrape
  - send boolean to scraper
  - update checked counts/date separately


Premium Scrape
  - No changes.. exits as normal
  - changes: Return true (premium) flag back to rails api
    - only match on premium
    - set facility match_non_prem_on_next

Everyone Scrape
  - has changes proceed as normal,
  - no changes + match_non_on_next
    - rails api call -> match_non_prem
  - no changes + no match_non_on_next
    - exit as normal


----

Facility has premium_scrape:boolean
  - toggle it every pre scrape
  - update checked counts/date separately

Import -
  - if facility premium_scrape is true
    - match just premium
    - Resque Schedual all for 11mins
  - else
    - match all
