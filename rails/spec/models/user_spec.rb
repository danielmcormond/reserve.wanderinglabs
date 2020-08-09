require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  describe '#mark_premium' do
    it 'adds to the sms_limit when marked as premium' do
      expect { user.mark_premium }.to change { user.sms_limit }.by(250)
    end
  end
end
