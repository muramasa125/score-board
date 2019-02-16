class ToppagesController < ApplicationController
  def index
    if logged_in?
      @game = current_user.games.build
      @games = current_user.games.order('created_at desc').page(params[:page])
    end
  end
end
