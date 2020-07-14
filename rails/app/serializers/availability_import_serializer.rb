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
    return unless @instance_options[:expanded]
    return nil unless object.history_open

    history = @instance_options[:site_id] ? object.history_open.select { |avail| avail['site_id'].to_i == @instance_options[:site_id].to_i } : object.history_open[0..100]
    history_open_sites = Site.where(id: history.map { |h| h['site_id'] }).all
    history.map do |h|
      {
        id: h['site_id'],
        site_id: history_open_sites.find { |s| s.id == h['site_id'] }&.site_num,
        avail_date: h['avail_date'],
      }
    end
  end

  def history_filled
    return unless @instance_options[:expanded]
    return nil unless object.history_filled

    history = @instance_options[:site_id] ? object.history_filled.select { |avail| avail['site_id'].to_i == @instance_options[:site_id].to_i} : object.history_filled[0..100]
    history_filled_sites = Site.where(id: history.map { |h| h['site_id'] }).all
    history.map do |h|
      {
        id: h['site_id'],
        site_id: history_filled_sites.find { |s| s.id == h['site_id'] }&.site_num,
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
