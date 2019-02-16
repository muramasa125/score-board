class GamesController < ApplicationController
  def show
    @game = Game.find(params[:id])
    @point = Point.new
  end

  def new
    @game = current_user.games.build
    unless params[:opponent]
      # oppnentが未設定の時はゲストユーザーを設定
      @guest = User.find(1)
      @game.opponent_id = @guest.id
    end
    @game.save
    redirect_to controller: :games, action: :show, id: @game.id
    
  end

  def create
  end
  
  def edit
  end
  
  def update
  end
  
  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    flash[:success] = 'ゲームを削除しました。'
    redirect_back(fallback_location: root_path)
  end
  
  private
  
  def game_params
    params.require(:game).permit(:oppnent)
  end
  
  def calcScore
    
  end
end
