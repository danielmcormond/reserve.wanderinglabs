class NotificationMethodsController < ApplicationController
  before_action :login_required

  def create
    NotificationMethod.create(notification_method_params.merge(user_id: current_user.id))
    render json: current_user.reload
  end

  def destroy
    nm = current_user.notification_methods.where(id: params[:id]).first
    nm.update_attributes(active: false)
    render json: current_user.reload
  end

  private

  def notification_method_params
    params.require(:notification_method).permit(
      :notification_type, :param
    )
  end
end
