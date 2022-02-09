import React, { useState } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import OwlCarousel from "react-owl-carousel";



// import { TagsInput } from 'react-tag-input-component'

const Result = () => {
  return (
    <p style={{ color: "green" }}>
      <h5>
        <b>Form Submitted Successfully.....</b>
      </h5>
    </p>
  );
};

const HireAndTrain = () => {

  const services = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: false,
    loop: true,
    autoplayTimeout: 500,
    responsive: {
      0: {
        items: 1,
      },
      530: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  const [result, showResult] = useState(false);
  const [name, setFullName] = useState("");
  const [email, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [graduation, setgraduation] = useState("");
  const [passedout, setpassedout] = useState("");
  const [location, setlocation] = useState("");
  const [skills, setskills] = useState([]);
  const [message, setmessage] = useState("");
console.log(skills)
  const sendEmail = (e) => {
    e.preventDefault();
    // console.log("hello")

    // emailjs
    //   .sendForm(
    //     "service_uylk7sp",
    //     "template_tawbs7h",
    //     e.target,
    //     "user_8z77GuPEKrnfHaLDyodeg"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // e.target.reset();
    // showResult(true);

    //   console.log(fullname)
    const data = {
      Name: name,
      PhoneNumber: phone,
      Email: email,
      Graduation: graduation,
      passedout: passedout,
      Location: location,
      Skills: skills,
      Message: message,
    };
    console.log(data)
    // axios
    //   .post(
    //     "https://sheet.best/api/sheets/b8f02c3d-f6bf-4d1a-be06-6a6e793dfd7f",
    //     data
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setFullName("");
    //     setphone("");
    //     setmail("");
    //     setgraduation("");
    //     setpassedout("");
    //     setlocation("");
    //     setskills("");
    //     setmessage("");
    //   });
  };

  return (
    <div>
      <div className="process_services">
        <div className="container">
          <header className="section-header services_header ">
            <h2 className="clients_heading text-center pb-3">
              Our Process Services
            </h2>
          </header>
          <div className="items">
            <OwlCarousel className="owl-theme" {...services}>
              <div className="services">
                <div className="sevices_top_img">
                  <h2>
                    <span className="service_01 d-block">01</span>HIRE
                  </h2>
                </div>

                <div className="services_content">
                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                      We Source the talent from colleges and open market as per
                      clients specific requirement.
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                        Extend conditional offers to candidates basis their skills.
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                    Filter the candidates based on a comprehensive screening test.
                    </span>
                  </div>
                </div>
              </div>

              <div className="services">
                <div className="sevices_top_img">
                  <h2>
                    <span className="service_01 d-block">02</span>TRAIN
                  </h2>
                </div>

                <div className="services_content">
                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                      CLient requirement based software and interpersonal skilltraining.
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                      Virtual / Classroom batches for 8 - 10 weeks at our location
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                      At location- 4 week, real time training OTJ(ON-THE-JOB) training.
                    </span>
                  </div>
                </div>
              </div>

              <div className="services">
                <div className="sevices_top_img">
                  <h2>
                    <span className="service_01 d-block">03</span>DEPLOY
                  </h2>
                </div>

                <div className="services_content">
                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                      Post assessment evaluation proposed to client for fianl round of selection. 
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                     Fully-trained local candidates join you immediately.
                    </span>
                  </div>

                  <div className="services_content_inner">
                    <i className="fas fa-check d-inline"></i>{" "}
                    <span className="d-inline">
                      {" "}
                     Post joining skill reinforcement to make them better at the job required.
                    </span>
                  </div>
                </div>
              </div>
            </OwlCarousel>{" "}
          </div>
        </div>
      </div>
      <div className="container main_content">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className="wrapper">
              <div className="content">
                <div className="job-bx-title clearfix">
                  <h5 className=" pull-left text-uppercase cp">
                    Hire And Train
                  </h5>
                </div>
                <form action="#" onSubmit={sendEmail}>
                  <div className="row">
                    <div className=" col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Your Name :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="text"
                            name="name"
                            onChange={(e) => setFullName(e.target.value)}
                            value={name}
                            placeholder=" "
                          />
                          <span className="input__label">Enter Your Name</span>
                        </label>
                      </div>
                    </div>

                    <div className=" col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Email :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="email"
                            name="email"
                            onChange={(e) => setmail(e.target.value)}
                            value={email}
                            placeholder=" "
                          />
                          <span className="input__label">Enter Your Email</span>
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Mobile Number :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="text"
                            name="phone"
                            onChange={(e) => setphone(e.target.value)}
                            value={phone}
                            placeholder=" "
                          />
                          <span className="input__label">
                            Enter your mobile number
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <label>Qualification :</label>
                      <label className="input mt-1 mb-2">
                        <input
                          className="input__field form_control form_hire"
                          type="text"
                          name="graduation"
                          onChange={(e) => setgraduation(e.target.value)}
                          value={graduation}
                          placeholder=" "
                        />
                        <span className="input__label">
                          Enter your Qualification
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Passed Out Year :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="text"
                            name="passedout"
                            onChange={(e) => setpassedout(e.target.value)}
                            value={passedout}
                            placeholder=" "
                          />
                          <span className="input__label">
                            Enter your Passedout
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Location :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="text"
                            name="location"
                            onChange={(e) => setlocation(e.target.value)}
                            value={location}
                            placeholder=" "
                          />
                          <span className="input__label">
                            Enter your Location
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Technical Skills :</label>
                        <label className="input mt-1 mb-2">
                          <input
                            className="input__field form_control form_hire"
                            type="text"
                            name="skills"
                            onChange={(e) => setskills(e.target.value)}
                            value={skills}
                            placeholder=" "
                          />
                          <span className="input__label">
                            Enter your skills
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* <div className="col-lg-12">
                    <div className="form-group">
                      <label>Technical Skills :</label>
                          <ChipInput
                              label="skills"
                              variant="outlined"
                              helperText="Press enter to add skills"
                              value={skills}
                              onAdd={(chip) =>
                                setskills([...skills,chip])
                              }
                              onDelete={(chip, index) => {
                                let skillsets = skills;
                                skillsets.splice(index, 1);
                                setskills([skillsets])
                              }}
                              fullWidth
                            />
                          </div>
                    </div> */}



                    <div className=" col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Message :</label>
                        <label className="input mt-1 mb-2">
                          <textarea
                          rows="7"
                            className="input__field form_control form_hire"
                            type="text"
                            name="message"
                            onChange={(e) => setmessage(e.target.value)}
                            value={message}
                            placeholder=" "
                          />
                          <span className="input__label">
                            Enter your Message
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="update">Submit</button>
                  <div className="row">{result ? <Result /> : null}</div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HireAndTrain;