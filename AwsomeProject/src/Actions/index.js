import * as types from '../Constants/ActionTypes'

export function savePassportDetails(passportDetails) {
	return {type: types.SAVE_PASSPORT_DETAILS, passportDetails: passportDetails}
}

export function savePersonalDetails(personalDetails) {
	return {type: types.SAVE_PERSONAL_DETAILS, personalDetails: personalDetails}
}

export function saveTravelDetails(travelDetails) {
	return {type: types.SAVE_TRAVEL_DETAILS, travelDetails: travelDetails}
}
