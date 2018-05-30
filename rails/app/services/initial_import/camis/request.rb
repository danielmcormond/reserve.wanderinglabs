module InitialImport::Camis
  class Request
    attr_accessor :agency, :session, :base_url
    def initialize(agency, session_set = false)
      @agency = agency
      @base_url = agency.details['url']
      set_session if session_set
    end

    def set_session
      session_request = Mechanize.new
      session_request.user_agent_alias = 'Windows Chrome'
      session_request.get("#{base_url}/Home.aspx")
      @session = session_request.cookie_jar
    end

    def get(path)
      url = "#{base_url}#{path}"
      place_request = Mechanize.new
      place_request.user_agent_alias = 'Windows Chrome'
      place_request.get(url)
    end

    def site_details(site_id)
      path = '/Details.ashx'
      url = "#{base_url}#{path}"
      site_request = Mechanize.new
      site_request.user_agent_alias = 'Windows Chrome'
      site_request.cookie_jar = session
      data = {
        "type": "Resource",
        "id": site_id,
      }
      site_request.post(url, data)
    end
  end
end
