import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PostAction from "../../Reducer/PostAction";
import axios from 'axios'
import apiList from "../../lib/apiList";
import ChipInput from "material-ui-chip-input";
// import PersonalDetails from './personalDetails'
import { Link } from "react-router-dom";
import moment from "moment";
import FileUploadInput from "./FileUploadInput";


const MyResume = () => {
  const dispatch = useDispatch();
  const [project, setProject] = useState(false);
  // const [currentcompany, setCurrentcompany] = useState(false);

  // const NoHandling = (e) => {
  //   setReducer({ ...reducer, currentcompany: e.target.value });
  // };
 

  // const yesButton = () => {
  //   setCurrentcompany(true);
  //   reducer.currentcompany = {};
  // };



  // const NoButton = () => {
  //   setCurrentcompany(false);
  // };





const [profile,setProfile] = useState({
  name:"",
  email:"",
  contactNumber:"",
  experience:"",
  currentlocation:"",
  resumeHeadline:"",
  profileSummary:"",
  skills:[],
  employment:[],
  education:[],
  personaldetails:{
    dateofbirth: "",
    address: "",
    gender: "",
    pincode: "",
    maritalStatus: "",
    hometown: "",
    languages:[],
  },
  resume:{
    filename:"",
    url:""
  }
})

const [education, setEducation] = useState([
  {
    highestgraduation: "",
    course: "",
    specialization: "",
    institute: "",
    passedoutyear: "",
    courseType: "",
    marks: "",
  },
]);
const [employment, setEmployment] = useState([
  {
    years: "",
    months: "",
    designation: "",
    organization: "",
    startYear: "",
    endYear: "",
    profileDescription: "",
    noticePeriod: "",
  },
]);

console.log(profile.resume)
const formHandling = (e) => {
  setProfile({
    ...profile,
    [e.target.name]: e.target.value,
  });
};

const handleInput=(key,value)=>{
  console.log(key,value)
  setProfile({
    ...profile,
    [key]:value
  })
}

const onchangeDetails = (e)=>{
  setProfile({
    ...profile,
    personaldetails:{
      ...profile.personaldetails,
        [e.target.name]: e.target.value
    }
  })
}

const empHandling = (e)=>{
  setEmployment({
    ...employment,
    [e.target.name]: e.target.value,
  })
}

const eduHandling = (e)=>{
  setEducation({
    ...education,
    [e.target.name]: e.target.value,
  })
}

const handlePersonalDetails = (e) => {
  e.preventDefault()
  axios
    .put(apiList.user, profile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data)
      getData();
    })
    .catch((err) => {
     
      console.log(err.response);
    });
};

const handleEmployment = (e) => {
  e.preventDefault()
  let updatedDetails = {
    ...profile,
    employment:[...profile.employment,employment]
  }
  axios
    .put(apiList.user, updatedDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data)
      getData();
    })
    .catch((err) => {
     
      console.log(err.response);
    });
};

const handleEducation=(e)=>{
  e.preventDefault()
  let updatedDetails = {
    ...profile,
    education:[...profile.education,education]
  }
  axios
    .put(apiList.user, updatedDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data)
      getData();
    })
    .catch((err) => {
     
      console.log(err.response);
    });
}


const handleUpdate = (e) => {
  e.preventDefault()
  axios
    .put(apiList.user, profile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data)
      getData();
    })
    .catch((err) => {
     
      console.log(err.response);
    });
  
};



// getting profile data
useEffect(() => {
  getData();
}, []);

const getData = () => {
  axios
    .get(apiList.user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setProfile(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};


  return (
    <div>
      <div className="container-fluid my_profile"> 
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="container">
                <div className="row">
                  <div className="col-lg-2 ">
                    <div className="canditate-des">
                      <p href="#">
                        <img
                          className="resume_img img-responsive"
                          alt=""
                          src="images/girl_avtar.png"
                        />
                      </p>
                      <label for="file">
                  <i class="fas fa-camera img_pencil"></i>
                    </label>
                  <input type="file" id="file" style={{display: "none"}}/>
                    </div>
                  </div>
                  <div className="col-lg-10">
                        <h4 className="resume_title">
                      {profile.name}{" "}
                      <Link to="/myprofile">
                        <span class="correct_pencil">
                          <i class="fas fa-pencil-alt pencil_icon"></i>
                        </span>
                        </Link>    
                    </h4>
                    <p className="resume_text">
                      {profile.resumeHeadline}
                    </p>
                    <div className="row">
                      <div className="col-md-6">
                      <p className="location_resume_1 d-block">
                        <span>
                          <i className="fas fa-map-marker-alt marker_icon"></i>
                        </span>{" "}
                        <span className="location_resume">{profile.currentlocation}</span>
                      </p>

                      <p className="location_resume_2 d-block">
                        <span>
                          <i class="fas fa-shopping-bag marker_icon"></i>
                        </span>{" "}
                        {
                          profile?.experience.experience?
                          <span className="location_resume">{profile.experience.experience}</span>:
                          <span className="location_resume">{profile.experience}</span>
                        }
                      </p>
                      </div>
                      <div className="col-md-6">
                      <p>
                        <span>
                          <i className="fas fa-mobile-alt mobile_icon ml-1"></i>
                        </span>{" "}
                        <span className="mobile_resume">{profile.contactNumber}</span>
                      </p>

                      <p>
                        <span>
                          <i class="far fa-envelope mobile_icon"></i>
                        </span>{" "}
                        <span className="mobile_resume">
                        {profile.email}
                        </span>
                      </p>

                      </div>
                    </div>


                    {/* <div className="progress-box m-t10">
                      <div className="progress-info">
                        Profile Strength (Average)<span>70%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                        ></div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-3">
              <div className="pending_action_resume">
                <h5 className="pending_action_heading">Pending Action</h5>
                <p>
                  <span className="">
                    <i className="fas fa-check check_icon"></i>
                  </span>
                  <span className="pending_action_content">
                    Verify Mobile Number
                  </span>
                </p>
                <p>
                  <span className="">
                    <i className="fas fa-check check_icon"></i>
                  </span>
                  <span className="pending_action_content">Verify Email</span>
                </p>
              </div>
            </div> */}

            <div id="Resume_Headline"></div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="sticky-top">
              <p>
                <button
                  className="sidebar_button"
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onclick="ezy()"
                >
                  <i className="fa fa-bars text-white"></i>
                </button>
              </p>
              <div id="collapseExample">
                <div className="sidebar" id="sidebar">
                  <a href="#Resume_Headline"> Resume Headline</a>
                  <a href="#ProfileSummary"> Profile Summary</a>
                  <a href="#KeySkills"> Keyskills</a>
                  <a href="#Employment"> Employement</a>
                  <a href="#Education"> Eductaion</a>
                  <a href="#ITskills"> IT Skills</a>
                  <a href="#Project"> Project</a>
                  <a href="#Accomplishment"> Accomplishments</a>
                  <a href="#DesiredCareer"> Desired Career Profile</a>
                  <a href="#PersonalDetails"> Personal Details</a>
                  <a href="#AttachResume"> Attach Resume</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="wrapper">
              <div className="right_content">
                <div className="content">
                  <div className="job-bx-title clearfix">
                    <h5 className=" pull-left text-capitalize cp">
                      Resume Headline
                    </h5>
                    <a
                      href="#resume_headline"
                      className="site_button_resume  float-right"
                      id="ProfileSummary"
                      data-toggle="modal"
                      data-target="#resume_headline"
                    >
                      {" "}
                      <span>
                        <i className="fas fa-pencil-alt pencil_clearfix"></i>
                      </span>{" "}
                    </a>
                  </div>

                  <p className="job_usa">{profile.resumeHeadline}</p>

                  <div
                    className="modal fade"
                    id="resume_headline"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered modal-lg "
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Resume Headline
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body ">
                          <div className="modal_content">
                            <p className="resume_modal_text">
                              It is the first thing recruiters notice in your
                              profile. Write concisely what makes you unique and
                              right person for the job you are looking for.
                            </p>
                            <div className="form-group my-4">
                              <label> Description </label>
                              <textarea
                                name="resumeHeadline"
                                className="form_control"
                                cols="30"
                                rows="5"
                                placeholder="Describe about yourself here"
                                onChange={(e)=>formHandling(e)}
                                value={profile.resumeHeadline}
                                maxlength = "50"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" data-dismiss="modal" className="update" onClick={(e) => handleUpdate(e)}>
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">
                    Profile Summary
                  </h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#profileSummary"
                  >
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>{" "}
                  </a>
                </div>
                <p className="job_usa" id="KeySkills">
                 {profile.profileSummary}
                </p>

                <div
                  className="modal fade"
                  id="profileSummary"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-lg "
                    role="document"
                  >
                    <div className="modal-content" >
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Profile Summary
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="modal_content">
                          <p className="resume_modal_text" >
                            Your Profile Summary should mention the highlights
                            of your career and education, what your professional
                            interests are, and what kind of a career you are
                            looking for. Write a meaningful summary of more than
                            50 characters.
                          </p>
                          <form action="#">
                            <div className="row my-3">
                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label> Details of Project </label>
                                  <textarea
                                   onChange={(e)=>formHandling(e)}
                                   value={profile.profileSummary}
                                    name="profileSummary"
                                    className="form_control"
                                    cols="30"
                                    rows="5"
                                    placeholder="Describe here.."
                                    maxlength = "250"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="update" data-dismiss="modal"  onClick={(e) => handleUpdate(e)}>
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">Key Skills</h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#key_skills"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>{" "}
                  </a>
                </div>

                <div
                  className="modal fade"
                  id="key_skills"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered  modal-lg"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {" "}
                          Key Skills
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body ">
                        <div className="modal_content">
                          <p className="resume_modal_text">
                            Tell recruiters what you know or what you are known
                            for e.g. Artificial Intelligence, Oracle, Java etc.
                           
                          </p>
                          <form>
                            <div className="autocomplete">
                            <label>Skills</label>
                            <ChipInput
                                label="Skills"
                                variant="outlined"
                                helperText="Press enter to add skills"
                                value={profile.skills}
                                onAdd={(chip) =>
                                  
                                  setProfile({
                                    ...profile,
                                    skills: [...profile.skills, chip],
                                  })
                                }
                                onDelete={(chip, index) => {
                                  let skills = profile.skills;
                                  skills.splice(index, 1);
                                  setProfile({
                                    ...profile,
                                    skills: skills,
                                  });
                                }}
                                fullWidth
                              />
                           
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button"  className="update" data-dismiss="modal" onClick={(e)=>handleUpdate(e)}>
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

               
                  <div className="form-group mt-3">
                    {
                      profile.skills.map((skill)=>{
                        return(
                          <button className="js" id="Employment">
                          {skill}
                        </button>
                        )
                    
                      })
                    }
                    
                    
                  </div>
               
              </div>

              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">Employment</h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#employ"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>
                  </a>
                </div>
                {
                profile.employment.map((employment)=>{
                  return(<>
                  <h5 className="junior_edit">
                  {employment.designation}{" "}
                  <a href="#" data-toggle="modal" data-target="#employ">
                    {" "}
                    <i className="fas fa-pencil-alt pencil_clearfix pencil"></i>
                  </a>
                  <i class="far fa-trash-alt remove"></i>
                </h5>
                <p className="job_usa">{employment.organization}</p>
                <p className="job_usa">
                  Oct 2015 to Present (3 years 4 months)
                </p>
                <p className="job_usa" >
                  Available to join in {employment.months}
                </p>
                <p className="job_usa">{employment.designation}</p>
              </>) 
                })
              }
              <div id="Education">

              </div>
                <div
                  className="modal fade"
                  id="employ"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Employement
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body ">
                        <div className="modal_content">
                          <form action="#">
                            <div className="row m-b30">
                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Total Experience</label>
                                  <input
                                    type="text"
                                    className="form_control"
                                    placeholder="Years"
                                    name="years"
                                    onChange={(e)=>empHandling(e)}
                                    
                                  />
                                </div>
                              </div>
                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>Months</label>
                                  <select className="form_control" name="months" onChange={(e)=>empHandling(e)}>
                                    <option hidden>Months</option>
                                    <option value="01 Months">01 Month</option>
                                    <option value="02 Months">02 Months</option>
                                    <option value="03 Months">03 Months</option>
                                    <option value="04 Months">04 Months</option>
                                    <option value="05 Months">05 Months</option>
                                    <option value="06 Months">06 Months</option>
                                    <option value="07 Months">07 Months</option>
                                    <option value="08 Months">08 Months</option>
                                    <option value="09 Months">09 Months</option>
                                    <option value="10 Months">10 Months</option>
                                    <option value="11 Months">11 Months</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label> Your Designation</label>
                                  <input
                                    type="text"
                                    name="designation"
                                    className="form_control"
                                    placeholder="Your Designation"
                                    onChange={(e)=>empHandling(e)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label> Your Organization</label>
                                  <input
                                  name="organization"
                                  onChange={(e)=>empHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Your Organization"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <label> Is This Your Current Company ?</label>
                                <div className="form-group">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                
                                      name="This_Is_Your_Current_Company"
                                      id="inlineRadio1"
                                    
                                      value="No"
                                      // onChange={(e)=>NoHandling(e)}
                                      //  onClick={() => NoButton()}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio1"
                                    >
                                  NO
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="This_Is_Your_Current_Company"
                                      id="inlineRadio2"
                                      //onChange={(e)=>NoHandling(e)}
                                      // onClick={() => yesButton()}
                                      value="Yes"
                                      // onChange={(e) => NoHandling(e)}
                                      
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio2"
                                    >
                                    YES
                                    </label>
                                  </div>
                                </div>
                              </div>
                          <div>
                          {/* {currentcompany ? (

                                <div className="row container">
                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label> Started Working From</label>
                                    <input
                                      type="date"
                                      className="form_control"
                                      placeholder="Years"
                                      name="Started_Working_From"
                                      onChange={(e)=>formHandling(e)}
                                    
                                    />
                                  </div>
                                </div>
                                </div>
                          ):( */}
                            <div className="row container">
                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Started Working From</label>
                                  <input
                                    type="date"
                                    className="form_control"
                                    placeholder="Years"
                                    name=" Started_Working_From"
                                     onChange={(e)=>formHandling(e)}
                                 
                                  />
                                </div>
                              </div>
                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Worked Till</label>
                                  <input
                                  name="Worked_Till"
                                    type="date"
                                    className="form_control"
                                    placeholder="Years"
                                     onChange={(e)=>formHandling(e)}
                                    
                                  />
                                </div>
                              </div>
                            </div>
                            {/* )} */}
                          </div>

                              <div className="col-lg-12">
                                <div className="form-group my-2">
                                  <label> Describe Your Job Profile </label>
                                  <textarea
                                  name="profileDescription"
                                  onChange={(e)=>empHandling(e)}
                                    className="form_control"
                                    cols="30"
                                    rows="5"
                                    placeholder="Describe here..."
                                    maxlength = "250"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label> Notice Period</label>
                                  <input
                                    name="noticePeriod"
                                    onChange={(e)=>empHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Enter Notice Period"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="update" onClick={(e)=>handleEmployment(e)}>
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">Education</h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#study"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>
                  </a>
                </div>
                <p className="job_usa">
                  Mention your employment details including your current and
                  previous company work experience
                </p>
                <div className="education_content_1" id="ITskills">
                  {
                    profile.education.map((edu)=>{
                      console.log(edu)
                      return(<><h5 className="education_heading">
                      {edu.highestgraduation} - {edu.course}{" "}
                      <a href="#" data-toggle="modal" data-target="#study">
                        {" "}
                        <i className="fas fa-pencil-alt pencil_clearfix pencil"></i>
                      </a>
                    </h5>
                    <p className="eductaion_year">{edu.institute}</p>
                    <p className="eductaion_year">{edu.passedoutyear}({edu.courseType})</p></>)
                     
                      
                    })
                  }
                </div>
     
              

                <div
                  className="modal fade"
                  id="study"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {" "}
                          Education{" "}
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body ">
                        <div className="modal_content">
                          <form action="#">
                            <div className="row">
                              <div className=" col-lg-12 col-md-12">
                                <form>
                                  <div className="form-group">
                                    <label> Highest Postgraduation</label>
                                    <select
                                      id="highGrad"
                                      className="form_control"
                                      name="highestgraduation"
                                      onChange={(e)=>eduHandling(e)}
                                    >
                                      <option hidden>
                                        {" "}
                                        Highest Postgraduation
                                      </option>
                                      <option value="phd" name="Highest_Graduation"  >PHD</option>
                                      <option value="Masters / Postgraduation" name="Highest_Graduation" >
                                        Masters / Postgraduation
                                      </option>
                                      <option value="Undergraduation / Diploma" name="Highest_Graduation"  >
                                        Undergraduation / Diploma
                                      </option>
                                      <option value="Intermediate" name="Highest_Graduation" >
                                        Intermediate
                                      </option>
                                    </select>
                                  </div>
                                </form>

                                <div className="sets mt-2">
                                  <div className="phd_set" id="phdSet">
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label> Course</label>

                                        <input
                                        name="course"
                                        onChange={(e)=>eduHandling(e)}
                                          type="text"
                                          placeholder="Enter Your postgraduation Course"
                                          id="phdcourse"
                                          className="form_control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label> Specialization</label>
                                        <input
                                        name="specialization"
                                        onChange={(e)=>eduHandling(e)}
                                          type="text"
                                          className="form_control "
                                          id="university"
                                          aria-Describedby="emailHelp"
                                          placeholder="Enter Your Specialization"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label> University/Institute</label>
                                        <input
                                        name="institute"
                                        onChange={(e)=>eduHandling(e)}
                                          type="text"
                                          className="form_control "
                                          id="university"
                                          aria-Describedby="emailHelp"
                                          placeholder="Select University Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <label> Course Type </label>
                                      <div className="form-group">
                                        <div className="form-check form-check-inline">
                                          <input
                                          name="courseType"
                                          onChange={(e)=>eduHandling(e)}
                                            className="form-check-input"
                                            type="radio"
                                            id="inlineRadio1"
                                            value="Full time"
                                          />
                                          <label
                                            className="form-check-label"
                                            for="inlineRadio1"
                                          >
                                            Full Time
                                          </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                          <input
                                          name="courseType"
                                          onChange={(e)=>eduHandling(e)}
                                            className="form-check-input"
                                            type="radio"
                                            id="inlineRadio2"
                                            value="Part Time"
                                          />
                                          <label
                                            className="form-check-label"
                                            for="inlineRadio2"
                                          >
                                            Part Time
                                          </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                          <input
                                           name="courseType"
                                            onChange={(e)=>eduHandling(e)}
                                            className="form-check-input"
                                            type="radio"
                                            id="inlineRadio3"
                                            value=" Correspondence/Distance Learning"
                                          />
                                          <label
                                            className="form-check-label"
                                            for="inlineRadio3"
                                          >
                                            Correspondence/Distance Learning
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label> Passed Out Year</label>
                                        <input
                                        name="passedoutyear"
                                        onChange={(e)=>eduHandling(e)}
                                          type="text"
                                          className="form_control "
                                          id="university"
                                          aria-Describedby="emailHelp"
                                          placeholder="Enter Passed Out Year"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="form-group">
                                        <label>
                                          Marks in Percentage or CGPA{" "}
                                        </label>

                                        <input
                                        name="marks"
                                        onChange={(e)=>eduHandling(e)}
                                          type="text"
                                          placeholder="Enter your Marks in Percentage or CGPA"
                                          id="grading"
                                          className="form_control"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="update" onClick={(e)=>handleEducation(e)}>
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

    <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">IT Skills</h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#itSkills"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>
                  </a>
                </div>

                <p className="job_usa">
                  Mention your employment details including your current and
                  previous company work experience
                </p>
                <div className="table_content">
                  <div className="table-responsive">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th scope="col">Skills</th>
                          <th scope="col">Version</th>
                          <th scope="col">Rating</th>
                          <th scope="col">Experience</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table_row_content">
                          <td scope="row" className="table_content_1">
                            Bootstrap
                          </td>
                          <td className="table_content_1">4</td>
                          <td className="table_content_1 ml-3">
                         
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                          </td>
                          <td className="table_content_1">3 Year 5 Months</td>
                          <td>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#itSkills"
                            >
                              <i className="fas fa-pencil-alt pencil"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row" className="table_content_1">
                            Bootstrap
                          </td>
                          <td className="table_content_1">5</td>
                          <td className="table_content_1 ml-3">
                          <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                          </td>
                          <td className="table_content_1">2 Year 5 Months</td>
                          <td>
                            <a href="#">
                              <i className="fas fa-pencil-alt pencil"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="table_row_content">
                          <td scope="row" className="table_content_1">
                            HTML
                          </td>
                          <td className="table_content_1">5</td>
                          <td className="table_content_1 ml-3">
                          <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                          </td>
                          <td className="table_content_1">4 Year 5 Months</td>
                          <td>
                            <a href="#">
                              <i className="fas fa-pencil-alt pencil"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td
                            scope="row"
                            className="table_content_1"
                            id="Project"
                          >
                            CSS
                          </td>
                          <td className="table_content_1">3</td>
                          <td className="table_content_1 ml-3">
                          <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                            <i class="fas fa-star star_rating star_rating_1"></i>
                           
                          </td>
                          <td className="table_content_1">0 Year 5 Months</td>
                          <td>
                            <a href="#">
                              <i className="fas fa-pencil-alt pencil"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="itSkills"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-lg "
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          IT Skills
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body ">
                        <div className="modal_content">
                          <form action="#">
                            <div className="row m-b30">
                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>IT Skills</label>
                                  <input type="text" className="form_control" name="IT_Skills" onChange={(e)=>formHandling(e)}/>
                                </div>
                              </div>

                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Version</label>
                                  <input type="text" className="form_control" name="Version" onChange={(e)=>formHandling(e)}/>
                                </div>
                              </div>
                              <div className=" col-lg-6 col-md-6">
                                <label>Rating</label>
                                <div className="form-group">
                                <div
                                // onMouseOver={hoverOver}
                                // onMouseOut={() => hoverOver(null)}
                                // onClick={event => setRating(event.target.getAttribute("star-id"))} 
                          
                              >
                                {/* {Array.from({ length: 5 }, (v, i) => (
                                  <Star starId={i + 1} marked={selection ? selection > i : rating > i} />
                                ))} */}
                                {/* <td className="table_content_1 ml-3"> */}
                         
                         <i class="fas fa-star star_rating star_rating_1"></i>
                         <i class="fas fa-star star_rating star_rating_1"></i>
                         <i class="fas fa-star star_rating star_rating_1"></i>
                         <i class="fas fa-star star_rating star_rating_1"></i>
                         <i class="fas fa-star star_rating star_rating_1"></i>
                       {/* </td> */}
                              </div>
                                  
                                </div>
                              </div>

                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Experience</label>
                                  <input
                                  name="IT_Experience_inYears"
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Years"
                                  />
                                </div>
                              </div>
                              <div className=" col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label> Months </label>
                                  <input
                                    onChange={(e)=>formHandling(e)}
                                    name="IT_Experience_inMonths"
                                    type="text"
                                    className="form_control"
                                    placeholder="Months"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="update" >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
                      {/* project        */}
              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">Projects</h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#projectsResume"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>{" "}
                  </a>
                </div>
                <h5 className="junior_edit">
                  Job Board{" "}
                  <a href="#" data-toggle="modal" data-target="#projectsResume">
                    {" "}
                    <i className="fas fa-pencil-alt pencil_clearfix pencil"></i>
                  </a>
                  <i class="far fa-trash-alt remove"></i>
                </h5>
                <p className="job_usa">w3itexpert (Offsite)</p>
                <p className="job_usa" id="ProfileSummary">
                  Dec 2018 to Present (Full Time)
                </p>
                <p className="job_usa" id="Accomplishment">Job Board Template</p>

                <div
                  className="modal fade"
                  id="projectsResume"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Projects
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="modal_content">
                          <form action="#">
                            <div className="row m-b30">
                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>Project Title</label>
                                  <input type="text" className="form_control" name="Project_Title" onChange={(e)=>formHandling(e)}/>
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>Client</label>
                                  <input type="text" className="form_control" name="Project_Client" onChange={(e)=>formHandling(e)}/>
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <label> Project Type ? </label>
                                <div className="form-group">
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                     
                                      name="Project_Type"
                                      id="inlineRadio1"
                                      value="In Progress"
                                      // onClick={() => InprogressButton()}
                                      // onChange={(e) => radiohandling(e)}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio1"
                                    >
                                      In Progress
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      // onChange={(e) => radiohandling(e)}
                                       name="inlineRadioOptions"
                                      name='Project_Type'
                                      id="inlineRadio2"
                                      value="Finished"
                                      // onClick={() => PendingButton()}
                                      // onChange={(e) => PendingHandling(e)}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio2"
                                    >
                                      Finished
                                    </label>
                                  </div>
                                </div>
                              </div>
                        <div>
                          <div className="row container">
                          <div className=" col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Started Working From</label>
                              <input
                              name="Project_Started_Working_From"
                              // onChange={(e)=>formHandling(e)}
                              // onChange={(e) =>radiohandling(e)}
                                type="date"
                                className="form_control"
                                placeholder="Years"
                              />
                            </div>
                          </div>
                          <div className=" col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Worked Till</label>
                              <input
                              name="Project_Worked_Till"
                              // onChange={(e)=>formHandling(e)}
                              // onChange={(e) => radiohandling(e)}
                                type="date"
                                className="form_control"
                                placeholder="Years"
                              />
                            </div>
                          </div>
                          </div>
                </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label> Details of Project </label>
                                  <textarea
                                  name="Details_Of_Project"
                                  onChange={(e)=>formHandling(e)}
                                    className="form_control"
                                    cols="30"
                                    rows="5"
                                    placeholder="Describe here.."
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="update" >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">
                    Accomplishment
                  </h5>
                </div>

                <div className="content_sub">
             

                  <div className="content_sub_1">
                    <div className="job-bx-title clearfix">
                      <h5 className=" pull-left  cp_1">Work Sample</h5>
                      <a
                        href="#"
                        className="site_button_resume  float-right"
                        data-toggle="modal"
                        data-target="#workSample"
                      >
                        {" "}
                        <span>
                          <i className="fas fa-pencil-alt pencil_clearfix"></i>
                        </span>{" "}
                      </a>
                    </div>
                    <p className="job_usa">
                      Add link to your Projects (e.g. Github links etc.).
                    </p>

                    <div
                      className="modal fade"
                      id="workSample"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Work Sample
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p className="resume_modal_text">
                              Add link to your Projects (e.g. Github links
                              etc.).
                            </p>
                            <form action="#">
                              <div className="row my-3">
                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Work Title</label>
                                    <input
                                    name="Work_Title"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>URL</label>
                                    <input
                                    name="Work_URL"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Duration From</label>
                                    <input
                                    name="Work_Duration_From"
                                    onChange={(e)=>formHandling(e)}
                                      type="date"
                                      className="form_control"
                                      placeholder="Year"
                                    />
                                  </div>
                                </div>
                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Duration To</label>
                                    <input
                                    name="Work_Duration_To"
                                    onChange={(e)=>formHandling(e)}
                                      type="date"
                                      className="form_control"
                                      placeholder="Year"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label> Description </label>
                                    <textarea
                                    name="Work_Description"
                                    onChange={(e)=>formHandling(e)}
                                      className="form_control"
                                      cols="30"
                                      rows="5"
                                      placeholder="Describe here.."
                                      maxlength = "250"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="update">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content_sub">
                  <div className="job-bx-title clearfix">
                    <h5 className=" pull-left  cp_1">
                      White Paper / Research Publication
                    </h5>
                    <a
                      href="#"
                      className="site_button_resume  float-right"
                      data-toggle="modal"
                      data-target="#whitePaper"
                    >
                      {" "}
                      <span>
                        <i className="fas fa-pencil-alt pencil_clearfix"></i>
                      </span>{" "}
                    </a>

                    <div
                      className="modal fade"
                      id="whitePaper"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              White Paper / Research Publication
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form action="#">
                              <div className="row my-3">
                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Title</label>
                                    <input
                                    name="Publication_Title"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                      placeholder="Enter Title"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>URL</label>
                                    <input
                                    name="Publication_URL"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                      placeholder="wwww.google.com"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Published On</label>
                                    <input
                                    name="Publication_Year"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                      placeholder="Year"
                                    />
                                  </div>
                                </div>
                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label> Month</label>
                                    <select className="form_control" name="Publication_Months" onChange={(e)=>formHandling(e)}>
                                    <option hidden>Months</option>
                                    <option>01 Month</option>
                                    <option>02 Months</option>
                                    <option>03 Months</option>
                                    <option>04 Months</option>
                                    <option>05 Months</option>
                                    <option>06 Months</option>
                                    <option>07 Months</option>
                                    <option>08 Months</option>
                                    <option>09 Months</option>
                                    <option>10 Months</option>
                                    <option>11 Months</option>
                                  </select>
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label> Description </label>
                                    <textarea
                                    name="Publication_Description"
                                    onChange={(e)=>formHandling(e)}
                                      className="form_control"
                                      cols="30"
                                      rows="5"
                                      placeholder="Describe here.."
                                      maxlength = "250"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="update" >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="job_usa">
                    Add links to your Online publications.
                  </p>
                </div>

                <div className="content_sub">
                  <div className="job-bx-title clearfix">
                    <h5 className=" pull-left  cp_1">Presentation</h5>
                    <a
                      href="#"
                      className="site_button_resume  float-right"
                      data-toggle="modal"
                      data-target="#presentation"
                    >
                      {" "}
                      <span>
                        <i className="fas fa-pencil-alt pencil_clearfix"></i>
                      </span>{" "}
                    </a>
                  </div>
                  <p className="job_usa">
                    Add links to your Online presentations (e.g. Slideshare
                    presentation links etc.).
                  </p>

                  <div
                    className="modal fade"
                    id="presentation"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Presentation
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form action="#">
                            <div className="row my-3">
                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>Title</label>
                                  <input 
                                  name="Presentation_Title"
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Enter Title"
                                  />
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>URL</label>
                                  <input
                                  name='Presentation_URL'
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="wwww.google.com"
                                  />
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label> Description </label>
                                  <textarea
                                  name="Presentation_Description"
                                  onChange={(e)=>formHandling(e)}
                                    className="form_control"
                                    cols="30"
                                    rows="5"
                                    placeholder="Describe here.."
                                    maxlength = "250"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="update" >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content_sub">
                  <div className="job-bx-title clearfix">
                    <h5 className=" pull-left  cp_1">Patent</h5>
                    <a
                      href="#"
                      className="site_button_resume  float-right"
                      data-toggle="modal"
                      data-target="#Patent"
                    >
                      {" "}
                      <span>
                        <i className="fas fa-pencil-alt pencil_clearfix"></i>
                      </span>{" "}
                    </a>
                  </div>
                  <p className="job_usa">
                    Add details of Patents you have filed.
                  </p>

                  <div
                    className="modal fade"
                    id="Patent"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Patent
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form action="#">
                            <div className="row my-3">
                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>Patent Title</label>
                                  <input
                                  name="Patent_Title"
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Enter Title"
                                  />
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>URL</label>
                                  <input
                                  name="Patent_URL"
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="wwww.google.com"
                                  />
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label>Patent Office</label>
                                  <input
                                  name="Patent_Office"
                                  onChange={(e)=>formHandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Enter Patent Office"
                                  />
                                </div>
                              </div>

                              <div className=" col-lg-12 col-md-12 ">
                                <label> Status ? </label>
                                <div className="form-group">
                                  <div className="form-check form-check-inline">
                                    <input
                                    name='Patent_Status'
                                    //  onChange={(e)=>patentpendingHandling(e)}
                                      className="form-check-input"
                                      type="radio"
                                      // name="inlineRadioOptions"
                                      id="inlineRadio1"
                                      value="Patent Issued"
                                      //  onClick={() => patentissueButton()}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio1"
                                    >
                                      Patent Issued
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name='Patent_Status'
                                       onChange={(e)=>formHandling(e)}
                                      // name="inlineRadioOptions"
                                      id="inlineRadio2"
                                      value="Patent Pending"
                                     // onClick={() => patentpendingButton()}
                                      // onChange={(e) => patentpendingHandling(e)}
                                    />
                                    <label
                                      className="form-check-label"
                                      for="inlineRadio2"
                                    >
                                      Patent Pending
                                    </label>
                                  </div>
                                </div>
                              </div>
                  <div>
                    {/* {patent ? ( */}
                              <div className="row container ">
                              <div className=" col-lg-12 col-md-">
                                <div className="form-group">
                                  <label>Application Number</label>
                                  <input
                                  name="Patent_Application_Number"
                                  //  onChange={(e) => radiohandling(e)}
                                    type="text"
                                    className="form_control"
                                    placeholder="Enter Application Number"
                                  />
                                </div>
                              </div>

                       
                              </div>
                              {/* ):null}  */}
                              </div>

                              <div className=" col-lg-12 col-md-12">
                                <div className="form-group">
                                  <label> Description </label>
                                  <textarea
                                  name="Patent_Description"
                                  onChange={(e)=>formHandling(e)}
                                    className="form_control"
                                    cols="30"
                                    rows="5"
                                    placeholder="Describe here.."
                                    maxlength = "250"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="update" >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content_sub">
                  <div className="job-bx-title clearfix">
                    <h5 className=" pull-left  cp_1">Certification</h5>
                    <a
                      href="#"
                      className="site_button_resume  float-right"
                      data-toggle="modal"
                      data-target="#Certification"
                    >
                      {" "}
                      <span>
                        <i className="fas fa-pencil-alt pencil_clearfix"></i>
                      </span>{" "}
                    </a>

                    <div
                      className="modal fade"
                      id="Certification"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Certification
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p className="resume_modal_text">
                              Add details of Certifications you have
                              achieved/completed
                            </p>
                            <form action="#">
                              <div className="row my-3">
                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Certification Name</label>
                                    <input
                                      name="Certification_Name"
                                     onChange={(e)=>formHandling(e)}                                    
                                      type="text"
                                      className="form_control"
                                      placeholder="Please Enter Certification Name"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Certification Completion ID</label>
                                    <input
                                    name="Certification_ID"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                      placeholder="Please Enter Your Course Completion ID"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Certification URL</label>
                                    <input
                                    name="Certification_URL"
                                    onChange={(e)=>formHandling(e)}
                                      type="text"
                                      className="form_control"
                                      placeholder="Please Mention Completion URl"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label> Certificate Validity From</label>
                                    <input
                                    name="Certification_Validity_From"
                                    onChange={(e)=>formHandling(e)}
                                      type="date"
                                      className="form_control"
                                      placeholder="Year"
                                    />
                                  </div>
                                </div>
                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label> Certificate Validity To</label>
                                    <input
                                
                                      name="Certification_Validity_To"
                                      onChange={(e)=>formHandling(e)}

                                      type="date"
                                      className="form_control"
                                      placeholder="Year"
                                    />
                                  </div>
                                </div>

                                <div className=" col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="defaultCheck1"
                                      />
                                      <label
                                        className="form-check-label"
                                        for="defaultCheck1"
                                      >
                                        This Certificate Does Not Expire
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="update" >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="job_usa" id="DesiredCareer">
                    Add details of Certification you have filed.
                  </p>
                </div>
              </div>

              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">
                    Desired Career Profile
                  </h5>
                  <a
                    href="#"
                    className="site_button_resume  float-right"
                    data-toggle="modal"
                    data-target="#careerProfile"
                  >
                    {" "}
                    <span>
                      <i className="fas fa-pencil-alt pencil_clearfix"></i>
                    </span>{" "}
                  </a>
                </div>
                <div className="container-fluid career_profile">
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#careerProfile"
                    className="edit_resume"
                  >
                    {" "}
                    Edit{" "}
                    <i className="fas fa-pencil-alt pencil_clearfix pencil text-white"></i>
                  </a>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 career_profile_column">
                      <div className="career_profile_content">
                        <h5 className="industry">Industry</h5>
                        <p className="it_employees">
                          IT-Software/Software Services{" "}
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Role</h5>
                        <p className="it_employees">
                          Web Developer{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Employement Type</h5>
                        <p className="it_employees">
                          Full Time{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Available to Join </h5>
                        <p className="it_employees">
                          12th october{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Desired Location</h5>
                        <p className="it_employees">
                          Hyderabad{" "}
                          
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 career_profile_column">
                      <div className="career_profile_content">
                        <h5 className="industry">Functional Area</h5>
                        <p className="it_employees">
                          Design / Creative / User Experience{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Job Type</h5>
                        <p className="it_employees">
                          Permanent{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Desired Shift</h5>
                        <p className="it_employees">
                          Day{" "}
                          
                        </p>
                      </div>
                      <div className="career_profile_content">
                        <h5 className="industry">Expected Salary</h5>
                        <p className="it_employees">
                         ₹2 lakhs{" "}
                          
                        </p>
                      </div>
                      <div
                        className="career_profile_content"
                        id="PersonalDetails"
                      >
                        <h5 className="industry">Desired Industry</h5>
                        <p className="it_employees">
                          TCS{" "}
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="careerProfile"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                         Desired Career
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form action="#">
                          <div className="row my-3">
                            <div className=" col-lg-12 col-md-12">
                              <div className="form-group">
                                <label>Industry</label>
                                <input
                                name="Desired_Industry"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Please Enter Industry"
                                />
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <div className="form-group">
                                <label>Functional Area Department</label>
                                <input
                                name="Desired_Functional_Area_Department"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Please Enter Your Course Completion ID"
                                />
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <div className="form-group">
                                <label>Role</label>
                                <input
                                name="Desired_Role_URL"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Please Mention Completion URl"
                                />
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <label className="my-2">Job Type</label>
                              <div className="form-group">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    name="Desired_Job_Type"
                                    id="inlineRadio1"
                                    value="Permanent"
                                    onChange={(e)=>formHandling(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio1"
                                  >
                                   Permanent
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="Desired_Job_Type"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Contractual"
                                    onChange={(e)=>formHandling(e)}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Contractual
                                  </label>
                                </div>
                               
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <label className="my-2">Employement Type</label>
                              <div className="form-group">
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_Employement_Type"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="Full Time"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio1"
                                  >
                                    Full Time
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_Employement_Type"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Part Time"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Part Time
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_Employement_Type"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Freelancer"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Freelancer
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <label className="my-2">Preffered Shift</label>
                              <div className="form-group">
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_PrefferedShift"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="Day"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio1"
                                  >
                                    Day
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_PrefferedShift"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Night"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Night
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                  name="Desired_PrefferedShift"
                                  onChange={(e)=>formHandling(e)}
                                    className="form-check-input"
                                    type="radio"
                                    // name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Part Time"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inlineRadio2"
                                  >
                                    Part Time
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className=" col-lg-6 col-md-6">
                              <div className="form-group">
                                <label> Available To Join</label>
                                <input
                                name="Desired_AvailableJoinYears"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Year"
                                />
                              </div>
                            </div>
                            <div className=" col-lg-6 col-md-6">
                              <div className="form-group">
                                <label> Month</label>
                                <select className="form_control" name="Desired_AvailableJoinMonths"
                                onChange={(e)=>formHandling(e)}>
                                  <option hidden>Months</option>
                                  <option>Jan</option>
                                  <option>Feb</option>
                                  <option>March</option>
                                  <option>April</option>
                                  <option>May</option>
                                  <option>June</option>
                                  <option>July</option>
                                  <option>August</option>
                                  <option>September</option>
                                  <option>October</option>
                                  <option>November</option>
                                  <option>December</option>
                                </select>
                              </div>
                            </div>

                            <div className=" col-lg-6 col-md-6">
                           
                              <div className="form-group">
                              <label className="my-2">Expected Salary</label>
                                <input
                                name="Desired_Expected_SalaryinLakhs"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="₹0 Lakh"
                                />
                              </div>
                            </div>
                            <div className=" col-lg-6 col-md-6">
                            <label className="my-2">Thousands</label>
                              <div className="form-group">
                                <input
                                name="Desired_Expected_SalaryinThousands"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="₹5 Thousand"
                                />
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <div className="form-group">
                                <label>Desired Location</label>
                                <input

                                name="Desired_Location"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Please Enter Desired Location"
                                />
                              </div>
                            </div>

                            <div className=" col-lg-12 col-md-12">
                              <div className="form-group">
                                <label>Desired Industry</label>
                                <input

                                name="Desired_Industry"
                                onChange={(e)=>formHandling(e)}
                                  type="text"
                                  className="form_control"
                                  placeholder="Please Enter Desired Industry"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="update" >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="content">
        <div className="job-bx-title clearfix">
      <h5 className=" pull-left text-capitalize cp">
        Personal Details
      </h5>
      
      <a
        href="#"
        className="site_button_resume  float-right"
        data-toggle="modal"
        data-target="#personalDetails"
      >
        {" "}
        <span>
          <i className="fas fa-pencil-alt pencil_clearfix"></i>
        </span>{" "}
      </a>
    </div>
    <div className="container-fluid career_profile">
     
          
                   <div className="row mt-4">
                  <div className="col-lg-6 col-md-6 career_profile_column">
          <div className="career_profile_content">
            <h5 className="industry">Date Of Birth</h5>
            <p className="it_employees">
            {moment(profile.personaldetails.dateofbirth).format("DD-MM-YYYY")}
             
            </p>
          </div>
          <div className="career_profile_content">
            <h5 className="industry">Gender</h5>
            <p className="it_employees">
              {profile.personaldetails.gender}
            </p>
          </div>
          <div className="career_profile_content">
            <h5 className="industry">Marital Status</h5>
            <p className="it_employees">
            {profile.personaldetails.maritalStatus}{" "}
             
            </p>
          </div>
          {/* <div className="career_profile_content">
            <h5 className="industry">Passport Number </h5>
            <p className="it_employees">
              + 123 456 7890{" "}
             
            </p>
          </div>
          <div className="career_profile_content">
            <h5 className="industry">Differently Abled</h5>
            <p className="it_employees">
              None{" "}
            </p>
          </div> */}
          <div className="career_profile_content">
            <h5 className="industry">Languages</h5>
            <p className="it_employees"> 
              {profile.personaldetails.languages.map((lng,index,arr)=>{
                return (<>
                  {lng}{index!=(arr.length-1)?",":""}
                  </>)
              })}{" "}
               </p>
            
          </div>
        </div>
        <div className="col-lg-6 col-md-6 career_profile_column">
          <div className="career_profile_content">
            <h5 className="industry">Permanent Address</h5>
            <p className="it_employees">
            {profile.personaldetails.address}{" "}
             
            </p>
          </div>
          <div className="career_profile_content">
            <h5 className="industry">Area Pin Code</h5>
            <p className="it_employees">
            {profile.personaldetails.pincode}{" "}
             
            </p>
          </div>
          <div className="career_profile_content">
            <h5 className="industry">Home Town</h5>
            <p className="it_employees">
            {profile.personaldetails.hometown}{" "}
             
            </p>
          </div>
          {/* <div className="career_profile_content" id="AttachResume">
            <h5 className="industry">
              Work permit of other country
            </h5>
            <p className="it_employees">
              USA{" "}
             
            </p>
          </div> */}
        </div>
        </div>
      </div>
  

    <div
      className="modal fade"
      id="personalDetails"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Personal Details
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="#">
            <div className="row my-3">

                     <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label>Date Of birth</label>
                    <input className="form_control" type="date" name="dateofbirth" value={moment(profile.personaldetails.dateofbirth).format("YYYY-MM-DD")} onChange={(e)=>onchangeDetails(e)}/>
                  </div>
                </div>

                <div className=" col-lg-12 col-md-12">
                  <label className="my-2">Gender</label>
                  <div className="form-group">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={(e)=>onchangeDetails(e)}
                        checked={profile.personaldetails.gender==="Male"}
                        id="inlineRadio1"
                      />
                      <label
                        className="form-check-label"
                        for="inlineRadio1"
                      >
                       Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={(e)=>onchangeDetails(e)}
                        checked={profile.personaldetails.gender==="Female"}
                        id="inlineRadio2"
                        
                      />
                      <label
                        className="form-check-label"
                        for="inlineRadio2"
                      >
                       Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label>Permanent Address</label>
                    <input
                      name="address"
                      onChange={(e)=>onchangeDetails(e)}
                      type="text"
                      className="form_control"
                      placeholder="Please Enter Your Permanent Address"
                      value={profile.personaldetails.address}
                    />
                  </div>
                </div>

                <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label>Hometown</label>
                    <input
                    name="hometown"
                        onChange={(e)=>onchangeDetails(e)}
                      type="text"
                      className="form_control"
                      placeholder="Enter Hometown"
                      value={profile.personaldetails.hometown}
                    />
                  </div>
                </div>

                <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label>PIN-Code</label>
                    <input
                      name="pincode"
                      type="text"
                      className="form_control"
                      placeholder="Enter PIN-Code"
                      value={profile.personaldetails.pincode}
                      onChange={(e)=>onchangeDetails(e)}
                    />
                  </div>
                </div>

                <div className=" col-lg-12 col-md-12">
                  <label className="my-2">Marital Status</label>
                  <div className="form-group">
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="maritalStatus"
                          id="inlineRadio1"
                          value="Married"
                          checked={profile.personaldetails.maritalStatus==="Married"}
                          onChange={(e)=>onchangeDetails(e)}
                        />
                        <label
                          className="form-check-label"
                          for="inlineRadio1"
                        >
                          Married
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="maritalStatus"
                          id="inlineRadio2"
                          value="UnMarried"
                          checked={profile.personaldetails.maritalStatus==="UnMarried"}
                          onChange={(e)=>onchangeDetails(e)}
                        />
                        <label
                          className="form-check-label"
                          for="inlineRadio2"
                        >
                          Unmarried
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                        name="maritalStatus"
                          className="form-check-input"
                          type="radio"
                          id="inlineRadio2"
                          value="Others"
                          checked={profile.personaldetails.maritalStatus==="Others"}
                          onChange={(e)=>onchangeDetails(e)}
                        />
                        <label
                          className="form-check-label"
                          for="inlineRadio2"
                        >
                          Others
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label>Passport Number</label>
                    <input
                        name="Passport_Number"
                        onChange={(e)=>onchangeDetails(e)}
                      type="text"
                      className="form_control"
                      placeholder="Enter Passport Number"
                    />
                  </div>
                </div> */}
                <div className=" col-lg-12 col-md-12">
                <div className="form-group">
                <label>Languages</label>
                            <ChipInput
                                label="Languages"
                                variant="outlined"
                                helperText="Press enter to add Languages"
                                value={profile.personaldetails.languages}
                                onAdd={
                                  (chip) =>
                                  setProfile({
                                    ...profile,
                                    personaldetails:{
                                      ...profile.personaldetails,
                                      languages:[...profile.personaldetails.languages, chip],
                                    } 
                                  })
                                }
                                onDelete={(chip, index) => {
                                  let languages = profile.personaldetails.languages;
                                  languages.splice(index, 1);
                                  setProfile({
                                    ...profile,
                                    personaldetails:{
                                      ...profile.personaldetails,
                                      languages:languages,
                                    } 
                                  })
                                }}
                                fullWidth
                              />
                </div>
                </div>

                {/* <div className=" col-lg-12 col-md-12">
                  <div className="form-group">
                    <label className="my-2">
                      Work Parmit To Other Countries
                    </label>
                    <input
                    name="Work_Parmit_To_Other_Countries"
                    onChange={(e)=>onchangeDetails(e)}
                      type="text"
                      className="form_control"
                      placeholder="Enter Country Name"
                    />
                  </div>
                </div> */}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="update" onClick={(e)=>handlePersonalDetails(e)}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
              
              <div className="content" id="AttachResume">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-capitalize cp">
                    Attach Resume
                  </h5>
                </div>
                <p className="job_usa">
                  Resume is the most important document recruiters look for.
                  Recruiters generally do not look at profiles without resumes.
                </p>
                <FileUploadInput 
                handleInput={handleInput} 
                identifier={"resume"}
                setProfile={setProfile}
                profile={profile}
                handleUpdate={handleUpdate}
                />
              </div>
              
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
