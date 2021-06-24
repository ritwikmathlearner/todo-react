import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveToDo } from '../../store/actions/toDoActions';
import { makeRequest } from '../../utils/fetch';

export const AddForm = () => {

    const [taskName, setTaskName] = useState('');
    const list = useSelector(state => state.toDos.tasks)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setTaskName(event.target.value)
    }

    const handleToDoSave = async (event) => {
        if ((event.key === 'Enter' || event.type === 'click') && taskName !== '') {
            try {
                let body = {
                    "taskname": taskName
                }
                setTaskName('')

                let [status, response] = await makeRequest(['api/todo', 'POST', body])

                if (status !== 202)
                    throw new Error('Insert not successful')
                
                dispatch(saveToDo([...list, response]))
                return true
            } catch (error) {
                return false
            }
        }
    }

    return (
        <div className="add-form">
            <label htmlFor="taskname">Task Name</label>
            <input type="text" className="name" value={taskName} onChange={handleChange} onKeyPress={handleToDoSave} autoFocus />
            <br />
            <button type="button" className="btn" onClick={handleToDoSave}>Create</button>
        </div>
    )
}
