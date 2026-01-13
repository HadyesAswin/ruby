# beehiiv - Take Home Challenge

Congratulations on making it to the coding challenge portion of beehiiv's interview process! In this exercise, we are looking to assess your technical abilities and understand the way you think. This challenge is your chance to flex your skills and show us what you bring to the table — feel free to get creative!

With that in mind, we recommend spending no more than two hours on this project. You’re more than welcome to continue working as long as you see fit to deliver a project you’re proud of, but we also want to be cognizant and respectful of your time.

## Technical Requirements

* Clone this repo and update the backend/frontend code per the functional requirements below.

* Rather than committing straight to the main branch, please create a new branch and open a Pull Request against `main` with your changes. This makes it easier for us to review.

* Keep in mind, we’re reviewing this to assess your ability to contribute to a production environment at scale. Don’t go over the time limit, but build it as if you were going to ship this as is.

* Extend the unit test coverage as you see fit

* Deploy the final product (we use [Heroku](https://www.heroku.com/), but you are free to use whatever you wish)

* Let us know that you have completed the challenge and share the URL to the deployed end product.

## Functional Requirements

* The current credentials are being hard coded to “username” and “password”, but we’d like that to be moved to Environment Variables so that we can change that on the server to something else without a code change

* We need the ability to persist the “subscribers”
  * They need name, email, and some concept of status (to show if they are subscribed/unsubscribed)
  * Emails should be actual email addresses and should be unique (case insensitive, not store any whitespace)
    * For instance “Andrew@test.com” and “andrew@test.com” are the same email address

* The current Add Subscriber Modal should actually create subscribers and reload the list when one is added
  * If there is an error, we’d like to see some sort of notification telling us what the error is

* The current Update Subscriber Status Modal should actually change if the subscriber is unsubscribed or subscribed and reload the list when it is updated
  * If there is an error, we’d like to see some sort of notification telling us what the error is

* The index page should support server side pagination

----

## The Stack

#### Server
- Language
  - Ruby 3.1.2
  - Rails 6.1
  - Node 16

# Development Getting Started

    # Clone and setup repo
    git clone <your_challenge_repo>
    cd <your_challenge_repo>

    # Install and setup server dependencies
    bundle install
    bundle exec rake db:create db:migrate
    yarn install

## Run it

    # Backend (http://localhost:2000)
    bundle exec foreman start

    # Frontend (http://localhost:2001)
    yarn watch:app

    # view at http://localhost:2001, basic auth is username/password (see `config.ru`)

## Test It

    # Setup test DB for testing
    ./scripts/setup_test_db

    # Run tests
    bundle exec rspec

## Lint It

    bundle exec standardrb

## What it contains

### Index Page

![image](https://user-images.githubusercontent.com/5751986/148653166-031d7c6e-8dc2-4db9-9d28-3db71a8599d9.png)

### Add Subscriber Modal

![image](https://user-images.githubusercontent.com/5751986/148653171-4a30cf43-5f42-435c-bc68-82f44524ee50.png)

### Update Subscriber Status Modal

![image](https://user-images.githubusercontent.com/5751986/148653182-3a282533-dbb8-4d96-a511-5a5008cf3daf.png)
