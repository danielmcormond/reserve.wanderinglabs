require 'rails_helper'

RSpec.describe AvailabilityImports::Index do
  let(:hash) { 'foobar' }
  let(:facility) { FactoryGirl.create(:facility, last_import_hash: '123456abc') }
  let(:import) { AvailabilityImports::Index.new(facility.id, '17_06_08_17_22', hash) }

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
  end

  describe '#parse_and_match' do
    it 'calls AvailabilityImports::FromJson service' do
      expect(AvailabilityImports::FromJson).to receive(:perform).with(import.import)
      expect(AvailabilityMatcher::Index).to receive(:perform).with(import.import.id, false)
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
  end

  describe '#update_facility' do
    it 'sets the new hash' do
      expect { import.update_facility }.to change { facility.reload.last_import_hash }.to eq(hash)
    end

    it 'updates the timestamp' do
      expect { import.update_facility }.to(change { facility.reload.last_import })
    end
  end
end
