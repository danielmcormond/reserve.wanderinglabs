require 'rails_helper'

RSpec.describe ScrapeTypes::Queue do
  let(:facility) { FactoryGirl.create(:facility) }
  let(:queue) { ScrapeTypes::Queue.new(facility) }

  before(:each) do
    $redis.del(queue.key)
  end

  describe 'exists?' do
    it 'false when redis queue is empty' do
      expect(queue.exists?).to be false
    end

    it 'is true when redis queue already contains the facility id' do
      queue.publish
      expect(queue.exists?).to be true
    end
  end

  describe '#publish' do
    it 'adds to the redis queue' do
      expect { queue.publish }.to change { $redis.llen(queue.key) }.by(1)
    end

    it 'does not add the queue the 2nd time' do
      expect { queue.publish }.to change { $redis.llen(queue.key) }.by(1)
      expect { queue.publish }.to change { $redis.llen(queue.key) }.by(0)
    end
  end

  describe '.publish' do
    it 'is a class method' do
      expect { ScrapeTypes::Queue.publish(facility) }.to change { $redis.llen(queue.key) }.by(1)
    end
  end
end
