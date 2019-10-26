# config valid only for current version of Capistrano
lock "3.7.2"

set :application, 'rails.reserve.wanderinglabs'
set :repo_url, 'git@github.com:tiwatson/reserve.wanderinglabs.git'
set :repo_tree, '/rails'
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/rails.reserve.wanderinglabs"

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', 'config/puma.rb')

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :default_env, { path: "/home/deploy/.rbenv/shims:/home/deploy/.rbenv/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

# after "deploy:restart", "resque:restart"

# Puma:
set :puma_conf, "#{shared_path}/config/puma.rb"

set :nginx_use_ssl, true
set :nginx_server_name, "api-reserve.wanderinglabs.com"
set :nginx_domains, "api-reserve.wanderinglabs.com"
set :nginx_ssl_certificate, '/etc/letsencrypt/live/api-reserve.wanderinglabs.com/fullchain.pem'
set :nginx_ssl_certificate_key, '/etc/letsencrypt/live/api-reserve.wanderinglabs.com/privkey.pem'

namespace :deploy do
  before 'check:linked_files', 'puma:config'
  before 'check:linked_files', 'puma:nginx_config'
  after 'puma:phased-restart', 'nginx:restart'
end
