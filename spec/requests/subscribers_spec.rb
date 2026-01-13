require "rails_helper"

RSpec.describe "Subscribers API", type: :request do
  describe "GET /subscribers" do
    it "returns subscribers list" do
      Subscriber.create!(
        name: "Test User",
        email: "test1@example.com"
      )

      get "/subscribers"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["subscribers"].length).to eq(1)
    end
  end

  describe "POST /subscribers" do
    it "creates a subscriber" do
      post "/subscribers", params: {
        subscriber: {
          name: "New User",
          email: "new@example.com"
        }
      }

      expect(response).to have_http_status(:created)
    end

    it "fails on duplicate email" do
      Subscriber.create!(
        name: "User",
        email: "dup@example.com"
      )

      post "/subscribers", params: {
        subscriber: {
          name: "Another User",
          email: "DUP@example.com"
        }
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "PATCH /subscribers/:id" do
    it "updates subscriber status" do
      subscriber = Subscriber.create!(
        name: "Test",
        email: "status@example.com"
      )

      patch "/subscribers/#{subscriber.id}", params: {
        subscriber: { status: "unsubscribed" }
      }

      expect(response).to have_http_status(:ok)
      expect(subscriber.reload.status).to eq("unsubscribed")
    end
  end
end
