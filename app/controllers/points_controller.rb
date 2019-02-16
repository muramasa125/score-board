class PointsController < ApplicationController
  def create
    @game = Game.find(params[:game_id])
    @point = @game.points.build(point_params)
    @point.save
    @points = @game.points
    render template: "games/show"
  end
  
  def destroy
    
  end
  
  private
  
  def point_params
    params.require(:point).permit(:game_id, :server_id, :point_user_id, :kind_id, :service_id)
  end
end
