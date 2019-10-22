import React from "react";
import "./App.css";
import AuthPage from "./pages/auth/Auth.component";
import BookingPage from "./pages/booking/Booking.component";
import EventsPage from "./pages/events/Events.component";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact></Redirect>
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
