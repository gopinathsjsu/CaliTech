import logo from "./logo.svg";
import "./App.css";
import Checkout from "./Screens/Checkout";
import Signup from "./Screens/Signup";
import MileageAccount from "./Screens/MileageAccount";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./Screens/Login";
import SearchFlights from "./Screens/SearchFlights";
import AdminPage from './Screens/AdminPage'
import HomePage from './Screens/HomePage'
import Pickseat from "./Screens/Pickseat";
function App() {
  return (
    <>
      {/* <Pickseat /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/searchflights">
            <SearchFlights />
          </Route>
          <Route path="/mileageaccount">
            <MileageAccount />
          </Route>
          <Route path='/' exact component={HomePage}>
          </Route>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
          <Route path="/pickseat">
            <Pickseat />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
