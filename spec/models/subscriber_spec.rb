require "rails_helper"

RSpec.describe Subscriber, type: :model do
  it "is valid with name and email" do
    subscriber = Subscriber.new(
      name: "Test User",
      email: "test@example.com"
    )
    expect(subscriber).to be_valid
  end

  it "is invalid without an email" do
    subscriber = Subscriber.new(name: "Test User")
    expect(subscriber).not_to be_valid
  end

  it "does not allow duplicate emails (case insensitive)" do
    Subscriber.create!(
      name: "User One",
      email: "test@example.com"
    )

    duplicate = Subscriber.new(
      name: "User Two",
      email: "TEST@example.com"
    )

    expect(duplicate).not_to be_valid
  end

  it "defaults status to subscribed" do
    subscriber = Subscriber.create!(
      name: "Test",
      email: "status@test.com"
    )

    expect(subscriber.status).to eq("subscribed")
  end
end
