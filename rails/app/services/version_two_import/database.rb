module VersionTwoImport
  class Database
    def initialize
      # http://tim-temp.s3.amazonaws.com/2018-04-28-21-04-41/bf91d0b4-c1f7-4893-a7de-af520bd83a93
      # @filename =  "#{Rails.root}/tmp/version_2_import_test.json"
      @filename = "#{Rails.root}/tmp/version2_db.json"
    end

    def body
      r = HTTParty.get('http://tim-temp.s3.amazonaws.com/2018-04-28-21-04-41/bf91d0b4-c1f7-4893-a7de-af520bd83a93')
      r.body
    end

    def each
      ActiveRecord::Base.logger.level = 1

      import_count = 0

      # File.foreach(@filename)
      body.split("\n") do |line|
        import = VersionTwoImport::Import.new(line)
        import_count += 1 if import.create.present?
      end
      import_count
    end
  end
end
