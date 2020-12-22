class Payment < ApplicationRecord
  extend Enumerize

  belongs_to :user, optional: true

  enumerize :provider, in: %i[paypal], predicates: { prefix: true }

  scope :approved, -> { where(status: 'approved') }

  def remap_user
    return if user_id
    new_user = User.where(email: email).first
    if new_user
      self.update_attributes(user_id: new_user.id)
      new_user.mark_premium
    end
  end
end
