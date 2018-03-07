class PaymentsController < ApplicationController
  def create
    payment = Payments::Creator.new(params.require(:payment).permit!.to_h, current_user).create
    if payment.user # TODO: this is a security hole.
      render json: payment.reload.user
    else
      render json: { id: payment.id }
    end
  end

  def index
    render json: { id: ENV['PAYPAL_ID'] }
  end
end
