const config = require("./config");
const axios = require("axios")

const sentOTP = (phone, otp) => {
    axios.get(`https://2factor.in/API/V1/${config.smsAPIKey}/SMS/${phone}/${otp}`)
        .then((response) => {
            // console.log(response)
        })
};

const sentPassword = (phone, password) => {
    axios.get(`https://2factor.in/API/V1/${config.smsAPIKey}/SMS/${phone}/${password}`)
        .then((response) => {
            // console.log(response)
        })
};


module.exports = {sentOTP, sentPassword};
