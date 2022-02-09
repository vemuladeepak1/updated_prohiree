import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../lib/apiList';
import Modal from 'react-modal';
import './auth.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Auth = (props) => {

    const dispatch = useDispatch();

    const [mainTab, setMainTab] = useState('login')
    const [subTab, setSubTab] = useState(false)
    const [phone, setPhone] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [showVerifyBtn, setVerifyBtn] = useState(false);
    const [contactNumber, setContactNumber] = useState("");
    const [contactSessionId, setContactSessionId] = useState();
    const [isContactVerified, setContactVerified] = useState(false);

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
        
        if (!isContactVerified) {
            toast.error("Contact needs to be verified!")
        }
        let signupDetails = {
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
            type: e.target.type.value,
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

    const handleContactInput = (e) => {
        let value = e.target.value
        setContactNumber(value)
        setContactVerified(false)
        if (!value || value.trim() === "") {
            setVerifyBtn(false)
            return "contactNumber number is Required";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
            setVerifyBtn(false)
            return "Enter a valid contactNumber number.";
        } else {
            setVerifyBtn(true)
        }
    }

    const handleContactVerify = () => {
        let otpDetails = {
            phone: contactNumber,
        }
        axios
            .post(apiList.contactSendOTP, otpDetails)
            .then((response) => {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("type", response.data.type);
                // dispatch({ type: "USER", payload: response.data })
                setIsOpen(true)
                setContactSessionId(response.data.sessionId)
                console.log(response);
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err.response);
            });
    }

    const handleContactOTPVerify = (e) => {
        console.log('contactSessionId',contactSessionId);
        e.preventDefault()
        let otpDetails = {
            sessionId: contactSessionId,
            otp: e.target.otp.value
        }
        axios
            .post(apiList.contactVerifyOTP, otpDetails)
            .then((response) => {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("type", response.data.type);
                // dispatch({ type: "USER", payload: response.data })
                setIsOpen(false)
                toast.success("Contact Verified")
                setContactSessionId()
                setContactVerified(true)
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
                                                <select class="form-control" name="type">
                                                    <option value="applicant" selected>Applicant</option>
                                                    <option value="recruiter">Recruiter</option>
                                                </select>
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Name"
                                                    name="name"
                                                />
                                            </div>
                                            <div className="input_group" style={{ position: 'relative' }}>

                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Phone Number"
                                                    name="contactNumber"
                                                    onChange={handleContactInput}
                                                />
                                                <button type="button" className="verfy-special-btn btn" onClick={handleContactVerify} disabled={!showVerifyBtn || isContactVerified}>{isContactVerified ? 'Verified': 'Verify'}</button>


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
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div class="  text-center">
                <h6>Please enter the one time password <br /> to verify your account</h6>
                {/* <div> <span>A code has been sent to</span> <small>*******9897</small> </div> */}
                <form onSubmit={handleContactOTPVerify}>
                    <div id="otp" class="inputs d-flex flex-row justify-content-center mt-4">
                        <input type="text" className="form-control w-50" id="exampleInputName" placeholder="Enter OTP" maxLength="6" name="otp" required />
                    </div>
                    <div> <button type="submit" class="btn btn-verify px-4 validate mt-4" aria-label="Close" data-dismiss="modal" >Validate</button> </div>
                </form>
            </div>
            <div class="card-2 mt-3">
                <div class="content d-flex justify-content-center align-items-center"> <span>Didn't get the code</span> <a href="#" class="text-decoration-none ms-3"> Resend</a> </div>
            </div>
        </Modal>

    </>
}

export default Auth;