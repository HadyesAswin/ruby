# frozen_string_literal: true

require "rails_helper"

RSpec.describe SubscribersController, type: :controller do
  # Use JSON format for all requests
  before { request.headers["Accept"] = "application/json" }

  describe "GET /subscribers" do
    it "returns 200 and a list of subscribers and pagination object" do
      # create some test subscribers
      Subscriber.create!(name: "John Smith", email: "john@example.com")
      Subscriber.create!(name: "Jane Doe", email: "jane@example.com")

      get :index, params: {}, format: :json

      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json; charset=utf-8")

      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:subscribers].length).to eq(2)
      expect(json[:pagination]).not_to be_nil
    end
  end

  describe "POST /subscribers" do
    it "returns 201 if it successfully creates a subscriber" do
      post :create, params: { subscriber: { email: "test@test.com", name: "John Smith" } }, format: :json

      expect(response).to have_http_status(:created)
      expect(response.content_type).to eq("application/json; charset=utf-8")

      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:message]).to eq "Subscriber created successfully"

      # verify subscriber actually saved in DB
      subscriber = Subscriber.find_by(email: "test@test.com")
      expect(subscriber).not_to be_nil
      expect(subscriber.name).to eq("John Smith")
      expect(subscriber.status).to eq("subscribed") # default enum
    end

    it "fails when email is missing" do
      post :create, params: { subscriber: { name: "No Email" } }, format: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:message]).to include("Email can't be blank")
    end
  end

  describe "PATCH /subscribers/:id" do
    it "returns 200 if it successfully updates a subscriber" do
      subscriber = Subscriber.create!(name: "John Smith", email: "john@example.com")

      patch :update, params: { id: subscriber.id, subscriber: { status: "unsubscribed" } }, format: :json

      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json; charset=utf-8")

      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:message]).to eq "Subscriber updated successfully"

      subscriber.reload
      expect(subscriber.status).to eq("unsubscribed")
    end

    it "returns 404 if subscriber not found" do
      patch :update, params: { id: 999, subscriber: { status: "unsubscribed" } }, format: :json

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:message]).to eq "Subscriber not found"
    end
  end
end
