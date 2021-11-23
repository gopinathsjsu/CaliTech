import logo from "./logo.svg";
import "./App.css";
import Checkout from "./Screens/Checkout";
import Signup from "./Screens/Signup";
import MileageAccount from "./Screens/MileageAccount";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./Screens/Login";
import SearchFlights from "./Screens/SearchFlights";
import Particles from "react-tsparticles";
import AdminPage from './Screens/AdminPage'
function App() {
  return (
    <>
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#0d47a1",
          
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            modes: {
              bubble: {
                distance: 400,
                duration: 3,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 3,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode:"bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />

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
          <Route path="*">
            <Redirect to="/login" />
          </Route>
          <Route path="/adminpage">
            <AdminPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
