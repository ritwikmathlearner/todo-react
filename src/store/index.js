import { combineReducers, createStore } from "redux"
import { toDoActions } from "./constants/toDoActionTypes"

const initialState = {
    tasks: []
}

const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case toDoActions.LOAD_TO_DOS:
            return { ...state, tasks: action.payload }
        case toDoActions.UPDATE_TO_DOS:
            return { ...state, tasks: action.payload }
        case toDoActions.DELETE_TO_DOS:
            return { ...state, tasks: action.payload }
        default:
            return state
    }
}

const reducer = combineReducers({
    toDos: toDoReducer
})

const store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store