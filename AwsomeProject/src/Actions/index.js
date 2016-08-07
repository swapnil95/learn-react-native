import * as types from '../Constants/ActionTypes'
import Server from '../NativeModules/Server'
import ToastAndroid from '../NativeModules/ToastAndroid';

export function savePassportDetails(passportDetails) {
	ToastAndroid.show('Passport Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_PASSPORT_DETAILS, passportDetails: passportDetails}
}

export function savePersonalDetails(personalDetails) {
	data = {a: "value", b: "value"}
	let output = Server.requestUrl("http://posttestserver.com/post.php", JSON.stringify(data), (output) => {
	ToastAndroid.show(output, ToastAndroid.SHORT);
	})
	return {type: types.SAVE_PERSONAL_DETAILS, personalDetails: personalDetails}
}

export function saveTravelDetails(travelDetails) {
	ToastAndroid.show('Travel Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_TRAVEL_DETAILS, travelDetails: travelDetails}
}
