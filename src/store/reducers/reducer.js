import { combineReducers } from "redux"
import { toDoReducer } from './toDoReducer'


const reducer = combineReducers({
    toDos: toDoReducer
})

export default reducer