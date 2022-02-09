const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const SMS = require("../lib/sms");
const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");
// const Profile = require("../db/ProfileDetails")
const bcrypt = require('bcrypt')
const moment = require('moment')
const router = express.Router();

function passwordGenerate(length) {
  var result = '';
  var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

// Signup Routing
router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
    phone: data.contactNumber
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "recruiter"
          ? new Recruiter({
            userId: user._id,
            companyname: data.name,
            contactNumber: data.contactNumber,
            email: data.email,
          })
          : new JobApplicant({
            userId: user._id,
            name: data.name,
            email: data.email,
            rating: data.rating,
            contactNumber: data.contactNumber,
          });

      //   const ProfileDetails = 
      //   new Profile({
      //    userId: user._id,
      //    profilename:data.name
      //  });
      //  ProfileDetails.save()

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          console.log('eee ', err);
          user
            .delete()
            .then(() => {
              res.status(400).json({ message: err.message });
            })
            .catch((err) => {
              res.json({ message: err.message });
            });
          err;
        });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ message: "User Already Exists" });
    });

});


// Login Routing
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

router.post("/mobile/send-otp", async (req, res) => {
  const { phone } = req.body;
  let user = await User.findOne({ phone });
  if (user) {
    await user.setPhoneOTP(phone);
    return user.save().then(() => {
      return res.json({ message: "OTP Send" })
    })
  } else {
    res.status(400).json({ message: "User Not Registered" });
  }
})

router.post("/mobile/verify-otp", async (req, res, next) => {
  User.findOne({ phone: req.body.phone }).then((user) => {
    console.log('uuu ', user);
    if (user) {
      let dif = moment(user.validTimeForOTP).diff(moment(), 'seconds')
      if (dif > 0) {
        if (user.otp == req.body.otp) {
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          return res.json({
            token: token,
            type: user.type,
          });

        } else {
          return res.status(401).json({ message: 'Invalid OTP' })
        }
      } else {
        return res.status(401).json({ message: 'OTP expired, try to generate new OTP' })
      }
    }
  }).catch(next);
})

router.post("/contact-verification/send-otp", async (req, res, next) => {
  if (!req.body.phone) {
    return res.status(400).json({ message: 'Phone number is required' })
  }
  SMS.sentVerificationOTP(req.body.phone).then((sessionId) => {
    return res.json({ sessionId, message: "OTP sended"})
  }).catch(() => {
    return res.status(400).json({ message: 'OTP not send' })
  })
  
})

router.post("/contact-verification/verify-otp", async (req, res) => {
  if (!req.body.sessionId) {
    return res.status(400).json({ message: 'Session ID is required' })
  }
  if (!req.body.otp) {
    return res.status(400).json({ message: 'OTP is required' })
  }
  SMS.verifyContact(req.body.sessionId, req.body.otp).then(() => {
    return res.json({ message: "OTP Verified"})
  }).catch( errMsg => {
    return res.status(401).json({ message: errMsg})
  })
  
})


router.post("/forgot-password", async (req, res) => {
  const { phone } = req.body;
  let user = await User.findOne({ phone });
  if (user) {
    let password = passwordGenerate(6)
    
      user.password = password;
      SMS.sentPassword(phone, password)
      return user.save().then(() => {
        return res.json({ message: "New password send" })
      })

  } else {
    res.status(400).json({ message: "User Not Registered" });
  }
})

// MobileLogin Routing
router.post("/mobilelogin", (req, res) => {
  const { phone } = req.body;
  console.log(phone)
  if (!phone) {
    return res.status(422).json({ error: "Please fill all the fields" })
  } else {
    User.findOne({ contactNumber: phone }).then((savedUser) => {
      if (!savedUser) {
        res.status(422).json({ error: "User not exist" })
      }
      else {
        // res.status(200).json({message:"Login success"}) 
        const token = jwt.sign({ _id: savedUser._id }, authKeys.jwtSecretKey);
        res.json({
          token: token,
          type: savedUser.type,
        });
      }
    }).catch((err) => {
      console.log(err)
    })
  }
});






// Flutter Login Routing
router.post("/loginflutter", (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" })
  } else {
    User.findOne({ email }).then((savedUser) => {
      if (!savedUser) {
        res.status(422).json({ error: "Invalid email or password" })
      }
      else {
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            res.status(200).json({ message: "Login Successful" })
          }
          else {
            res.status(422).json({ error: "Invalid email or password" })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
})

module.exports = router;
