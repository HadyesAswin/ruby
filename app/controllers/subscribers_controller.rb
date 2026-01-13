# frozen_string_literal: true

class SubscribersController < ApplicationController
  include PaginationMethods

  ##
  # GET /api/subscribers
  # def index
  #   subscribers = [
  #     {
  #       id: 1,
  #       name: "Rick Sanchez",
  #       email: "rickc137@citadel.com",
  #       status: "active"
  #     },
  #     {
  #       id: 2,
  #       name: "Morty Smith",
  #       email: "morty.smith@gmail.com",
  #       status: "inactive"
  #     },
  #     {
  #       id: 3,
  #       name: "Jerry Smith",
  #       email: "jerry.smith@aol.com",
  #       status: "active"
  #     },
  #     {
  #       id: 4,
  #       name: "Beth Smith",
  #       email: "beth.smith@gmail.com",
  #       status: "active"
  #     },
  #     {
  #       id: 5,
  #       name: "Summer Smith",
  #       email: "summer.smith@gmail.com",
  #       status: "active"
  #     },
  #     {
  #       id: 6,
  #       name: "Bird Person",
  #       email: "bird.person@birdworld.com",
  #       status: "active"
  #     }
  #   ]

  #   total_records = subscribers.count
  #   limited_subscribers = subscribers[offset..limit]

  #   render json: {subscribers: limited_subscribers, pagination: pagination(total_records)}, formats: :json
  # end

  def index
    subscribers = Subscriber.order(created_at: :desc)

    total_records = subscribers.count
    paginated_subscribers = subscribers.offset(offset).limit(limit)

    render json: {
      subscribers: paginated_subscribers,
      pagination: pagination(total_records)
    }, status: :ok
  end

  # def create
  #   render json: {message: "Subscriber created successfully"}, formats: :json, status: :created
  # end
  def create
    subscriber = Subscriber.new(subscriber_params)

    if subscriber.save
      render json: { message: "Subscriber created successfully", subscriber: subscriber }, status: :created
    else
      render json: { message: subscriber.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end


  

  # def update
  #   render json: {message: "Subscriber updated successfully"}, formats: :json, status: :ok
  # end
  def update
    subscriber = Subscriber.find_by(id: params[:id])
    return render json: { message: "Subscriber not found" }, status: :not_found unless subscriber

    if subscriber.update(update_subscriber_params)
      render json: { message: "Subscriber updated successfully", subscriber: subscriber }, status: :ok
    else
      render json: { message: subscriber.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end


  private

  def subscriber_params
    params.require(:subscriber).permit(:name, :email)
  end

  def update_subscriber_params
    params.require(:subscriber).permit(:status)
  end
end
