import camelcaseKeys from 'camelcase-keys'
import dayjs from 'dayjs'

const initialState = {
  facility: {},
  facilityId: '',
  dateStart: null,
  dateEnd: null,
  stayLength: '',
  arrivalDays: [],
  length: '',
  type: 'rv',
  electric: '',
  water: false,
  sewer: false,
  pullthru: false,
  sitePremium: false,
  ignoreAda: true,
  sites: [],
  email: '',
  specificSiteIds: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PREMIUM': {
      return { ...state, premium: true }
    }
    case "FETCH_AR_FULFILLED": {
      const ar = camelcaseKeys(payload)
      return {
        ...state,
        uuid: ar.uuid,
        facility: ar.facility,
        facilityId: ar.facilityId,
        type: ar.type,
        dateEnd: dayjs(ar.dateEnd).toDate(),
        dateStart: dayjs(ar.dateStart).toDate(),
        notifySms: ar.notifySms,
        premium: ar.premium,
        stayLength: ar.stayLength,
        specificSiteIds: ar.specificSiteIds,
        length: ar.minLength,
        water: ar.water,
        sewer: ar.sewer,
        pullthru: ar.pullthru,
        electric: ar.minElectric && ar.minElectric.toString(),
        sitePremium: ar.sitePremium,
        ignoreAda: ar.ignoreAda,
        arrivalDays: ar.arrivalDays
      };
    }
    default: {
      return { ...state }
    }
  }
}
