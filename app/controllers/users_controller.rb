class UsersController < ApplicationController
  def index
  	flash[:success] = "Welcome!"
  end
end
