import { toDoActions } from "../constants/toDoActionTypes"

const initialState = {
    tasks: []
}

export const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case toDoActions.LOAD_TO_DOS:
            return { ...state, tasks: action.payload }
        case toDoActions.SAVE_TODO:
            return { ...state, tasks: action.payload }
        case toDoActions.UPDATE_TO_DOS:
            return { ...state, tasks: action.payload }
        case toDoActions.DELETE_TO_DOS:
            return { ...state, tasks: action.payload }
        default:
            return state
    }
}