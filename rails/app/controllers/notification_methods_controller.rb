class NotificationMethodsController < ApplicationController
  before_action :login_required

  def create
    nm = NotificationMethod.find_or_create_by(notification_method_params.merge(user_id: current_user.id))
    nm.update(active: true) unless nm.active?
    render json: current_user.reload
  end

  def destroy
    nm = current_user.notification_methods.where(id: params[:id]).first
    nm.update(active: false)
    render json: current_user.reload
  end

  def test_notification
    nm = current_user.notification_methods.where(id: params[:id]).first
    nm.test_notification
  end

  private

  def notification_method_params
    params.require(:notification_method).permit(
      :notification_type, :param
    )
  end
end
