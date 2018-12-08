require 'rails_helper'

RSpec.describe Scrape do
  context('instance') do
    let!(:facilities) do
      Array.new(20).map do |x|
        f = FactoryGirl.create(
          :facility,
          name: "Scrape Facility #{x}",
          last_scrape_attempt: x.minutes.ago,
        )
        FactoryGirl.create(:availability_request, facility: f)
        f
      end
    end

    describe '#limit' do
      it 'is a set percentage of the total active facilities' do
        limit = Scrape.limit
        expect(limit).to be(2)
      end
    end

    describe '#query' do
      it 'grabs the first two facilities' do
        ids = Scrape.query.map(&:id)
        expect(ids).to include(facilities[-1].id)
      end
    end

    describe '#perform' do
      it 'Creates new instance with facility and calls work method' do
        call_count = 0
        allow_any_instance_of(Scrape).to receive(:work) { call_count += 1 }

        Scrape.perform
        expect(call_count).to eq(2)
      end
    end
  end

  context('instance') do
    let(:facility) { double('Facility', scraper_type: :lambda) }
    subject(:scrape) { Scrape.new(facility) }
    before do
      expect(Sns).to receive(:publish).with(facility)
      expect(Facilities::Checked).to receive(:mark_as).with(facility)
    end

    describe '#work' do
      it 'Calls sns publish and facilities checked services (return values don\'t matter' do
        scrape.work
      end
    end
  end
end
