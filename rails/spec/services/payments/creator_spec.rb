require 'rails_helper'

RSpec.describe Payments::Creator do
  let(:user) { FactoryGirl.create(:user) }
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

  let(:creator) { Payments::Creator.new(params, user) }

  describe '#create' do
    it 'successfully creates the payment' do
      VCR.use_cassette('payments_creator_premium') do
        expect { creator.create }.to change { Payment.count }.by(1)
      end
    end

    it 'marks user as premium' do
      VCR.use_cassette('payments_creator_premium') do
        expect { creator.create }.to(change { user.premium })
      end
    end

    context 'nil user' do
      let(:user) { nil }
      it 'successfully creates the payment' do
        VCR.use_cassette('payments_creator_premium') do
          expect { creator.create }.to change { Payment.count }.by(1)
        end
      end
    end
  end
end
