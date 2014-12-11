class ApplicationController < Sinatra::Base
  set :views, File.expand_path("../../views",__FILE__)
  set :public_dir, File.expand_path("../../public",__FILE__)

  get '/' do
    erb :index
  end

  # post '/' do
  #   city = params[:city]
  #   address = params[:address]
  #   food = params[:food]
  #   distance = params[:distance]
  #   binding.pry
  # end

  get '/console' do
    binding.pry
  end
end