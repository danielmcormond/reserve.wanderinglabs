require 'rails_helper'

RSpec.describe SiteSerializer do
  let(:site) { FactoryGirl.build(:site, details: { 'SiteType' => 'foobar' }) }
  let(:serializer) { SiteSerializer.new(site) }

  it 'contains site_num' do
    expect(JSON.parse(serializer.to_json)['site_num']).to eq(site.site_num)
  end

  it 'contains site_type2' do
    expect(JSON.parse(serializer.to_json)['site_type2']).to eq('foobar')
  end

  context 'site details is an array' do
    let(:site) { FactoryGirl.build(:site, details: []) }
    it 'still contains site_num' do
      expect(JSON.parse(serializer.to_json)['site_num']).to eq(site.site_num)
    end
  end
end
