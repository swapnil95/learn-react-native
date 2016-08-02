import { combineReducers } from 'redux'
import passportDetails from './passportDetails'
import personalDetails from './personalDetails'

const reducer = combineReducers({
	passportDetails,
	personalDetails
})

export default reducer
