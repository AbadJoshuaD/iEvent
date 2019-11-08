import React from "react";
import "./App.css";
import "typeface-montserrat";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./context/auth-context";
import HomePage from "./pages/home/Home.component";
class App extends React.Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <main className="main-content">
              <Route exact path to="/" component={HomePage} />
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
