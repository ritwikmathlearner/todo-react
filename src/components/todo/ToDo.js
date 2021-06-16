import React, { useState } from 'react'

export const ToDo = ({ item, updateToDo }) => {

    const [edit, setEdit] = useState(false)
    const [inputValue, setInputValue] = useState(item.name)
    const [wait, setWait] = useState(false)
    const [error, setError] = useState(false)

    const showEditContainer = () => {
        setEdit(true)
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    const restoreParagraph = (value) => {
        setInputValue(value)
        setEdit(false)
    }

    const processEdit = async (event) => {
        if (event.key === 'Enter') {
            if (item.name.trim() === inputValue.trim()) {
                restoreParagraph(item.name)
                setWait(false)
            } else {
                restoreParagraph(inputValue)
                setWait(true)
                setTimeout(async () => {
                    let result = await updateToDo(item.name, inputValue)
                    setWait(false)
                    if (result) {
                        restoreParagraph(inputValue)
                    } else {
                        console.log(item.name)
                        restoreParagraph(item.name)
                        setError(true)
                        setTimeout(() => {
                            setError(false)
                        }, 500);
                    }
                }, 1500);
            }
        }
    }

    let editContainer = <div className="edit-container">
        <input type="text" name="taskname" onChange={handleChange} value={inputValue} onKeyPress={processEdit} />
        <i className="fas fa-undo-alt restore-todo" onClick={() => restoreParagraph(item.name)}></i>
    </div>
    let waitContent = wait ? <span className="wait"><i className="far fa-clock"></i></span> : ''
    let errorContent = error ? <span className="wait"><i className="fas fa-exclamation"></i></span> : ''
    let paragraph = () => {
        return <div className="paragraph-container">
            <p>{item.name}</p>
            {waitContent}
            {errorContent}
        </div>
    }


    return (
        <div className="task">
            {edit ? editContainer : paragraph()}
            <span className="edit" onClick={showEditContainer}>
                <i className="fas fa-edit"></i>
            </span>
            <span className="delete"><i className="fas fa-trash-alt"></i></span>
        </div>
    )
}
