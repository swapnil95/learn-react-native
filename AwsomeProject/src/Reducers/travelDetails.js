import * as types from '../Constants/ActionTypes'

export default function travelDetails(state={}, action) {
	switch(action.type) {
		case types.SAVE_TRAVEL_DETAILS:
			console.log("reducer", action.travelDetails)
  		return action.travelDetails
  	default:
  		return state
  }
}
