import { toDoActions } from "../constants/toDoActionTypes"

export const saveToDo = (toDo) => {
    return {
        type: toDoActions.SAVE_TODO,
        info: "Save a new task",
        payload: toDo 
    }
}

export const updateToDo = (toDos) => {
    return {
        type: toDoActions.UPDATE_TO_DOS,
        info: "Update a task",
        payload: toDos
    }
}

export const deleteToDo = (toDos) => {
    return {
        type: toDoActions.DELETE_TO_DOS,
        info: "Delete a task",
        payload: toDos
    }
}

export const loadToDos = (toDos) => {
    return {
        type: toDoActions.LOAD_TO_DOS,
        info: "Load all tasks",
        payload: toDos
    }
}