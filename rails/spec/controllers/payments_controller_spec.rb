require 'rails_helper'

RSpec.describe PaymentsController, :type => :controller do
  let(:params) do
    {
      payment: {
        details: {
          paid: true,
          cancelled: false,
          payerID: "GY8BRXAC7DN74",
          paymentID: "PAY-34L1132830093533CLF54GLA",
          paymentToken: "EC-62G48236VR9459313",
          returnUrl: "https://www.sandbox.paypal.com/?paymentId=PAY-34L1132830093533CLF54GLA&token=EC-62G48236VR9459313&PayerID=GY8BRXAC7DN74",
        },
      },
    }
  end

  context "POST create" do
    it "calls  Payments::Creator (params)" do
      expect { post(:create, params: params) }.to change{ Payment.count }.by(1)
    end
  end
end
