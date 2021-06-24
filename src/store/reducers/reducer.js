import { combineReducers } from "redux"
import { toDoReducer } from './toDoReducer'
import { utilReducer } from './utilReducer'


const reducer = combineReducers({
    toDos: toDoReducer,
    utilities: utilReducer
})

export default reducer