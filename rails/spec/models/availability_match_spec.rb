require 'rails_helper'

RSpec.describe AvailabilityMatch, type: :model do
  let(:site) { create(:site) }
  let(:ar) { FactoryGirl.create :availability_request }
  let!(:match) { FactoryGirl.create(:availability_match, availability_request: ar, site: site, avail_date: Date.current.advance(days: 3), notified_at: 20.minutes.ago) }

  describe '#find_by_base62' do
    it 'given base62 returns the instance' do
      base62 = Base62.encode(match.id)
      instance = AvailabilityMatch.find_by_base62(base62)
      expect(instance.id).to eq(match.id)
    end
  end

  describe ".not_recently_notified" do
    let!(:match2) { FactoryGirl.create(:availability_match, availability_request: ar, site: site, avail_date: Date.current.advance(days: 3)) }

    it 'does not return the id if the same avail had previously been notified' do
      expect(AvailabilityMatch.notifiable.not_recently_notified.count).to eq(0)
    end

    context 'when the notified_at time of the previous is greater than 30 minutes' do
      let!(:match) { FactoryGirl.create(:availability_match, availability_request: ar, site: site, avail_date: Date.current.advance(days: 3), notified_at: 45.minutes.ago) }

      it 'does return the id of the new match' do
        expect(AvailabilityMatch.notifiable.not_recently_notified.count).to eq(1)
        expect(AvailabilityMatch.notifiable.not_recently_notified.first.id).to eq(match2.id)
      end
    end
  end
end
