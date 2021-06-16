import React from 'react'
import { ToDo } from '../todo/ToDo'

export const Container = ({items, updateToDo}) => {
    return (
        <div className="tasks">
            {items.map((item, index) => <ToDo key={index} item={item} updateToDo={updateToDo} />)}
        </div>
    )
}
