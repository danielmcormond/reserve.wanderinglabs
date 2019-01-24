module InitialImport::Camis
  class SiteIds
    attr_accessor :session, :facility

    def initialize(session, facility)
      @session = session
      @facility = facility
    end

    def path
      facility.details['path']
    end

    def body
      @_body ||= session.get(path).body
    end

    def ids
      body.scan(/SelectRce\((.*?)\)/).flatten.uniq.map { |r| r.delete('\'').split(',').last }
    end
  end
end
