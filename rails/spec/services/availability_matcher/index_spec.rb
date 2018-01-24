require 'rails_helper'

RSpec.describe AvailabilityMatcher::Index do
  let(:import) { FactoryGirl.create(:availability_import) }
  let(:availability_request) { FactoryGirl.create(:availability_request, facility: import.facility) }
  let!(:site) { FactoryGirl.create(:site, facility: import.facility) }
  let!(:site1) { FactoryGirl.create(:site, facility: import.facility) }
  let(:finder) { AvailabilityMatcher::Finder.new(import, availability_request) }
  let!(:am) { FactoryGirl.create(:availability_match, availability_request: availability_request, site: site, length: 3, avail_date: Date.today, available: true) }

  describe '.perform' do
    it 'calls class method with the availability_request' do
      expect(AvailabilityMatcher::Index).to receive(:call).with(import, availability_request)
      AvailabilityMatcher::Index.perform(import.id)
    end

    context 'premium run' do
      it 'no premium requests no nothing gets called' do
        expect(AvailabilityMatcher::Index).to_not receive(:call)
        AvailabilityMatcher::Index.perform(import.id, true)
      end

      it 'enqueues a non premium run' do
        expect(Resque).to receive(:enqueue_in).with(11.minutes, AvailabilityMatcher::Index, import.id)
        AvailabilityMatcher::Index.perform(import.id, true)
      end
    end
  end
end
