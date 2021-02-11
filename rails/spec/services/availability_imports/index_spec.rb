require 'rails_helper'

RSpec.describe AvailabilityImports::Index do
  let(:hash) { 'foobar' }
  let(:facility) { FactoryGirl.create(:facility, last_import_hash: '123456abc') }
  let(:site_group) { nil }
  let(:import) { AvailabilityImports::Index.new(facility.id, "#{site_group ? "#{site_group.id}_" : ''}17_06_08_17_22", hash) }

  describe '#perform' do
    it 'calls other methods' do
      expect_any_instance_of(AvailabilityImports::Index).to receive(:parse_and_match)
      expect_any_instance_of(AvailabilityImports::Index).to receive(:update_facility)
      import.perform
    end

    context 'same hashes' do
      let(:hash) { '123456abc' }

      it 'does not call parse_and_match' do
        expect_any_instance_of(AvailabilityImports::Index).to_not receive(:parse_and_match)
        expect_any_instance_of(AvailabilityImports::Index).to receive(:update_facility)
        import.perform
      end
    end
  end

  describe '#import' do
    it 'creates a AvailabilityImport' do
      expect { import.import }.to change { AvailabilityImport.count }.by(1)
    end

    context 'when there is a site group' do
      let(:site_group) { FactoryGirl.create(:site_group, facility_id: facility.id) }

      it 'relates the AvailabilityImport to the site group' do
        expect(import.import.site_group_id).to eq(site_group.id)
      end
    end
  end

  describe '#parse_and_match' do
    it 'calls AvailabilityImports::FromJson service' do
      expect(AvailabilityImports::FromJson).to receive(:perform).with(import.import)
      expect(AvailabilityMatcher::Enqueue).to receive(:perform).with(import.import, false)
      import.parse_and_match
    end
  end

  describe '#import_needed?' do
    it 'true' do
      expect(import.import_needed?).to be true
    end

    context 'same hashes' do
      let(:hash) { '123456abc' }
      it 'false when hashes are equal' do
        expect(import.import_needed?).to be false
      end
    end

    context 'when there is a site group' do
      let(:site_group) { FactoryGirl.create(:site_group, facility_id: facility.id, last_import_hash: 'site_group_hash') }

      it 'true' do
        expect(import.import_needed?).to be true
      end

      context 'same hashes' do
        let(:hash) { 'site_group_hash' }
        it 'false when hashes are equal' do
          expect(import.import_needed?).to be false
        end
      end
    end
  end

  describe '#update_facility' do
    it 'sets the new hash' do
      expect { import.update_facility }.to change { facility.reload.last_import_hash }.to eq(hash)
    end

    it 'updates the timestamp' do
      expect { import.update_facility }.to(change { facility.reload.last_import })
    end
  end

  describe '#update_site_group' do
    let(:site_group) { FactoryGirl.create(:site_group, facility_id: facility.id, last_import_hash: 'site_group_hash') }

    it 'sets the new hash' do
      expect { import.update_site_group }.to change { site_group.reload.last_import_hash }.to eq(hash)
    end

    it 'updates the timestamp' do
      expect { import.update_site_group }.to(change { site_group.reload.last_import })
    end
  end
end
