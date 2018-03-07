module VersionTwoImport
  class Database

    def initialize
      @filename =  "#{Rails.root}/tmp/version_2_import_test.json" # "#{Rails.root}/../tmp/version2_db.json"
    end

    def each
      import_count = 0
      last = nil

      File.foreach(@filename) do |line|
        import = VersionTwoImport::Import.new(line)

        import_count += 1 if import.import?
      end
      import_count
    end

  end
end
