import React from 'react'
import CountUp from 'react-countup';
export const Categories = () => {
   
  const [loading, setLoading] = React.useState(false);
  const onStart = () => {setLoading(true)};
  const onEnd = () => {setLoading(false)};
  const containerProps = {
    'aria-busy': loading
  };
    return (
        
        <div>

<section id="categories">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-sm-12 pc">
                <h2>Popular Categories</h2>
                <h6 className="fw3 ">20+ Catetories work wating for you</h6>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 text-left">
                <h2 className=" counter d-inline" > <CountUp end={5000} duration="10" onStart={onStart} onEnd={onEnd} containerProps={containerProps} /></h2>
                <h2 className="d-inline pl-1">+</h2>
                <h6>Recruiters</h6>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 text-center">
                <h2 className=" counter d-inline"> <CountUp end={500000} duration="10" onStart={onStart} onEnd={onEnd} containerProps={containerProps} /></h2>
                <h2 className="d-inline pl-1">+</h2>
                <h6>Students</h6>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 text-right">
                <h2 className=" counter d-inline"> <CountUp end={20000} duration="10" onStart={onStart} onEnd={onEnd} containerProps={containerProps} /></h2>
                <h2 className="d-inline pl-1">+</h2>
                <h6>Freelancers</h6>
            </div>
        </div>

    </div>
</section>


<section>
<div className="pt-2 pb-2">
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-one"><i class="fas fa-paint-brush"></i></span>
                    <h6>Design, Art & MultiMedia</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-two"><i class="fab fa-uncharted"></i></span>

                    <h6>Software Developer</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-three"><i className="fas fa-wallet"></i></span>
                    <h6>Your Photoshopping</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-four"><i className="fas fa-cloud-upload-alt"></i></span>
                    <h6>Business Growth</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-five"><i className="fas fa-chart-bar"></i></span>
                    <h6>Market Strategy</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-six"><i class="fas fa-search-location"></i></span>
                    <h6>Civil Supervisor</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-six"><i className="fas fa-camera"></i></span>
                    <h6>Photoshopping</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="main-item">
                    <span className="icon feature-box-col-six"><i class="fas fa-arrows-alt"></i></span>
                    <h6>Surveyor</h6>
                    <p>198 Open Positions</p>
                </div>
            </div>
        </div>
    </div>
</div>
</section>


</div>


      
    )
}
export default Categories;