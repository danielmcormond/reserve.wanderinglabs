require 'rails_helper'

RSpec.describe Scrape do
  context('instance') do
    let!(:facilities) do
      20.times.map do |x|
        f = FactoryGirl.create(
          :facility,
          name: "Scrape Facility #{x}",
          last_scrape_attempt: x.minutes.ago,
          scrape_every: 120
        )
        FactoryGirl.create(:availability_request, facility: f)
        f
      end
    end

    describe '#query' do
      it 'only returns facilities due or a scrape' do
        expect(Scrape.query.count.keys.size).to eq(17)
      end

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
        expect(call_count).to eq(17)
      end
    end
  end

  context('instance') do
    let(:facility) { double('Facility', scraper_type: :queue) }
    subject(:scrape) { Scrape.new(facility) }
    before do
      expect(ScrapeTypes::Queue).to receive(:publish).with(facility)
      expect(Facilities::Checked).to receive(:mark_as).with(facility)
    end

    describe '#work' do
      it 'Calls publish and facilities checked services (return values don\'t matter' do
        scrape.work
      end
    end
  end
end
