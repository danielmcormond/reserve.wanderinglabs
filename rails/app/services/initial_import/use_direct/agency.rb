module InitialImport::UseDirect
  class Agency
    def self.ohio
      attrs = {
        name: 'Ohio State Parks (UseDirect)',
        details: {
          url: 'https://reserveohio.com/OhioCampWeb',
          rdr: 'https://ohiordr.usedirect.com/Ohiordr',
          facility_ids: ['1',
                         '12',
                         '2',
                         '3',
                         '382',
                         '383',
                         '384',
                         '385',
                         '386',
                         '387',
                         '388',
                         '389',
                         '390',
                         '391',
                         '392',
                         '393',
                         '394',
                         '395',
                         '396',
                         '397',
                         '398',
                         '399',
                         '4',
                         '400',
                         '401',
                         '402',
                         '403',
                         '404',
                         '410',
                         '411',
                         '412',
                         '413',
                         '414',
                         '415',
                         '416',
                         '417',
                         '418',
                         '419',
                         '420',
                         '421',
                         '422',
                         '423',
                         '424',
                         '425',
                         '432',
                         '433',
                         '434',
                         '435',
                         '436',
                         '437',
                         '438',
                         '439',
                         '440',
                         '441',
                         '442',
                         '443',
                         '444',
                         '445',
                         '446',
                         '447',
                         '448',
                         '449',
                         '450',
                         '451',
                         '452',
                         '453',
                         '454',
                         '455',
                         '456',
                         '457',
                         '458',
                         '459',
                         '460',
                         '461',
                         '462',
                         '463',
                         '464',
                         '465',
                         '466',
                         '467',
                         '468',
                         '469',
                         '470',
                         '471',
                         '472',
                         '473',
                         '474',
                         '475',
                         '476',
                         '477',
                         '478',
                         '479',
                         '480',
                         '481',
                         '482',
                         '483',
                         '484',
                         '485',
                         '486',
                         '487',
                         '488',
                         '489',
                         '490',
                         '491',
                         '492',
                         '493',
                         '494',
                         '495',
                         '496',
                         '497',
                         '498',
                         '499',
                         '5',
                         '501',
                         '502',
                         '503',
                         '504',
                         '506',
                         '507',
                         '508',
                         '509',
                         '510',
                         '511',
                         '512',
                         '513',
                         '514',
                         '515',
                         '516',
                         '517',
                         '518',
                         '519',
                         '520',
                         '521',
                         '522',
                         '523',
                         '524',
                         '526',
                         '527',
                         '528',
                         '529',
                         '530',
                         '531',
                         '532',
                         '533',
                         '534',
                         '535',
                         '536',
                         '537',
                         '538',
                         '539',
                         '540',
                         '541',
                         '542',
                         '543',
                         '544',
                         '545',
                         '546',
                         '547',
                         '548',
                         '549',
                         '550',
                         '551',
                         '552',
                         '553',
                         '554',
                         '555',
                         '556',
                         '557',
                         '558',
                         '559',
                         '560',
                         '561',
                         '562',
                         '563',
                         '564',
                         '565',
                         '567',
                         '568',
                         '569',
                         '570',
                         '571',
                         '572',
                         '573',
                         '574',
                         '575',
                         '576',
                         '577',
                         '578',
                         '579',
                         '580',
                         '581',
                         '588',
                         '590',
                         '591',
                         '6',
                         '60']
        }
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end

    def self.alabama
      attrs = {
        name: 'Alabama State Parks (UseDirect)',
        details: {
          url: 'https://www.reservealapark.com/AlabamaWebHome',
          rdr: 'https://alabamardr.usedirect.com/AlabamaRDR',
          facility_ids: [6, 9, 5, 15, 17, 12, 13, 14, 4, 16, 2, 3, 8, 10, 11, 19, 21]
        }
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end

    def self.ohio_migration
      agency = InitialImport::UseDirect::Agency.ohio

      agency.facility_groups.each do |fg|
        ::Facility.create(agency: agency, details: fg.details, name: fg.name)
      end

      agency.facilities.where.not(ext_facility_id: nil).each do |f|
        new_facility =
          agency
          .facilities
          .where(ext_facility_id: nil)
          .where('details @> ?', { PlaceId: f.facility_group.details['PlaceId'] }.to_json)
          .first

        sg = ::SiteGroup.create(facility: new_facility, name: f.name, ext_id: f.ext_facility_id, details: f.details)

        f.sites.update_all(site_group_id: sg.id, facility_id: new_facility.id)
        f.availability_requests.update_all(facility_id: new_facility.id)
      end

      agency.facilities.each { |f| f.sites.each { |s| s.availabilities.delete_all } }

      agency.facilities.where.not(ext_facility_id: nil).each { |f| f.availability_imports.delete_all }
      agency.facilities.where.not(ext_facility_id: nil).delete_all
      agency.facility_groups.delete_all
      agency.reload
      agency.facilities.each { |f| f.slug = nil; f.save! }
      nil
    end
  end
end
