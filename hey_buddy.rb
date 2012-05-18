#!/usr/bin/env ruby
# encoding: utf-8

require 'rubygems'
require 'bundler'
Bundler.require
require "sinatra/config_file"

configure do
  config_file 'settings.yml'
end

get '/' do
  haml :index  
end

