import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom'
import Particle from '../Components/Particle'
import axios from "axios";
import AdminNav from "../Components/Navbar";
import { withRouter } from "react-router";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_HOST, BACKEND_PORT } from "../config";

toast.configure();
class AdminLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordError: false,
            formValid: false,
            authError: false,
            formSubmitted: false,
            redirect: null,
            isLogin: false,
            custDetails: {},
            validation:'needs-validation'

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        const {
            name,
            email,
            password,
            emailError,
            emailError2,
            passwordError,
            formSubmitted,
            hist
        } = this.state;


        axios({
            method:'post',
            url:`http://${BACKEND_HOST}:${BACKEND_PORT}/users/login`,
            data: {
                email,
                password
            }

        })
            .then((response) =>{
                const custDetails = response.data;
                this.setState({custDetails:custDetails});
                console.log(custDetails)
                const CustomToast = ({closeToast})=>{
                    return(
                        <div style={{textAlign:"center"}}>
                            <h4>Logged in successfully</h4>
                        </div>
                    )

                }
                toast.success(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
                this.props.history.push('/adminpage')
            })
            .catch((err) =>{
                console.log(err)
                const CustomToast = ({closeToast})=>{
                    return(
                        <div style={{textAlign:"center"}}>
                            <h4>Email or password wrong!</h4>
                        </div>
                    )

                }
                toast.error(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
            })
        // }
    }

    render() {
        const {
            email,
            password,
            passwordError,
            emailError,
            emailError2,
            formSubmitted,
            authError,
        } = this.state;

        // if (this.state.redirect) {
        //   return <Redirect to={this.state.redirect} />
        // }

        return (
            <>
                <Particle />
                <AdminNav trigger={this.state.isLogin}/>
                <div className="card shadow-sm border-0 px-3 col-sm-4 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                    <div className="card-header bg-transparent border-0 text-center text-uppercase">
                        <h3>Admin Login</h3>
                    </div>
                    <div className="card-body">
                        <form
                            className={this.state.validation}
                            novalidate
                            onSubmit={this.handleSubmit}
                            // encType="multipart/form-data"
                            autoComplete="off"
                        >
                            <div className="form-group mb-3">
                                <label className="mb-0">
                                    Email ID<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email ID"
                                    id="validationCustom01"
                                    value={email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleEmailBlur}
                                    required
                                />
                                <div class="invalid-feedback">
                                    Please type your email.
                                </div>
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
                                    id="validationCustom02"
                                    value={password}
                                    onChange={this.handleChange}
                                    onBlur={this.handlePasswordBlur}
                                    required
                                />
                            </div>
                            <p className="mb-3">
                                <input
                                    type="submit"
                                    className="btn btn-primary w-30"
                                    value="Login"
                                    // onClick={this.handleSubmit}
                                />
                            </p>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

ReactDOM.render(
    <AdminLoginForm title="Contact Form" />,
    document.getElementById("root")
);

export default withRouter(AdminLoginForm);
