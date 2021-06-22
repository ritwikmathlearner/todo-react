import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadToDos } from '../../store/actions/toDoActions'
import { makeRequest } from '../../utils/fetch'
import { ToDo } from '../todo/ToDo'
import { Loader } from '../loader/Loader'

export const Container = ({ updateToDo, deleteToDo }) => {
    const items = useSelector(state => state.toDos.tasks)
    const dispatch = useDispatch()

    const fetchToDos = async () => {
        const [status, response] = await makeRequest(['api/getAll', 'GET', null])
        return response

    }

    useEffect(() => {
        fetchToDos().then(toDos => {
            dispatch(loadToDos(toDos))
        })
    }, [])
    
    if (items.length < 1) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className="tasks">
                {items.map((item, index) => <ToDo key={index} item={item} updateToDo={updateToDo} deleteToDo={deleteToDo} />)}
            </div>
        )
    }
}
