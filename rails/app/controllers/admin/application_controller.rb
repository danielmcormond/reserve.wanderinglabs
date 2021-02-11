class Admin::ApplicationController < ApplicationController
  before_action :require_admin

  def require_admin
    render status: :forbidden unless current_user&.admin?
  end
end
