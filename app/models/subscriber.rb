class Subscriber < ApplicationRecord
  enum status: { subscribed: 0, unsubscribed: 1 }

  before_validation :normalize_email

  validates :name, presence: true
  validates :email,
            presence: true,
            format: { with: URI::MailTo::EMAIL_REGEXP },
            uniqueness: { case_sensitive: false }

  private

  def normalize_email
    self.email = email.to_s.strip.downcase
  end
end
