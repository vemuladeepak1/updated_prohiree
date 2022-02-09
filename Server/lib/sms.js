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
    // axios.post(`https://2factor.in/API/V1/${config.smsAPIKey}/ADDON_SERVICES/SEND/TSMS`, {
    //     From: "ABCD",
    //     To: phone,
    //     Msg: `Your new password is ${password}`
    // })
};

const sentVerificationOTP = (phone) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://2factor.in/API/V1/${config.smsAPIKey}/SMS/${phone}/AUTOGEN`)
        .then((response) => {
            // console.log(response)
            resolve(response.data.Details)
        }).catch( (err) => {
            reject(false)
        })
    })
    
}

const verifyContact = (session_id, otp) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://2factor.in/API/V1/${config.smsAPIKey}/SMS/VERIFY/${session_id}/${otp}`)
        .then((response) => {
            // console.log(response)
            resolve(true)
        }).catch( (err) => {
            console.log('err',err.response.data.Details);
            reject(err.response.data.Details)
        })
    });
    
}


module.exports = {sentOTP, sentPassword, sentVerificationOTP, verifyContact};
