import * as types from '../Constants/ActionTypes'

export default function passportDetails(state={}, action) {
	switch(action.type) {
		case types.SAVE_PASSPORT_DETAILS:
  		return action.passportDetails
  	default:
  		return state
  }
}
