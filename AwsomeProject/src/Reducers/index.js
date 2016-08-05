import { combineReducers } from 'redux'
import passportDetails from './passportDetails'
import personalDetails from './personalDetails'
import travelDetails from './travelDetails'

const reducer = combineReducers({
	passportDetails,
	travelDetails,
	personalDetails
})

export default reducer
