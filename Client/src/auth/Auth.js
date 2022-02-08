import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../lib/apiList';
import './auth.css'

const Auth = (props) => {

    const dispatch = useDispatch();

    const [mainTab, setMainTab] = useState('login')
    const [subTab, setSubTab] = useState(false)
    const [phone, setPhone] = useState()
    const navigate = useNavigate();

    const switchMainTab = (tab) => {
        setMainTab(tab)
        setSubTab(false)
    }

    console.log('mmmm', mainTab);

    const handleLogin = e => {
        e.preventDefault()
        let loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios
            .post(apiList.login, loginDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                dispatch({ type: "USER", payload: response.data })
                toast.success("Login Successful")
                console.log(response);

                navigate("/")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            })
    }

    const handleSignUp = e => {
        e.preventDefault()
        if (e.target.password.value !== e.target.confirmPassword.value) {
            toast.error("Password is not matching")
            e.target.rest()
            return
        }
        let signupDetails = {
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
            type: 'applicant',
            contactNumber: e.target.contactNumber.value,
        }
        axios
            .post(apiList.signup, signupDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                dispatch({ type: "USER", payload: response.data })
                toast.success("Registered Successful")
                console.log(response);

                navigate("/")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            });
    }

    const handleOTPSend = e => {
        e.preventDefault()
        let otpDetails = {
            phone: e.target.phone.value,
        }
        axios
            .post(apiList.sendOTP, otpDetails)
            .then((response) => {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("type", response.data.type);
                // dispatch({ type: "USER", payload: response.data })
                toast.success("OTP Sended")
                console.log(response);
                setSubTab('verifyOtp')
                setPhone(otpDetails.phone)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            });
    }

    const handleVerifyOTP = e => {
        e.preventDefault()
        if (!phone) {
            setSubTab(false)
            return
        }
        let otpDetails = {
            phone,
            otp: e.target.otp.value,
        }
        axios
            .post(apiList.verifyOTP, otpDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                dispatch({ type: "USER", payload: response.data })
                toast.success("Login Successfully")
                console.log(response);

                navigate("/")
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            });
    }

    const handleForgotPassword = e => {
        e.preventDefault()
        let otpDetails = {
            phone: e.target.phone.value,
        }
        axios
            .post(apiList.forgotPassword, otpDetails)
            .then((response) => {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("type", response.data.type);
                // dispatch({ type: "USER", payload: response.data })
                toast.success("New password send to your number")
                console.log(response);
                setSubTab(false)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            });
    }

    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8 modal_grid">
                    <section className="main">
                        <div className="form_wrapper">
                            <input
                                type="radio"
                                className="radio"
                                name="radio"
                                id="login"
                                defaultChecked=""
                            />
                            <input
                                type="radio"
                                className="radio"
                                name="radio"
                                id="signup"
                            />
                            <div className="tile py-2">
                                {mainTab === 'login' ? <h3 className="login">Login Form</h3> : <h3 className="signup">Signup Form</h3>}


                            </div>
                            <label
                                className={`tab login_tab ${mainTab === "login" && 'active-tab'}`}
                                // active-tab
                                htmlFor="login"
                                onClick={() => switchMainTab('login')}
                            >
                                {" "}
                                Login{" "}
                            </label>
                            <label className={`tab login_tab ${mainTab === "signup" && 'active-tab'}`} htmlFor="signup"
                                onClick={() => switchMainTab('signup')}>
                                {" "}
                                Signup{" "}
                            </label>
                            <div className="form_wrap">
                                {mainTab === 'login' && (
                                    <div className="form_fild login_form">
                                        {!subTab && (
                                            <div id="Menu1">
                                                <form onSubmit={handleLogin}>
                                                    <div className="input_group">
                                                        <input type="email" name="email" className="input" placeholder="Email Address" />
                                                    </div>
                                                    <div className="input_group">
                                                        <input type="password" name="password" className="input" placeholder="Password" />
                                                    </div>
                                                    <div className="forgot">
                                                        <a className="forgot_pass" onClick={() => setSubTab('forgotPassword')}>
                                                            {" "}
                                                            Forgot password ?{" "}
                                                        </a>
                                                    </div>
                                                    <input type="submit" className="btn" defaultValue="Login" />
                                                    <div className="forgot text-center">
                                                        <a href="#" className="login_otp my-3" onClick={() => setSubTab('otp')}>
                                                            Login With Otp{" "}
                                                        </a>
                                                    </div>
                                                    <div className="not_mem pt-3">
                                                        <label htmlFor="signup">
                                                            Not a member? <span className="font-weight-bold"> Signup now</span>
                                                        </label>
                                                    </div>
                                                </form>

                                            </div>
                                        )}

                                        {subTab === 'forgotPassword' && (
                                            <div id="Menu2">
                                                <form onSubmit={handleForgotPassword}>
                                                    <div className="input_group">
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            placeholder="Enter Registered Mobile Number..."
                                                            name="phone"
                                                        />
                                                    </div>
                                                    <input
                                                        type="submit"
                                                        className="btn"
                                                        defaultValue="Get password"
                                                    />
                                                    <div className="not_mem">
                                                        <a onClick={() => setSubTab(false)}>
                                                            {" "}
                                                            <label> Login With Email</label>
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        {subTab === 'otp' && (
                                            <div id="Menu3">
                                                <form onSubmit={handleOTPSend}>
                                                <div className="input_group">
                                                    <input
                                                        type="number"
                                                        className="input"
                                                        placeholder="Enter Mobile Number"
                                                        name="phone"
                                                    />
                                                </div>
                                                <a href="#" onclick="toggleVisibility('Menu4');">
                                                    {" "}
                                                    <input
                                                        type="submit"
                                                        className="btn"
                                                        defaultValue="Get OTP"
                                                    />
                                                </a>
                                                <div className="not_mem">
                                                    <a href="#" onClick={() => setSubTab(false)}>
                                                        {" "}
                                                        <label> Login With Email</label>
                                                    </a>
                                                </div>
                                                </form>
                                            </div>
                                        )}

                                        {subTab === 'verifyOtp' && (
                                            <div id="Menu4">
                                                <form onSubmit={handleVerifyOTP}>
                                                    <h6>Enter Your Received OTP</h6>
                                                    <div className="input_group">
                                                        <input
                                                            type="number"
                                                            className="input"
                                                            placeholder="Enter Your OTP"
                                                            name="otp"
                                                        />
                                                    </div>
                                                    <input
                                                        type="submit"
                                                        className="btn"
                                                        defaultValue="Submit OTP"
                                                    />
                                                    <div className="not_mem">
                                                        <a href="#" onClick={() => setSubTab(false)}>
                                                            {" "}
                                                            <label> Login With Email</label>
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                    </div>
                                )}
                                {mainTab === 'signup' && (
                                    <div className="form_fild signup_form">
                                        <form onSubmit={handleSignUp}>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Name"
                                                    name="name"
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Phone Number"
                                                    name="contactNumber"
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="email"
                                                    className="input"
                                                    placeholder="Email Address"
                                                    name="email"
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="password"
                                                    className="input"
                                                    placeholder="Password"
                                                    name="password"
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="password"
                                                    className="input"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                />
                                            </div>
                                            <input
                                                type="submit"
                                                className="btn"
                                                defaultValue="Signup"
                                            />
                                        </form>
                                    </div>
                                )}

                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-lg-4 d-none-sm">image</div>
            </div>
        </div>
    </>
}

export default Auth;