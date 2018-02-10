
https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one

sudo nano /etc/systemd/system/resque.service
sudo systemctl restart resque && sudo systemctl restart resque-scheduler
ssh deploy@192.34.56.219

# locally
ssh-add

* Premium Scrape Plan *

Facility has premium_scrape:boolean
  - toggle it every pre scrape
  - update checked counts/date separately

Import -
  - if facility premium_scrape is true
    - match just premium
    - Resque Schedual all for 11mins
  - else
    - match all
