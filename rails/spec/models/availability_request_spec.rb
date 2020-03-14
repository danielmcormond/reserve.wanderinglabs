require 'rails_helper'

RSpec.describe AvailabilityRequest, type: :model do
  describe '#cache_site_ids' do
    let(:ar) { FactoryGirl.create :availability_request, water: true }
    let!(:site) { FactoryGirl.create(:site, facility: ar.facility, ext_site_id: 123, water: true) }
    let!(:site2) { FactoryGirl.create(:site, facility: ar.facility, ext_site_id: 124, water: false) }
    let!(:site3) { FactoryGirl.create(:site, facility: ar.facility, ext_site_id: 125, water: false) }

    it 'updates site ids' do
      expect { ar.cache_site_ids }
        .to change { ar.site_ids }
        .from([])
        .to([site.id.to_s])
    end
  end

  describe '#date_range' do
    let(:ar) { FactoryGirl.create(:availability_request, date_start: Date.parse('2020-01-01'), date_end: Date.parse('2020-05-01')) }

    it 'is a range' do
      expect(ar.date_range).to be_a(Range)
    end

    it 'has matching endpoints' do
      expect(ar.date_range.first).to eq(ar.date_start)
      expect(ar.date_range.last).to eq(ar.date_end)
    end
  end
end
