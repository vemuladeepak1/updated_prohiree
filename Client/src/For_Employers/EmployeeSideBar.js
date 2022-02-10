import React from 'react'
import { Link , NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
export const EmployeeSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        dispatch({type:"CLEAR"})
        navigate("/auth")
  };
    return (


        <div className="sticky-top">
        <p>
            <button className="sidebar_button" data-toggle="collapse" href="#collapseExample" role="button"
                aria-expanded="false" aria-controls="collapseExample" onclick="ezy()">
                <i className="fa fa-bars text-white"></i>
            </button>
        </p>
        <div className="collapse show" id="collapseExample">
            <div className="sidebar" id="sidebar">

                <div className="main_header text-center">
                    <div className="heading ">
                        <img src="images/girl_avtar.png" alt="" className="info_img" />
                        <h4 className="company">@COMPANY</h4>
                    </div>
                </div>
                <NavLink to="/company_profile"><i className="fa fa-user" aria-hidden="true"></i>
                    Company
                    Profile</NavLink>

                <NavLink to="/post_jobs"><i
                        className="far fa-file-alt"></i> Post a
                    Job</NavLink>
              
                <NavLink to="/Manage_jobs" ><i
                        className="fas fa-briefcase"></i> Manage
                    Jobs</NavLink>
              
                <NavLink  to="/password"><i
                        className="fas fa-key"></i> Change Password</NavLink>

                <a onClick={()=>handleClick()}><i className="fas fa-sign-out-alt"></i> Log Out</a>


            </div>
        </div>
    </div>

    )
}
export default EmployeeSideBar;