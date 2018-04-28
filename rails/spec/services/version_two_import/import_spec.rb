require 'rails_helper'

RSpec.describe VersionTwoImport::Import do
  let(:row) { File.read('spec/fixtures/version_two_import/bahia_honda.json') }
  let(:import) { VersionTwoImport::Import.new(row) }
  let!(:facility) { FactoryGirl.create(:facility, type: Facility::ReserveAmerica, details: { park_id: '281005' }) }
  let!(:user) { FactoryGirl.create(:user, email: 'foobar@yahoo.com', premium: true) }
  describe '.attributes' do
    it 'maps the uuid' do
      expect(import.attributes[:uuid]).to eq('71fd62a0-87ae-11e7-bb17-0f557327a4f9')
    end

    it 'maps the facility' do
      expect(import.attributes[:facility_id]).to eq(facility.id)
    end
  end

  describe '.active?' do
    it 'is true' do
      expect(import.active?).to be true
    end
  end

  describe '.import?' do
    it 'is true' do
      expect(import.import?).to be true
    end
  end

  describe '.valid?' do
    it 'is true' do
      expect(import.valid?).to be true
    end
  end

  describe '.create' do
    it 'creates the request' do
      expect { import.create }.to change { AvailabilityRequest.count }.by(1)
    end

    it 'doesnt bring in availabilities' do
      expect(import.create.import_details.keys).not_to include('availabilities')
    end
  end
end
