
https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one

sudo nano /etc/systemd/system/resque.service
sudo systemctl restart resque && sudo systemctl restart resque-scheduler
ssh deploy@192.34.56.219

PGPASSWORD=xxx pg_dump  -x reserve_wanderinglabs -h localhost -U reserve -w  --exclude-table-data=pg_toast.* > dump.sql

scp deploy@192.34.56.219:dump.sql ~/Downloads

# locally
ssh-add

~/.rbenv/vars
(Remeber to stop and start puma.. can't just restart)
bundle exec puma -C /home/deploy/rails.reserve.wanderinglabs/shared/config/puma.rb --daemon

psql -U postgres -d postgres -c 'SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity'
