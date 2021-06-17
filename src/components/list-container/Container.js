import React from 'react'
import { ToDo } from '../todo/ToDo'

export const Container = ({items, updateToDo, deleteToDo}) => {
    return (
        <div className="tasks">
            {items.map((item, index) => <ToDo key={index} item={item} updateToDo={updateToDo} deleteToDo={deleteToDo} />)}
        </div>
    )
}
