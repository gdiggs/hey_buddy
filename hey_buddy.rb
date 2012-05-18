#!/usr/bin/env ruby
# encoding: utf-8

require 'rubygems'
require 'bundler'
Bundler.require
require "sinatra/config_file"

configure do
  config_file 'settings.yml'
  set :instagram_client_id, ENV['INSTAGRAM_CLIENT_ID'] if ENV['INSTAGRAM_CLIENT_ID'] # only because heroku doesn't let you do settings.yml files
end

get '/' do
  haml :index  
end

