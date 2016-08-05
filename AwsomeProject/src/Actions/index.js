import * as types from '../Constants/ActionTypes'
import ToastAndroid from '../NativeModules/ToastAndroid';

export function savePassportDetails(passportDetails) {
	ToastAndroid.show('Passport Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_PASSPORT_DETAILS, passportDetails: passportDetails}
}

export function savePersonalDetails(personalDetails) {
	ToastAndroid.show('Personal Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_PERSONAL_DETAILS, personalDetails: personalDetails}
}

export function saveTravelDetails(travelDetails) {
	ToastAndroid.show('Travel Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_TRAVEL_DETAILS, travelDetails: travelDetails}
}
