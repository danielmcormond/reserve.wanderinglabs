require 'rails_helper'

RSpec.describe SiteSerializer do
  let(:site) { FactoryGirl.build(:site) }
  let(:serializer) { SiteSerializer.new(site) }

  it 'contains site_num' do
    expect(JSON.parse(serializer.to_json)['site_num']).to eq(site.site_num)
  end
end
