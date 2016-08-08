import * as types from '../Constants/ActionTypes'
import Server from '../NativeModules/Server'
import ToastAndroid from '../NativeModules/ToastAndroid';

export function savePassportDetails(passportDetails) {
	const data = {
    "user": 1,
    "passport_number": passportDetails.passportNumber,
    "place_of_issue": passportDetails.placeOfIssue,
    "passport_issuance_date": passportDetails.passportIssuanceDate,
    "passport_expiration_date": passportDetails.passportExpirationDate,
    "country": passportDetails.countryOfIssue
	}
	console.log(data)
	Server.requestUrl("http://10.0.2.2:8000/passport-details/", JSON.stringify(data), (output) => {
		ToastAndroid.show("Saved", ToastAndroid.SHORT);
	})
	return {type: types.SAVE_PASSPORT_DETAILS, passportDetails: passportDetails}
}

export function savePersonalDetails(personalDetails) {
	const data = {a: 4, b: 5}
	Server.requestUrl("http://posttestserver.com/post.php", JSON.stringify(data), (output) => {
		ToastAndroid.show(output, ToastAndroid.SHORT);
	})
	return {type: types.SAVE_PERSONAL_DETAILS, personalDetails: personalDetails}
}

export function saveTravelDetails(travelDetails) {
	ToastAndroid.show('Travel Details Saved', ToastAndroid.SHORT);
	return {type: types.SAVE_TRAVEL_DETAILS, travelDetails: travelDetails}
}
