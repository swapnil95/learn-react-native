import { combineReducers } from 'redux'
import passportDetails from './passportDetails'
import travelDetails from './travelDetails'

const reducer = combineReducers({
	passportDetails,
	travelDetails
})

export default reducer
