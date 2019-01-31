require 'rails_helper'

RSpec.describe AvailabilityRequestSerializer do
  let(:user) { FactoryGirl.create(:user) }
  let(:availability_request) { FactoryGirl.create(:availability_request, user: user) }
  let(:serializer) { AvailabilityRequestSerializer.new(availability_request) }
  let(:serialized) { JSON.parse(serializer.to_json) }

  it 'contains uuid' do
    expect(serialized['uuid']).to eq(availability_request.uuid)
  end

  describe '#premium' do
    it 'is false when user is not premium member' do
      expect(serialized['premium']).to eq(false)
    end

    context 'user is premium' do
      let(:user) { FactoryGirl.create(:user, premium: true) }
      it 'is true (since user is premium)' do
        expect(serialized['premium']).to eq(true)
      end
    end
  end
end
