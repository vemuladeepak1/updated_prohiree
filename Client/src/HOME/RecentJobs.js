import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import axios from 'axios'
import apiList from "../lib/apiList"
import ReactPaginate from "react-paginate"
import ReactLoading from 'react-loading';
const RecentJobs = () => {
    const [jobs,setJobs] = useState([])

    // Pagination code
    const [offset, setOffset] = useState(1);
  //   const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const indexOfLastPost = offset * perPage;
      const indexOfFirstPost = indexOfLastPost - perPage;
      const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
        const handlePageClick = (e) => {
          const selectedPage = e.selected;
          setOffset(selectedPage + 1);
        };


    useEffect(() => {
      getData();
    },[]);
  
    const getData = () => {
      axios
        .get(apiList.alljobs)
        .then((response) => {
          setPageCount(Math.ceil(response.data.length)/perPage)
          console.log(response.data);
          setJobs(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
  


    return (
        <div>
            
<div id="sec4">
<div className="container">
  <div className="d-flex mb-4">
    <div className="mr-auto">
      <h2>Recent Jobs</h2>
      <h6>10+ Recently Added Jobs</h6>
    </div>
    <div className="align-self-end">
      <Link className="browse button" to="/alljobs">
        Browse All Jobs <i className="fas fa-chevron-right"></i>
      </Link>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-9">
      {
        jobs.length>0?
        currentPosts.map((job)=>{
          return(<>
          <ul className="job-post">
        <li>
          <div className="job-box">
            <div className="d-flex mb-2">
              <div className="job-company">
                <span>
                  <img alt="" src="" />
                </span>
              </div>
              <div className="job-info">
                <h4>
                  <Link to={`/jobdetailes/${job._id}`}>
                    {job.title}
                  </Link>
                </h4>
                <ul>
                  <li>
                    <h5 className="home_company_name">{job.recruiter.companyname}</h5>
                  </li>
                  <li>
                    <h6 className="star_box">
                      {" "}
                      {/* <span>
                        {" "} */}
                        {/* 5<i className="fas fa-star star_rating"></i> */}
                        {/* <a href="#">(53 Reviews)</a> */}
                      {/* </span> */}
                    </h6>
                  </li>
                </ul>
                <ul className="home_job_details">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    {job.cities.map((job,index,arr)=>{
                return (<>
                  {job}{index!=(arr.length-1)?"/":""}
                  </>)
              })}
                  </li>
                  <li>
                    <i className="far fa-bookmark"></i>{job.jobType}
                  </li>

                  <li>
                    <i className="fas fa-shopping-bag"></i>{job.experience}
                  </li>
                  <li>
                    <i className="fas fa-rupee-sign"></i>{job.salary}
                  </li>
                </ul>
                <div className="mt-3">
                  {
                    job.skillsets.map((job)=>{
                      return(<>
                      <button className="home_job_btn">{job}</button>
                      </>)
                    })
                  }
                  
                  <div className="posted_home">
                    <div className="job-type">
                      <a href="#">
                        <span>
                          <i className="fas fa-history"></i> 2 Hour ago{" "}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
    </ul>
          </>)
        }): 
        <div style={{textAlign:"-webkit-center"}}>
        <ReactLoading type="balls" color={"rgb(118 55 117)"} height={500} width={150} />
        </div>
      }
       <div class="d-flex justify-content-center">
      <ReactPaginate
      previousLabel="prev"
      nextLabel="Next"
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      />
      </div>
    </div>
    <div className="col-lg-3">
      <div className="sticky-top">
        {/* modification Required */}
        <div className="member mb-4">
          <div className="member-box">
            {/* <div className="test-pic round">
              <img src="" alt="" />
            </div> */}
            <div className="test-matter">
              <p>
                You’ve made it through the rigorous interview process
                successfully and the organization has extended you an
                offer for employment. Congratulations! Now, it’s time to
                take a better look at what the offer includes.
              </p>
            </div>
            <div className="test-location">
              <p>
                <b className="test-name">Richard Anderson</b>
              </p>
              <p>
                <span className="test-place">Nevada, USA</span>
              </p>
            </div>
          </div>
        </div>
        <div className="sentence-box">
          <div className="sentence-matter">
            <h4>Make a Difference with Your Online Resume!</h4>
            <p>
              Your resume in minutes with JobBoard resume assistant is
              ready!
            </p>
            <a className="acc-btn" href="#">
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </div>
      
 </div>
</div>
</div>

        </div>
    )
}

export default RecentJobs