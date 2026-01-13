class CreateSubscribers < ActiveRecord::Migration[6.1]
  def change
    create_table :subscribers do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_index :subscribers, "LOWER(email)", unique: true, name: "index_subscribers_on_lower_email"
  end
end
