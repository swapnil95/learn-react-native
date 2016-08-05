import * as types from '../Constants/ActionTypes'

export default function personalDetails(state={memberCount: 1, memberDetails: [{}], selectedMember: 0}, action) {
	switch(action.type) {
		case types.SAVE_PERSONAL_DETAILS:
  		return action.personalDetails
  	default:
  		return state
  }
}
