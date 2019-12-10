class AvailabilityImportSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :date_start, :date_end, :history_open_count, :history_filled_count,
             :history_open, :history_filled

  belongs_to :facility

  def attributes(*args)
    if @instance_options[:expanded].present?
      super
    else
      super.except(:history_open, :history_filled)
    end
  end

  def history_open
    return nil unless object.history_open

    history_open_sites = Site.where(id: object.history_open.map { |h| h['site_id'] }).all
    object.history_open.map do |h|
      {
        site_id: history_open_sites.select { |s| s.id = h['site_id'] }.first&.site_num,
        avail_date: h['avail_date'],
      }
    end
  end

  def history_filled
    return nil unless object.history_filled

    history_filled_sites = Site.where(id: object.history_filled.map { |h| h['site_id'] }).all
    object.history_filled.map do |h|
      {
        site_id: history_filled_sites.select { |s| s.id = h['site_id'] }.first&.site_num,
        avail_date: h['avail_date'],
      }
    end
  end

  def history_open_count
    object.history_open&.size || 0
  end

  def history_filled_count
    object.history_filled&.size || 0
  end
end
