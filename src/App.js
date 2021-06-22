import { useEffect } from 'react'
import { Switch, Route, useHistory } from "react-router-dom"

import './App.css'

import { AddForm } from './components/form/AddForm'
import { Container } from './components/list-container/Container'
import { LoginForm } from './components/login/LoginForm'
import { Anchor } from './components/elements/Anchor'
import { makeRequest } from './utils/fetch'
import { useSelector } from 'react-redux'


function App() {
  const saveToDo = async (taskName) => {
    // try {
    //   let body = {
    //     "taskname": taskName
    //   }

    //   if (existsInList(taskName))
    //     return

    //   let response = await makeRequest(['api/todo', 'POST', body])
    //   if (response.status !== 202)
    //     throw new Error('Insert not successful')

    //   let item = await response.json()
    //   setList([...list, item])
    //   return true
    // } catch (error) {
    //   return false
    // }
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {/* {loggedIn ? <Anchor classText="link" path="/logout" innerText="Logout" /> : <Anchor classText="link" path="/login" innerText="Login" />} */}
          <AddForm saveToDo={saveToDo} />
          <Container />
        </Route>
        <Route path="/login">
          <Anchor classText="link-left" path="/" innerText='<i class="fas fa-arrow-left"></i>' />
          <LoginForm path="/login" login={false} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
