import React, {useState} from 'react'

export const AddForm = ({saveToDo}) => {

    const [taskName, setTaskName] = useState('');
    
    const handleChange = (event) => {
        setTaskName(event.target.value)
    }

    const handleToDoSave = (event) => {
        if(event.key === 'Enter') {
            const result = saveToDo(taskName)
            setTaskName('')
        }
    }

    return (
        <div className="add-form">
            <label htmlFor="taskname">Task Name</label>
            <input type="text" className="name" value={taskName} onChange={handleChange} onKeyPress={handleToDoSave} />
            <br />
            <button type="button" className="btn" onClick={handleToDoSave}>Create</button>
        </div>
    )
}
