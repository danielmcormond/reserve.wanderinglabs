require 'rails_helper'

RSpec.describe AvailabilityImports::SqlBuilder do
  let(:results) do
    {
      Date.parse('19/01/23') => [1,2,3],
      Date.parse('19/01/24') => [2,3],
      Date.parse('19/01/25') => [3,4,5],
    }
  end

  let(:sql_builder) { AvailabilityImports::SqlBuilder.new(results) }

  let(:sql_output) do
    'SELECT "availabilities".* FROM "availabilities" WHERE (("availabilities"."site_id" IN (1, 2, 3) AND "availabilities"."avail_date" = \'2019-01-23\') OR ("availabilities"."site_id" IN (2, 3) AND "availabilities"."avail_date" = \'2019-01-24\') OR ("availabilities"."site_id" IN (3, 4, 5) AND "availabilities"."avail_date" = \'2019-01-25\'))'
  end

  describe('#scope') do
    it('returns an active relation') do
      expect(sql_builder.scope).to be_kind_of(ActiveRecord::Relation)
    end

    it('has three site_id') do
      expect(sql_builder.scope.to_sql.scan('site_id').size).to eq(3)
    end

    it('has three avail_date') do
      expect(sql_builder.scope.to_sql.scan('avail_date').size).to eq(3)
    end

    it('has two ORs') do
      expect(sql_builder.scope.to_sql.scan(' OR ').size).to eq(2)
    end

    it('matches output') do
      expect(sql_builder.scope.to_sql).to eq(sql_output)
    end
  end

  describe('.scope') do
    let(:class_scope) { AvailabilityImports::SqlBuilder.scope(results) }
    it('matches instance scope') do
      expect(class_scope).to eq(sql_builder.scope)
    end
  end
end
