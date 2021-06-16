import React from 'react'

export const AddForm = () => {
    return (
        <div className="add-form">
            <label htmlFor="taskname">Task Name</label>
            <input type="text" className="name" />
            <br />
            <button type="button" className="btn">Create</button>
        </div>
    )
}
