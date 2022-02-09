import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link,NavLink, useNavigate } from "react-router-dom";
import apiList from "../lib/apiList";
const Sidebar = ()=>{
    const [profile,setProfile] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        dispatch({type:"CLEAR"})
        navigate("/auth")
  };
console.log(profile)
  useEffect(() => {
    getData();
  },[]);


  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        
      });
  };
    return(
        
        <div className="sticky-top">
                    <p>
                        <button className="sidebar_button" data-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample" onclick="ezy()">Profile Menu
                            <i className="fas fa-arrow-right  text-white ml-2    sidebar_toggle-btn"></i>
                        </button>
                    </p>
                    <div className="collapse show" id="collapseExample">
                        <div className="sidebar" id="sidebar">
                            <div className="main_header text-center">
                                <div className="heading ">
                                    <img src="images/girl_avtar.png" alt="" className="info_img" />
                                    <h4 className="company">{profile.name}</h4>
                                    <p className="company_text">Web developer</p>
                                </div>
                            </div>
                            <NavLink to="/myprofile"><i className="fa fa-user"
                                    aria-hidden="true"></i> Profile</NavLink>
                            <NavLink to="/myresume"><i
                                    className="far fa-file-alt"></i> My Resume</NavLink>
                            <NavLink  to="/appliedjobs"><i
                                    className="fas fa-briefcase"></i> Applied Jobs</NavLink>
                            <NavLink to="/jobalerts"><i
                                    className="far fa-address-card"></i> Job Alert</NavLink>
                            <NavLink to="/savedjobs"><i
                                    className="fas fa-random"></i> Saved Jobs</NavLink>
                            {/* <a href="../../../Company/candidate_profile/cv manager/cv_manager.html"><i className="far fa-address-card"></i> CV Manager</a> */}
                            <NavLink to="/changepassword"><i
                                    className="fas fa-key"></i> Change Password</NavLink>
                            <a onClick={()=>handleClick()}><i className="fas fa-sign-out-alt"></i> Log Out</a>
                        </div>
                    </div>
                </div>
        )
}
export default Sidebar