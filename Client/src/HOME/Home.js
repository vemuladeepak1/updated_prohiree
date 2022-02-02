import React from 'react'
import { Link } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Testimonials from './Testimonials';
// import Pagination from './Pagination';
import Categories from './categories';
import OurClients from'./OurClients';
import FeaturedCities from './FeaturedCities'
import RecentJobs from './RecentJobs';
const Home = () => {
  const [isBlue, setIsBlue] = React.useState(false);




    const options ={
        loop: true,
             margin: 10,
             nav: false,
             autoplay: true,
             loop: true,
             responsive: {
                 0: {
                     items: 1,
                 },
                 600: {
                     items: 3,
                 },
                 1000: {
                     items: 5,
                 }
              } 
           }
    return (
        <div>
        
        <section>
        <div id="sec1" className="container-fluid">
            <div className="container hm1">
                <div className="home1">
                    {/* <Link id="am1" className="main_text "
                        to="/browsefilterlist">Find Jobs, Employment
                        &amp; Career
                        Opportunities</Link> */}
                    <h2 className="am2">Find Your Right Job Here .....
                    {/* <br /> <span className="num_text">50,000</span> Open Jobs. */}
                    </h2>
                </div>
                <div className="hm2">
                    <form className="form-control">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>
                                    </label>
                                    <div className="input-group">
                                        <input type="text" className="form-control home_input"
                                            placeholder="Job Title " />
                                        <div className="input-group-append">
                                            <span className="input-group-text home_input_group">
                                                <i className="fas fa-search" id="fa1"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label></label>
                                    <div className="input-group">
                                        <input type="text" className="form-control home_input" placeholder="Location" />
                                        <div className="input-group-append">
                                            <span className="input-group-text home_input_group">
                                                <i className="fas fa-map-marker-alt" id="fa2"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 job_btn">
                                <label for=""></label>
                                <Link
                                to="/browsefilterlist"
                                className="text-white"> <button id="fa3" type="submit" className=" btn-primary  btn-block">Find Job</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <Categories />
    <OurClients />
    <FeaturedCities />
    <RecentJobs />
    {/* <Testimonials /> */}



</div>

    )
}
export default Home