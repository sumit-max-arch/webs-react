import React from "react";
import Store from "./Store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddContact from "./components/AddContact";
import EditContact  from "./components/EditContact";
import {  Provider } from "react-redux";
import Contacts from "./components/Contacts";
import Navbar from "./components/elements/Navbar";


const Welcome = ({user, onSignOut})=> {
  // This is a dumb "stateless" component
  return (
    <div>
      Welcome <strong>{user.username}</strong>!
      <a href="javascript:;" onClick={onSignOut}>Sign out</a>

      <Provider store={Store}>
      <Router>
        <div className="App">
        <Navbar /> 
          <div className="container">
            <div className="py-3">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contacts/add" component={AddContact} />
                <Route
                  exact
                  path="/contacts/edit/:id"
                  component={EditContact}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
    </div>
  )
}

class LoginForm extends React.Component {
  
  // Using a class based component here because we're accessing DOM refs
 
  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onSignIn(username, password)
  }
  
  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username"  placeholder="Enter Username" name="uname" required />
        <input type="password" ref="password" placeholder="Enter Password" name="psw" required />
        <button type="submit">Login</button>
        <label>
        <input type="checkbox" checked="checked" name="remember" /> Remember me</label>
        <div class="container">
       <button type="button" class="cancelbtn">Cancel</button>
       <span class="psw">Forgot <a href="#">password?</a></span>
       </div>
      </form>
    )
  }

}


class App extends React.Component {
  
  constructor(props) {
    super(props)
    // the initial application state
    this.state = {
      user: null
    }
  }
  
  // App "actions" (functions that modify state)
  signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    this.setState({
      user: {
        username,
        password,
      }
    })
  }
  
  signOut() {
    // clear out user from state
    this.setState({user: null})
  }
  
  render() {
    // Here we pass relevant state to our child components
    // as props. Note that functions are passed using `bind` to
    // make sure we keep our scope to App
    return (
      <div>
        <h1>Employees Login Management</h1>
        {
          (this.state.user) ?
            <Welcome
              user={this.state.user}
              onSignOut={this.signOut.bind(this)}
            />
            :
            <LoginForm
              onSignIn={this.signIn.bind(this)}
            />
        }
      </div>
    );
  }
}
export default App;