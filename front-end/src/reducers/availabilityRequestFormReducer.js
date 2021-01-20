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
    default: {
      return { ...state }
    }
  }
}
