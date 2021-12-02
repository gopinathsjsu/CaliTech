import logo from "./logo.svg";
import "./App.css";
import Checkout from "./Screens/Checkout";
import Signup from "./Screens/Signup";
import MileageAccount from "./Screens/MileageAccount";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./Screens/Login";
import SearchFlights from "./Screens/SearchFlights";
import AdminPage from './Screens/AdminPage'
import HomePage from './Screens/HomePage'
import Pickseat from "./Screens/Pickseat";
import ProfileCreation from "./Screens/ProfileCreation";
import BookingHistory from './Screens/BookingHistory'


function App() {
const loginSession = localStorage.getItem('accesstoken');
const PrivateRoute = ({login,Component, ...rest}) => {
  return(
    <Route {...rest}>
      {login ? <Component /> : <Redirect to="/" />}
    </Route>
  )
}
  return (
    <>
      <BrowserRouter>
        <Switch>
        <Route path='/' exact component={HomePage}>
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
          <PrivateRoute path="/checkout" login={!!loginSession} Component={Checkout} />
          <PrivateRoute path="/searchflights" login={!!loginSession} Component={SearchFlights} />
          <PrivateRoute path="/mileageaccount" login={!!loginSession} Component={MileageAccount} />
          <PrivateRoute path="/pickseat" login={!!loginSession} Component={Pickseat} />
          <PrivateRoute path="/profilecreation" login={!!loginSession} Component={ProfileCreation} />
          <PrivateRoute path='/bookinghistory' login={!!loginSession} Component={BookingHistory} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
