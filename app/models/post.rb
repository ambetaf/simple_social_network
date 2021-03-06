class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user
  acts_as_votable

  def score
    self.get_upvotes.size - self.get_downvotes.size
  end

  def as_json(options = {})
    super(options.merge(include: [:user, comments: {include: :user}]))
  end

end
