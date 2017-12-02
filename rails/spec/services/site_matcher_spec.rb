require 'rails_helper'

RSpec.describe SiteMatcher do
  let(:site_matcher) { SiteMatcher.new(availability_request) }
  let(:facility) { FactoryGirl.create(:facility) }
  let!(:site) do
    FactoryGirl.create(
      :site,
      facility: facility,
      ext_site_id: 123,
      water: true,
      sewer: false,
      length: 40,
      electric: 30,
      premium: false,
      ada: true,
      site_type: :rv
    )
  end
  let!(:site2) do
    FactoryGirl.create(
      :site,
      facility: facility,
      ext_site_id: 124,
      water: false,
      sewer: true,
      length: 40,
      electric: nil,
      premium: true,
      ada: true,
      site_type: :tent
    )
  end
  let!(:site3) do
    FactoryGirl.create(
      :site,
      facility: facility,
      ext_site_id: 125,
      water: false,
      sewer: false,
      length: 50,
      electric: 30,
      premium: true,
      ada: false,
      site_type: :group
    )
  end

  describe '#matching_site_ids' do
    context 'water: true' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, water: true) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site.id) }
    end

    context 'water: false' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, water: false) }
      it { expect(site_matcher.matching_site_ids.size).to eq(3) }
    end

    context 'water: nil' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, water: nil) }
      it { expect(site_matcher.matching_site_ids.size).to eq(3) }
    end

    context 'water: false, sewer: true' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, water: false, sewer: true) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site2.id) }
    end

    context 'electric greater' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_electric: 15) }
      it { expect(site_matcher.matching_site_ids.size).to eq(2) }
      it { expect(site_matcher.matching_site_ids).to_not include(site2.id) }
    end

    context 'electric less' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_electric: 50) }
      it { expect(site_matcher.matching_site_ids.size).to eq(0) }
    end

    context 'electric equal' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_electric: 30) }
      it { expect(site_matcher.matching_site_ids.size).to eq(2) }
      it { expect(site_matcher.matching_site_ids).to_not include(site2.id) }
    end

    context 'length greater' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_length: 25) }
      it { expect(site_matcher.matching_site_ids.size).to eq(3) }
    end

    context 'length less' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_length: 51) }
      it { expect(site_matcher.matching_site_ids.size).to eq(0) }
    end

    context 'length equal' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, min_length: 50) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site3.id) }
    end

    context 'user selected ids' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, specific_site_ids: [site.id, site3.id]) }
      it { expect(site_matcher.matching_site_ids.size).to eq(2) }
      it { expect(site_matcher.matching_site_ids).to_not include(site2.id) }
    end

    context 'site_type rv' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, site_type: :rv) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site.id) }
    end

    context 'site_type rv or tent' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, site_type: :rv_tent) }
      it { expect(site_matcher.matching_site_ids.size).to eq(2) }
      it { expect(site_matcher.matching_site_ids).to_not include(site3.id) }
    end

    context 'site_type group' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, site_type: :group) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site3.id) }
    end

    context 'premium sites' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, site_premium: true) }
      it { expect(site_matcher.matching_site_ids.size).to eq(2) }
      it { expect(site_matcher.matching_site_ids).to include(site2.id) }
      it { expect(site_matcher.matching_site_ids).to include(site3.id) }
    end

    context 'ignore ada' do
      let(:availability_request) { FactoryGirl.create(:availability_request, facility: facility, ignore_ada: true) }
      it { expect(site_matcher.matching_site_ids.size).to eq(1) }
      it { expect(site_matcher.matching_site_ids).to include(site3.id) }
    end
  end
end
