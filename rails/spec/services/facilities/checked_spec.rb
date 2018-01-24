require 'rails_helper'

RSpec.describe Facilities::Checked do
  let(:facility) { FactoryGirl.create(:facility, premium_scrape: true) }
  let(:user) { FactoryGirl.create(:user, premium: true) }
  let!(:availability_request) { FactoryGirl.create(:availability_request, facility: facility) }
  let!(:availability_request2) { FactoryGirl.create(:availability_request, facility: facility, checked_count: 17, user: user) }
  let!(:availability_request3) { FactoryGirl.create(:availability_request, facility: facility, date_end: Date.yesterday) }

  let(:checked) { Facilities::Checked.new(facility) }

  describe '#mark_as' do
    it 'flips the premium_scrape toggle' do
      expect { checked.mark_as }.to change { facility.premium_scrape }.from(true).to(false)
    end

    it 'updates last changed on facility' do
      expect { checked.mark_as }.to(change { facility.last_scrape_attempt })
    end

    it 'increments the checked_count by 1' do
      expect { checked.mark_as }.to change { availability_request.reload.checked_count }.by(1)
    end

    it 'increments two at a time' do
      expect { checked.mark_as }.to change { availability_request2.reload.checked_count }.by(1)
    end

    it 'Does not increment a non active' do
      expect { checked.mark_as }.to_not(change { availability_request3.reload.checked_count })
    end

    it 'Updates the checked_at timestamp' do
      expect { checked.mark_as }.to(change { availability_request.reload.checked_at })
    end

    it 'does not mark non premium on 2nd mark' do
      expect { checked.mark_as }.to change { availability_request.reload.checked_count }.by(1)
      expect { checked.mark_as }.to_not(change { availability_request.reload.checked_count })
    end

    it 'does mark premium on 2nd mark' do
      expect { checked.mark_as }.to change { availability_request2.reload.checked_count }.by(1)
      expect { checked.mark_as }.to change { availability_request2.reload.checked_count }.by(1)
    end
  end

  describe '.mark_as' do
    it 'calls the instance mark_as' do
      expect(Facilities::Checked).to receive(:new).with(facility).and_return(Facilities::Checked.new(facility))
      expect_any_instance_of(Facilities::Checked).to receive(:mark_as)
      Facilities::Checked.mark_as(facility)
    end
  end

  describe '.perform' do
    it 'calls the instance mark_as' do
      expect(Facilities::Checked).to receive(:new).with(facility).and_return(Facilities::Checked.new(facility))
      expect_any_instance_of(Facilities::Checked).to receive(:mark_as)
      Facilities::Checked.perform(facility.id)
    end
  end
end
