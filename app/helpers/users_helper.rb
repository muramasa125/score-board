module UsersHelper
  def show_user_name(user_id)
    @user = User.find_by(id: user_id)
    return @user.name
  end
end
