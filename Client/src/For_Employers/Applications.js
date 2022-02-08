import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import apiList from '../lib/apiList';

export const Applications = () => {
    const [applications, setApplications] = useState([]);
    let { id } = useParams();
   
    const updateStatus = (status,id)=>{
      const address=`${apiList.applications}/${id}`
      const statusData = {
        status:status,
        dateOfPosting:new Date().toISOString()
      }
      axios.put(address,statusData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response)=>{
        console.log(response)
        getData()
      })
      
    }


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let address = `${apiList.applicants}?jobId=${id}`;
    console.log(address);
    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        setApplications([]);
        
      });
  };

    return (   
    <div class="container mb-5">

    <div class="applications">
        <div class="job-bx-title clearfix">
            <h5 class=" pull-left text-uppercase cp">Applications</h5>
            <Link to="/Manage_jobs"
                class="site-button right-arrow button-sm float-right"> Back </Link>
            <div class="row my-4">
                <div class="col-lg-4">
                <div class="box">
                    {applications.length > 0 ?
                        applications.map((application)=>{
                            console.log(application)
                            return(
                            <div>
                            <h5 class="heading_box">
                               {application.jobApplicant.name}</h5>
                            <p class="designer"><span>UI/UX Designer</span> At Attract
                                Solutions </p>
                            <div class="resume_content_location">
                                <p class="resume_content_location_sub_sub"><i class="fas fa-graduation-cap"></i>
                                    B-tech
                                </p>
                                <p class="resume_content_location_sub_1_sub"><i class="fas fa-briefcase"></i> Fresher
                                </p>
                                <p class="resume_content_location_sub_1_sub px-1"><i class="fas fa-rupee-sign"></i>
                                    25000</p>
                            </div>
                            {
                              application?.jobApplicant?.skills.map((skill)=>{
                                 return(<> 
                                 <button class="php">{skill}</button>
                             </>
                            ) 
                              })
                            }
                            {
                              application.status==="applied"?   
                              (<>
                              <button type="button" class="btn btn-warning" onClick={()=>updateStatus("shortlisted",`${application._id}`)}>shortlist</button>{ "  "}
                              <button type="button" class="btn btn-danger" onClick={()=>updateStatus("rejected",`${application._id}`)}>Reject</button>
                              </>)
                              :application.status==="shortlisted"?
                              (<>
                              <button type="button" class="btn btn-success" onClick={()=>updateStatus("accepted",`${application._id}`)}>accept</button>{ "  "}
                              <button type="button" class="btn btn-danger" onClick={()=>updateStatus("rejected",`${application._id}`)}>Reject</button>
                              </>):application.status==="rejected"?
                              <button type="button" class="btn btn-danger">Rejected</button>:
                              application.status==="accepted"?
                              <button type="button" class="btn btn-success">Accepted</button>:null
                            }
                         
                            
                            <a href="#" class="download_box"><i class="fa fa-download download_icon_app"></i></a>
                            {/* <a href="#" class="download_box"><i class="fas fa-list view_icon_app"></i></a>
                            <a href="#" class="download_box"><i class="fas fa-user-minus min_icon_app"></i></a> */}
                       </div>
                       ) }):
                       <div>No applications found</div>
                    }
                     </div>
                </div>
                       </div>
                       
    </div>
</div>


        </div>
    )
}
export default Applications;
