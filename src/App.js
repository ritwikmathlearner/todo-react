import { Switch, Route } from "react-router-dom"

import './App.css'

import { AddForm } from './components/form/AddForm'
import { Container } from './components/list-container/Container'
import { LoginForm } from './components/login/LoginForm'
import { Anchor } from './components/elements/Anchor'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {/* {loggedIn ? <Anchor classText="link" path="/logout" innerText="Logout" /> : <Anchor classText="link" path="/login" innerText="Login" />} */}
          <AddForm />
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
