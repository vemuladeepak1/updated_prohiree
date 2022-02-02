import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiList from '../../lib/apiList';
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading';
 const BrowseFilterList = () => {
const [jobs,setJobs]=useState([])

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

useEffect(async()=>{
   await axios.get(apiList.jobs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPageCount(Math.ceil(response.data.length)/perPage)
        console.log(response.data);
        setJobs(response.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
      
    
},[])

    return (
        <div>
        <div className="job_detail_wrapper">
        <div className="heading_pic_filter_list">
            <h1 className="filter_list_heading_1">Browse Job List</h1>
            <p className="text-center filter_list_sub_heading">
                <Link to="/" className="filter_list_sub_heading_1">Home</Link> &gt;
                <a href="#" className="filter_list_sub_heading_2 ">Browse Filter List</a></p>
        </div>
    </div>


    <div className="container">
        <div className="filter_list_search-box">
            <form className="form-control">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>

                            </label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="search_filter_list_input"
                                    placeholder="Job Title, Keywords, or Phrase" />
                                <div className="input-group-append">
                                    <span className="filter_list_group_icon">
                                        <i className="fas fa-search ml-2" id="filter_list_search_icon1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                            <label></label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="search_filter_list_input"
                                    placeholder="Location" />
                                <div className="input-group-append">
                                    <span className="filter_list_group_icon">
                                        <i className="fas fa-map-marker-alt" id="filter_list_search_icon2"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 ">
                        <label for=""></label>
                        <a href="#"></a><button id="filter_list_search_btn" type="submit" className=" btn-block">Find
                            Job</button>
                    </div>

                </div>
            </form>
        </div>

    </div>




    <div id="job_filter_list">
        <div className="container">
            <div className="d-flex mb-4">
                <div className="mr-auto">
                    <h2 className="job_filter_list_title">2269 Jobs Found</h2>
                </div>
                <div className="view_list_grid ">
                    <Link to="/browsefilterlist" className="filter_list_view "> <button
                            className="btn list_view mb-2 browse_active">List View</button></Link>
                    {/* <Link to="/browsefiltergrid" className="filter_grid_view "> <button
                            className="btn grid_view mb-2">Grid View</button></Link> */}
                </div>
            </div>
            <div className="row">

            <div className="col-lg-3 ">
                    <div className="sticky-top">
                    <div id="accordion">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                       
                          <h5
                            class="accordionItemHeading"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                             
                            Top Companies{" "}
                            <span className="float-right">
                              <i className="fas fa-minus"></i>
                            </span>
                          </h5>
                         
                       
                      </div>

                      <div
                        id="collapseOne"
                        class="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                         
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault2"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault2"
                                >
                                  Accenture(750)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Reliance Industries(680)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Adani Group(248)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  IBM(576)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Cognizent Technologies(768)
                                </label>
                              </div>

                              <div className="more">
                                <Link
                                  to="/companyjobs"
                                  className="more_inner float-right mr-4 py-1"
                                >
                                  {" "}
                                  more...{" "}
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2 */}

                    <div class="card">
                      <div class="card-header" id="headingTwo">
         
                          <h5
                            class="collapsed accordionItemHeading"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                           Experience{" "}
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                       
                      </div>
                      <div
                        id="collapseTwo"
                        class="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  00 - 02 years (120)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  02 - 05 years (120)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  05 - 10 years (120)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  10 - 15 years (120)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  15 + years (120)
                                </label>
                              </div>

                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                       
                          <h5
                            class=" collapsed accordionItemHeading"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                           Location{" "}
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                       
                      </div>
                      <div
                        id="collapseThree"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                         
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                            
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Delhi (7586)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Mumbai (9756)
                                </label>
                              </div>
                             
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Chennai (8845)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Ahmedabad (9456)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Kolkata (6578)
                                </label>
                              </div>

                              <div className="more">
                                <Link
                                  to="/locationaljobs"
                                  className="more_inner float-right mr-4 py-1"
                                >
                                  {" "}
                                  more...{" "}
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4 */}

                    <div class="card">
                      <div class="card-header" id="headingThree">
                       
                          <h5
                            class=" collapsed accordionItemHeading"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            Industry{" "}
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                       
                      </div>
                      <div
                        id="collapseFour"
                        class="collapse"
                        aria-labelledby="headingFour"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                         
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                            
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  BPO / Call Center(879)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Real Estate(589)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Management Jobs (685)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Financial Services (965)
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    {/* 5 */}

                    <div class="card">
                      <div class="card-header" id="headingFive">
                       
                          <h5
                            class=" collapsed accordionItemHeading"
                            data-toggle="collapse"
                            data-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                             Job Function / Category{" "}
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                     
                      </div>
                      <div
                        id="collapseFive"
                        class="collapse"
                        aria-labelledby="headingFive"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                     
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input "
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault2"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault2"
                                >
                                  Production Management(120)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Design Engineering(300)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Saftey/health(235)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Engineering (568)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Product Development (798)
                                </label>
                              </div>

                              <div className="more">
                                <Link
                                  to="/categoryjobs"
                                  className="more_inner float-right mr-4 py-1"
                                >
                                  {" "}
                                  more...{" "}
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 6 */}

                    <div class="card">
                      <div class="card-header" id="headingSix">
                       
                          <h5
                            class="accordionItemHeading collapsed"
                            data-toggle="collapse"
                            data-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                          >
                             Education
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                     
                      </div>
                      <div
                        id="collapseSix"
                        class="collapse"
                        aria-labelledby="headingSix"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                         
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                            
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Any Post Graduate(4783)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  Any Graduate (7634)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  B.Tech / B.E (14564)
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  B.Com (13567)
                                </label>
                              </div>

                              <div className="more">
                                <Link
                                  to="/designationjobs"
                                  className="more_inner float-right mr-4 py-1"
                                >
                                  {" "}
                                  more...{" "}
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 7 */}

                    <div class="card">
                      <div class="card-header" id="headingSeven">
                       
                          <h5
                            class="accordionItemHeading collapsed"
                            data-toggle="collapse"
                            data-target="#collapseSeven"
                            aria-expanded="false"
                            aria-controls="collapseSeven"
                          >
                            Salary{" "}
                            <span className="float-right">
                              <i className="fas fa-plus"></i>
                            </span>
                          </h5>
                     
                      </div>
                      <div
                        id="collapseSeven"
                        class="collapse"
                        aria-labelledby="headingSeven"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                         
                          <div className="accordionItemContent">
                            <form action="#" className="acc_form">
                              <div className="form-check  my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault2"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault2"
                                >
                                  0 - 3 Lakhs
                                </label>
                              </div>
                              <div className="form-check  my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  3 - 7 Lakhs
                                </label>
                              </div>
                              <div className="form-check  my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  7 - 15 Lakhs
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  15 - 30 Lakhs
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  30 - 60 Lakhs
                                </label>
                              </div>
                              <div className="form-check my-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexcheckboxDefault"
                                  id="flexcheckboxDefault1"
                                />
                                <label
                                  className="form-check-label pl-2"
                                  for="flexcheckboxDefault1"
                                >
                                  60 - 100+++ Lakhs
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                </div>

              
            
                <div className="col-lg-9">
               
                {
                  jobs.length >0?
                        currentPosts?.map((job)=>{
                            return(
                                <ul className="filter_list_job_post">
                                   
                            <li>
                                <div className="filter_list_job_box">
                                    <div className="d-flex mb-4">
                                        <div className="filter_list_job_company">
                                            <span><img alt="" src="" /></span>
                                        </div>
                                        <div className="filter_list_job_info">
                                            <h4><Link to={`/jobdetailes/${job._id}`}>{job.title}</Link></h4>
                                            <ul>
                                                <li><i className="fas fa-map-marker-alt"></i>Hyderabad</li>
                                                <li><i className="far fa-bookmark"></i>{job.jobType}</li>
                                                <li><i className="far fa-clock"></i>Published 1 hour ago</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="filter_list_job_type mr-auto">
                                            <a href="#"><span>Full Time</span></a>
                                        </div>
                                        <div className="filter_list_salary">
                                            <span><i className="fas fa-rupee-sign"></i> {job.salary} - <i
                                                    className="fas fa-rupee-sign"></i>
                                                30000</span>
                                        </div>
                                    </div>
                                    <label className="filter_list_wishlist">
                                        <input type="checkbox" /><span className="filter_list_added"><i
                                                className="fas fa-heart"></i></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                            )
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

            </div>
        </div>
    </div>
 


        </div>
        )
}
export default BrowseFilterList;