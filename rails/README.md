https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one

sudo nano /etc/systemd/system/resque.service
sudo systemctl restart resque && sudo systemctl restart resque-importer && sudo systemctl restart resque-scheduler
ssh deploy@192.34.56.219

watch -n 2 'ps auxww | ag resque'

PGPASSWORD=timphin pg_dump -Fc -x reserve_wanderinglabs -h localhost -U reserve -w --exclude-table-data=pg_toast.\* > reserve.dump

scp deploy@192.34.56.219:reserve.dump ~/Downloads

# locally

ssh-add

~/.rbenv/vars
(Remeber to stop and start puma.. can't just restart)
bundle exec puma -C /home/deploy/rails.reserve.wanderinglabs/shared/config/puma.rb --daemon

psql -U postgres -d postgres -c 'SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity'

AvailabilityRequest.where(facility_id: Facility::RecreationGov.all.map(&:id)).active.all.each do |a|
  puts a.facility.name
  new_id = Facility.where('id != ?', a.facility_id).where('details @> ?', {FacilityID: a.facility.details['FacilityID']}.to_json).first&.id
  if new_id.present?
    a.facility_id = new_id
    a.cache_site_ids(true)
  else
    puts "Failed"
  end
end

AvailabilityImport.where("history_open = '[]'").where("history_filled = '[]'").all.each do |ai|
  ai.delete unless ai.availabilities.count.positive?
end; nil

AvailabilityImports::Index.perform(*Resque.peek('import', 0, 100).last['args'])


sudo systemctl stop resque && sudo systemctl stop resque-importer && sudo systemctl stop resque-scheduler

f.update(out_of_order: true, out_of_order_date: Date.today, out_of_order_reason: 'Covid19 Closure')

Facility.top_facilities.limit(10).each { |f| f.sites.each(&:populate_loop); f.populate_sites_details }; nil

AvailabilityImport.where(facility_id: 3509).order(id: :desc).limit(100).all.each { |a| puts [a.run_id.split("_").last, a.created_at.min, a.run_id, a.created_at].join(" :: ") }; nil


AvailabilityImport.order(id: :desc).limit(100).all.each { |a| puts [a.run_id.split("_").last, a.created_at.min, a.run_id, a.created_at].join(" :: ") }; nil

---------

AvailabilityRequest.where(notify_sms: false).find_each do |ar|
  user = ar.user
  nms = ar.user.notification_methods.where(notification_type: :sms).map(&:id)
  count = ar.availability_notifications.where(notification_method_id: nms, throttled: false).count

  if count > 0
    puts "#{user.sms_count}/#{user.sms_limit} -#{count} :: #{user.email} "
    ar.availability_notifications.where(notification_method_id: nms).update_all(throttled: true)
    user.sms_cache
    user.reload
    puts "\t#{user.sms_count}/#{user.sms_limit}"
  end

end; nil
