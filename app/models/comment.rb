class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  acts_as_votable

  def score
    self.get_upvotes.size - self.get_downvotes.size
  end

  def as_json(options = {})
    super(options.merge(include: :user))
  end

end
