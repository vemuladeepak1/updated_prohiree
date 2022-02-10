import React from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { userType } from '../lib/isAuth';
import apiList from '../lib/apiList';
import {toast} from 'react-toastify'
import moment from "moment";
import { useSelector } from 'react-redux';
export const Jobdetailes = (props) => {
    const [jobs, setJobs] = useState([]);
    const [recruiter,setRecruiter] = useState([])
    const navigate = useNavigate();
    const result = useSelector(state=>state.data)
    const [descSplit,setDesSplit] = useState([])
    let { id } = useParams();

    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios
            .get(`http://localhost:4444/api/jobs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response)
                setJobs(response.data.job);
                setRecruiter(response.data.postedby)
                setDesSplit(response.data.job.description.split('.'))
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const handleApply = (e) => {
        e.preventDefault()
        axios
          .post(
            `${apiList.jobs}/${jobs._id}/applications`,{
                sop:"ksajdfk"
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          .then((response) => {
           console.log(response.data)
        //    setApply(response.data.status)
            navigate('/appliedjobs')
           toast.success(response.data.message)
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message)
          });
      };


    return (
     <div>
     <div className="job_detail_wrapper">
        <div className="heading_pic_job_detail w-100 h-100 text-white">
            <h1 className="job_detail_heading_1 d-flex justify-content-center align-items-center">Job Details</h1>
            <p className="text-center job_detail_sub_heading">
                <Link to="/" className="job_detail_sub_heading_1 text-white font-weight-bold">Home</Link>
                &gt;
                <a href="#" className="job_detail_sub_heading_2 text-white font-weight-bold">Job Details</a>
            </p>
        </div>
    </div>
    <div id="sec4" className="container job_details_main">
        <div className=" row">
            <div className="col-lg-12 col-md-12">
                <ul className="job-post">
                    <li>
                        <div className="job_details_box job-box">
                            <div className="d-flex mb-2">
                                <div className="job-company">
                                    <span><img alt="" src="" /></span>
                                </div>
                                <div className="job-info">
                                    <h4><a href="#">{jobs.title}</a>
                                    </h4>
                                    <ul>
                                        {/* <li>
                                            <h5 className="home_company_name">Infosys - </h5>
                                        </li> */}
                                        {/* <li>
                                            <h6 className="star_box"> <span> 5<i className="fas fa-star star_rating"></i><a
                                                        href="#">(53 Reviews)</a></span></h6>
                                        </li> */}
                                    </ul>
                                    <ul className="home_job_details">
                                        <li><i className="fas fa-map-marker-alt"></i>
                                         {
                                            jobs?.cities?.map(val=>{
                                                return <>{val}/</>
                                            })
                                        }
                                        </li>
                                        <li><i className="far fa-bookmark"></i>{jobs.jobType}</li>
                                       
                                        <li><i className="fas fa-shopping-bag"></i>{jobs.experience}</li>
                                        <li><i className="fas fa-rupee-sign"></i>{jobs.salary} 
                                        {/* - <i
                                                className="fas fa-rupee-sign"></i>30000</li> */}
                                                </li>
                                    </ul>
                                    {/* <p className="discribe_home"><i className="far fa-file-alt"></i> {jobs.description}</p> */}
                                    <div className="mt-3">
                                        {
                                            jobs?.skillsets?.map(val=>{
                                                return(<button className="home_job_btn mx-1">{val}</button>)
                                            })
                                        }
                                        {/* <button className="home_job_btn mx-1">CSS</button>
                                        <button className="home_job_btn mx-1">Bootstrap</button>
                                        <button className="home_job_btn mx-1">React JS</button>
                                        <button className="home_job_btn mx-1">Java Script</button>
                                        <button className="home_job_btn mx-1">Node JS</button> */}
                                        <div className="float-right job_details_save">
                                            <a href="#" type="btn" className="job_details_savebtn mx-2"  >Save</a>
                                            <a href="#" type="btn" className="job_details_applybtn" disabled={result?.type === "recruiter"} onClick={(e)=>handleApply(e)}>Apply</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    </ul>
            </div>
        </div>
        <div className="job_details_posted mx-1">
            <div className="job_posted">
                <span className="stat mr-3 mt-3"><label className="pr-2">Posted : </label><span> 
                    {/* {moment(jobs.dateOfPosting).startOf('day').fromNow() } */}
                    {moment.utc(jobs.dateOfPosting).local().startOf('seconds').fromNow()}
                    </span></span>
                <span className="stat mr-3"><label  className="pr-2">Openings: </label><span> {jobs.maxPositions}</span></span>
                <span className="stat mr-3"><label>Job Applicants: </label><span>Less than 10</span></span>
                <a className="send_like_jobs"><span> Send me jobs likethis </span> </a>
            </div>
        </div>
        <section className="job-description">
            <h2 className="font-weight-bold">Job description</h2>
            <div className="job_description_inner">
                <p> </p>
                <p>Please find below job description if interested please do share your updated resume along with
                    contact information to <strong><u>{recruiter.email}</u></strong></p><br />
                <p><strong>Position: {jobs.title}</strong></p>
                <p><strong>Location :
                {jobs?.cities?.map((lng,index,arr)=>{
                return (<>
                  {lng}{index!=(arr.length-1)?"/":""}
                  </>)
              })}
                </strong></p>
                <p><strong>Experience : {jobs.experience}</strong></p><br />
                <p><strong><u>Roles and Responsibilities :</u></strong></p>
                {descSplit.map((desc)=>{
                   return (
                   <ul>
                   <li>{desc}.</li>
                   </ul>)
                })}
                <p><strong>Thanks &amp; Regards,</strong></p>
                <p><strong> {recruiter.companyname}</strong></p>
                {/* <p><strong>Role - (Manager)</strong></p> */}
                <p><strong>Mobile No :</strong> {recruiter.contactNumber}</p>
                <p><strong>Email:</strong> {recruiter.email}</p>
                {/* <p><strong>URL :</strong> https://perfextechnologies.com/</p> */}
            </div>
            <div className="other-details">
                <div className="details"><label>Role</label><span><a href="#" target="_blank" className="pl-1 job_role">: {jobs.title}</a><span className="role">.</span></span></div>
                <div className="details"><label>Industry Type</label><span><a href="#" target="_blank"
                            className="pl-1 job_role">: {recruiter.organizationType}
                             {/* &amp; */}
                            </a><span className="role">.</span></span></div>
                {/* <div className="details"><label>Functional Area</label><span><a href="#" target="_blank"
                            className="pl-1 job_role">: Engineering -
                            Software</a><span className="role">,</span></span></div> */}
                {/* <div className="details"><label className="pr-2">Employment Type</label><span><span>: Full Time,
                            Permanent</span></span></div>
                <div className="details"><label className="pr-2">Role Category :</label><span><span>Software
                            Development</span></span></div> */}
            </div>
            <div className="job_details_education">
                <div className="heading_education font-weight-bold pt-4">Education</div>
                <div className="details"><label>Graduation :</label><span className="">{jobs.education}</span></div>
            </div>
            <div className="job_details_keyskills">
                <div className="heading_keyskills pt-4 font-weight-bold">Key Skills</div>
                <div className="mt-3">
                {
                    jobs?.skillsets?.map((job)=>{
                      return(<>
                      <button className="home_job_btn">{job}</button>
                      </>)
                    })
                  }
                    {/* <button className="home_job_btn">HTML</button>
                    <button className="home_job_btn">CSS</button>
                    <button className="home_job_btn">Bootstrap</button>
                    <button className="home_job_btn">React JS</button>
                    <button className="home_job_btn">Java Script</button>
                    <button className="home_job_btn">Node JS</button> */}
                </div>
            </div>
        </section>
    </div>

     
     </div>

    )
}
export default Jobdetailes;