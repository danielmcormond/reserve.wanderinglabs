require 'rails_helper'

RSpec.describe AvailabilityMatcher::Enqueue do
  let(:import) { FactoryGirl.create(:availability_import) }
  let(:availability_request) { FactoryGirl.create(:availability_request, facility: import.facility) }
  let!(:site) { FactoryGirl.create(:site, facility: import.facility) }
  let!(:site1) { FactoryGirl.create(:site, facility: import.facility) }
  let(:finder) { AvailabilityMatcher::Finder.new(import, availability_request) }
  let!(:am) { FactoryGirl.create(:availability_match, availability_request: availability_request, site: site, length: 3, avail_date: Date.today, available: true) }

  describe '.perform' do
    it 'enqueues a availability_request' do
      expect(Resque).to receive(:enqueue).with(AvailabilityMatcher::Index, availability_request.id)
      described_class.perform(import, false)
    end

    context 'premium run' do
      it 'enqueues a availability_request' do
        expect(Resque).not_to receive(:enqueue).with(AvailabilityMatcher::Index, availability_request.id)
        described_class.perform(import, true)
      end

      it 'enqueues a non premium run' do
        expect(Resque).to receive(:enqueue_in).with(1.minutes, described_class, import.id)
        described_class.perform(import, true)
      end
    end
  end
end
