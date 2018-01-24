FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "test#{n}@example.com"
    end
    premium false
  end
end
