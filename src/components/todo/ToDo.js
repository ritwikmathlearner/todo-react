import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequest } from '../../utils/fetch'
import { updateToDo as modifyToDO, deleteToDo as removeToDo } from '../../store/actions/toDoActions'

export const ToDo = ({ item }) => {

    const list = useSelector(state => state.toDos.tasks)
    const dispatch = useDispatch()
    const existsInList = (taskName) => {
        let result = list.find(item => item.name.trim() === taskName.trim())
        
        if (result)
            return true

        return false
    }

    const updateToDo = async (original, toDo) => {
        if (existsInList(toDo))
            return false

        try {
            let body = {
                oldname: original,
                newname: toDo
            }
            let [status, response] = await makeRequest(['api/todo', 'PATCH', body])

            if (status !== 202)
                throw new Error('Update not successful')

            let newList = list.map(item => item.name === original ? { ...item, name: toDo } : item)
            dispatch(modifyToDO(newList))
            return true
        } catch (error) {
            return false
        }
    }

    const deleteToDo = async (taskname) => {
        try {
            let body = {
                "taskname": taskname
            }
            let [status, response] = await makeRequest(['api/todo', 'DELETE', body])
            
            if (status !== 202)
                throw new Error('Delete not successful')
            
            let newList = list.filter(item => item.name !== taskname)
            dispatch(removeToDo(newList))
            return true
        } catch (error) {
            return false
        }
    }

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
            <span className="delete" onClick={() => deleteToDo(item.name)}><i className="fas fa-trash-alt"></i></span>
        </div>
    )
}
