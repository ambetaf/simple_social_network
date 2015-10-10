class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :user
  has_many :posts
  has_many :comments

  def as_json(options = {})
    super(options.merge(include: [posts:{include: :user, comments: {include: :user}}]))
  end
end
