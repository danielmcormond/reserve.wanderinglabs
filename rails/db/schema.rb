# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_14_005114) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "btree_gist"
  enable_extension "citext"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "agencies", force: :cascade do |t|
    t.string "name"
    t.jsonb "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "availabilities", force: :cascade do |t|
    t.bigint "site_id"
    t.date "avail_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "availability_import_id"
    t.daterange "avail_at", null: false
    t.index ["availability_import_id"], name: "index_availabilities_on_availability_import_id"
    t.index ["site_id", "avail_date"], name: "availabilities_site_id_avail_date"
    t.index ["site_id"], name: "index_availabilities_on_site_id"
  end

  create_table "availability_imports", force: :cascade do |t|
    t.bigint "facility_id"
    t.string "run_id"
    t.date "date_start"
    t.date "date_end"
    t.jsonb "history_open"
    t.jsonb "history_filled"
    t.datetime "created_at"
    t.index ["facility_id"], name: "index_availability_imports_on_facility_id"
  end

  create_table "availability_match_clicks", force: :cascade do |t|
    t.bigint "availability_match_id"
    t.string "from"
    t.boolean "available", default: false, null: false
    t.integer "elapsed_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["availability_match_id"], name: "index_availability_match_clicks_on_availability_match_id"
  end

  create_table "availability_matches", force: :cascade do |t|
    t.bigint "availability_request_id"
    t.bigint "site_id"
    t.date "avail_date"
    t.integer "length"
    t.boolean "available", default: false, null: false
    t.datetime "unavailable_at"
    t.datetime "notified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["availability_request_id"], name: "index_availability_matches_on_availability_request_id"
    t.index ["site_id"], name: "index_availability_matches_on_site_id"
  end

  create_table "availability_notifications", force: :cascade do |t|
    t.bigint "availability_request_id"
    t.bigint "notification_method_id"
    t.jsonb "matches_new"
    t.jsonb "matches", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "throttled", default: false
    t.index ["availability_request_id"], name: "index_availability_notifications_on_availability_request_id"
    t.index ["notification_method_id"], name: "index_availability_notifications_on_notification_method_id"
  end

  create_table "availability_requests", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "facility_id"
    t.date "date_start"
    t.date "date_end"
    t.integer "stay_length"
    t.jsonb "details"
    t.text "site_ids", default: [], array: true
    t.text "sites_ext_ids", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "water"
    t.boolean "sewer"
    t.integer "min_electric"
    t.integer "min_length"
    t.string "site_type"
    t.text "specific_site_ids"
    t.integer "checked_count", default: 0
    t.datetime "checked_at"
    t.string "status"
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "arrival_days", default: [], array: true
    t.boolean "pullthru"
    t.boolean "site_premium", default: false, null: false
    t.boolean "ignore_ada", default: false, null: false
    t.boolean "canceled_found", default: false, null: false
    t.boolean "notify_sms", default: true, null: false
    t.jsonb "import_details", default: {}
    t.boolean "imported", default: false, null: false
    t.boolean "notify", default: true, null: false
    t.index ["facility_id"], name: "index_availability_requests_on_facility_id"
    t.index ["user_id"], name: "index_availability_requests_on_user_id"
    t.index ["uuid"], name: "index_availability_requests_on_uuid", unique: true
  end

  create_table "facilities", force: :cascade do |t|
    t.bigint "agency_id"
    t.string "name"
    t.string "type"
    t.jsonb "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "booking_window"
    t.datetime "last_import"
    t.string "last_import_hash"
    t.integer "sites_count", default: 0
    t.string "status"
    t.datetime "last_scrape_attempt"
    t.boolean "premium_scrape", default: false, null: false
    t.string "parent_name"
    t.jsonb "sites_details"
    t.boolean "active", default: false, null: false
    t.string "ext_facility_id"
    t.string "slug"
    t.integer "scrape_every", default: 3600
    t.index ["agency_id"], name: "index_facilities_on_agency_id"
    t.index ["slug"], name: "index_facilities_on_slug", unique: true
  end

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
  end

  create_table "notification_methods", force: :cascade do |t|
    t.bigint "user_id"
    t.string "param"
    t.jsonb "details"
    t.string "notification_type"
    t.boolean "active", default: true, null: false
    t.boolean "locked", default: false, null: false
    t.index ["user_id"], name: "index_notification_methods_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "user_id"
    t.string "provider"
    t.decimal "total"
    t.datetime "paid_at"
    t.string "status"
    t.string "email"
    t.jsonb "params"
    t.jsonb "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "sites", force: :cascade do |t|
    t.bigint "facility_id"
    t.string "ext_site_id"
    t.string "site_num"
    t.jsonb "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "water", default: false, null: false
    t.boolean "sewer", default: false, null: false
    t.integer "electric"
    t.integer "length"
    t.string "site_type"
    t.string "site_layout"
    t.boolean "premium", default: false, null: false
    t.boolean "ada", default: false, null: false
    t.boolean "active", default: true, null: false
    t.index ["active"], name: "index_sites_on_active"
    t.index ["facility_id"], name: "index_sites_on_facility_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.citext "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "auth_token"
    t.datetime "last_seen"
    t.string "login_token"
    t.boolean "premium", default: false, null: false
    t.date "premium_until"
    t.integer "priority", default: 1000
    t.integer "sms_limit", default: 250
    t.integer "sms_count", default: 0
    t.index ["auth_token"], name: "index_users_on_auth_token"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login_token"], name: "index_users_on_login_token"
  end

  add_foreign_key "availabilities", "availability_imports"
  add_foreign_key "availabilities", "sites"
  add_foreign_key "availability_imports", "facilities"
  add_foreign_key "availability_match_clicks", "availability_matches"
  add_foreign_key "availability_matches", "availability_requests"
  add_foreign_key "availability_matches", "sites"
  add_foreign_key "availability_notifications", "availability_requests"
  add_foreign_key "availability_notifications", "notification_methods"
  add_foreign_key "availability_requests", "facilities"
  add_foreign_key "availability_requests", "users"
  add_foreign_key "facilities", "agencies"
  add_foreign_key "notification_methods", "users"
  add_foreign_key "payments", "users"
  add_foreign_key "sites", "facilities"
end
