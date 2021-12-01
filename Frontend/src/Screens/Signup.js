import React from "react";
import ReactDOM from "react-dom";
import AdminNav from "../Components/Navbar";
import { withRouter, Redirect } from 'react-router-dom';
import Particle from '../Components/Particle'
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname:"",
      email: "",
      confirm_pwd:"",
      password: "",
      passwordError: false,
      formValid: false,
      authError: false,
      formSubmitted: false,
      signInredirect: false,
      loginRedirect:false,
      redirect:null,
      isValid: false,
      // passwordtoast: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.handlesignIn = this.handlesignIn.bind(this)
  }

  isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  handleEmailBlur(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
    this.setState({ emailError2: false });

    if (value.length <= 0) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
      if (!this.isValidEmail(value)) {
        this.setState({ emailError2: true });
      }
    }

    this.setState({ formSubmitted: false });
  }
  
  handlePasswordBlur(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
    this.setState({ emailError2: false });

    if (value.length <= 0) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }

    this.setState({ formSubmitted: false });
  }

  handleChange(e) {
    this.setState({ formSubmitted: false });
    this.setState({ formValid: false });
    this.setState({ [e.target.name]: e.target.value });
  }

  handlesignIn(e){
    this.setState({signInredirect:true})
    // const CustomToast = ({closeToast})=>{
    //   return(
    //     <div style={{textAlign:"center"}}>
    //       <h4>Sign in successful</h4>
    //     </div>
    //   )
    // }
    e.preventDefault()
    this.setState({ redirect: "/login" });

  }

  notify = () => {
  toast.success('Passwords do not match!');
  }

  handleSubmit(e) {
    const {
      name,
      email,
      password,
      confirm_pwd,
      emailError,
      emailError2,
      passwordError,
      formSubmitted,
      isValid
      
    } = this.state;

    if (password !== confirm_pwd) {
      this.setState({isValid: false});
      console.log(isValid);
      console.log(password,confirm_pwd);
      // this.setState({passwordtoast: true});
      const CustomToast = ({closeToast})=>{
        return(
          <div style={{textAlign:"center"}}>
            <h4>Passwords do not match!</h4>
          </div>
        )
      
      }
      toast.error(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
    }

    this.setState({ authError: true });
    this.setState({ emailError: email ? false : true });
    if (email && !emailError) {
      this.setState({ emailError2: this.isValidEmail(email) ? false : true });
    }
    this.setState({ passwordError: password ? false : true });

    if (email && password && !passwordError && !emailError && !emailError2) {
      this.setState({ formValid: true });
      this.setState({ formSubmitted: true });

      // Update this accordingly.
      if (email === "demo@demo.com" && password === "demo") {
        this.setState({ authError: false });
      }
    } else {
      this.setState({ formValid: false });
    }
    // axios.post('/create', {name , email , password})
    // .then((res) => {
    //   console.log(res)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })

    e.preventDefault();
    // return(<Redirect to='/profilecreation'/>)
    // this.setState({ redirect: "/profilecreation" });
    this.props.history.push('/profilecreation');

    
  }

  render() {
    const {
      name,
      email,
      password,
      confirm_pwd,
      passwordError,
      emailError,
      emailError2,
      formSubmitted,
      authError,
      isValid
    } = this.state;
    let passwordMatch = null;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    if(this.state.passwordtoast){
      passwordMatch = this.notify();
    }

    return (
      <>
        {/* <AdminNav /> */}
        {/* <Particle /> */}

        <div className="card shadow-sm border-0 px-3 col-sm-4 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
          <div className="card-header bg-transparent border-0 text-center text-uppercase">
            <h3>Signup</h3>
          </div>
          <div className="card-body">
            <form
              action="/"
              onSubmit={(e) => this.handleSubmit(e)}
              encType="multipart/form-data"
              autoComplete="off"
            >
              <div className="form-group mb-3">
                <label className="mb-0">
                  Full Name<span className="text-danger">*</span>
                </label>
                <input
                  name="fname"
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  value={name}
                  onChange={this.handleChange}
                  onBlur={this.handleEmailBlur}
                  required="required"
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-0">
                  Email ID<span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email ID"
                  value={email}
                  onChange={this.handleChange}
                  onBlur={this.handleEmailBlur}
                  required="required"
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-0">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handlePasswordBlur}
                  required="required"
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-0">
                Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  name="confirm_pwd"
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  value={confirm_pwd}
                  onChange={this.handleChange}
                  onBlur={this.handlePasswordBlur}
                  required="required"
                />
              </div>
              {/* <p className=" mb-3"> */}
              <button className="btn btn-primary w-30">Sign Up</button>
                {/* <input
                  type="button"
                  className="btn btn-primary w-30"
                  value="Signup"
                /> */}
              {/* </p> */}
              <div className="text-center">
                <p className="small mb-0">Already have an account?</p>
                <button className="btn btn-primary w-30"
                onClick={this.handlesignIn}>Login</button>
                {/* <input
                  type="button"
                  className="btn btn-primary w-30"
                  value="Login"
                  onClick={signInredirect ? <Redirect /> : null}
                /> */}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
