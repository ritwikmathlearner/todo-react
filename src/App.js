import { useState, useEffect } from 'react';

import './App.css';

import { AddForm } from './components/form/AddForm'
import { Container } from './components/list-container/Container';


function App() {
  const [list, setList] = useState([])

  const baseUri = 'http://localhost:5000/'
  let header = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  const sentData = (method, body = null) => {
    if (body)
      return { method: method, headers: header, body: JSON.stringify(body) }
    else
      return { method: method, headers: header, }
  };

  const loadToDos = async () => {
    try {
      let items = await fetch(`${baseUri}api/getAll`, sentData('GET')).then(response => response.json())
      return items
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadToDos().then(data => {
      if (data)
        setList(data)
    })
  }, []);

  const updateToDo = async (original, toDo) => {
    let newList = list.map(item => item.name === original ? { "name": toDo } : item)
    try {
      let body = {
        oldname: original,
        newname: toDo
      }
      let response = await fetch(`${baseUri}todo`, sentData('PATCH', body))

      if (response.status !== 202)
        throw new Error('Update not successful')

      setList(newList)
      return true
    } catch (error) {
      return false
    }
  }

  const deleteToDo = async (taskname) => {
    let newList = list.filter(item => item.name !== taskname)
    try {
      let body = {
        "taskname": taskname
      }
      let response = await fetch(`${baseUri}todo`, sentData('DELETE', body))
      if (response.status !== 202)
        throw new Error('Delete not successful')

      setList(newList)
      return true
    } catch (error) {
      return false
    }
  }

  const saveToDo = async (taskName) => {
    try {
      let body = {
        "taskname": taskName
      }
      let response = await fetch(`${baseUri}api/todo`, sentData('POST', body))

      if (response.status !== 202)
        throw new Error('Insert not successful')

      let item = await response.json()
      setList([item, ...list])
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <div className="App">
      <AddForm saveToDo={saveToDo} />
      {list.length > 0 ? <Container items={list} updateToDo={updateToDo} deleteToDo={deleteToDo} /> : ''}
    </div>
  );
}

export default App;
