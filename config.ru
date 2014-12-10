require 'bundler'
Bundler.require

Dir.glob('./{models,controllers}/*.rb').each do |file|
	require file
	puts "required #{file}"
end

map('/'){ run ApplicationController }