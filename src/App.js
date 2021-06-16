import { AddForm } from './components/form/AddForm'
import { Container } from './components/list-container/Container';
import { useState, useEffect } from 'react';
import './App.css';

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
      return { method: method, headers: header, body: JSON.stringify(body)}
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
      if(data)
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

  return (
    <div className="App">
      <AddForm />
      {list.length > 0 ? <Container items={list} updateToDo={updateToDo} /> : ''}
    </div>
  );
}

export default App;
