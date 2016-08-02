import * as types from '../Constants/ActionTypes'

export default function personalDetails(state={}, action) {
	switch(action.type) {
		case types.SAVE_PERSONAL_DETAILS:
  		return action.personalDetails
  	default:
  		return state
  }
}
