const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    experience:{
      type: Object,
      default:""

    },
    currentlocation:{
      type:String,
      default:""
    },
    resumeHeadline:{
      type:String,
      default:""
    },
    profileSummary:{
      type:String,
      default:""
    },
    skills:[],
    employment:[
      {
        years:{
          type: String,
          default:""
        },
        months:{
          type: String,
          default:""
        },
        designation:{
          type: String,
          default:""
        },
        organization:{
          type: String,
          default:""
        },
        startYear:{
          type:Number,
          default:""
        },
        endYear:{
          type:Number,
          default:""
        },
        profileDescription:{
          type:String,
          default:""
        },
        noticePeriod:{
          type:Number,
          default:""
        }
      }
    ],
    education:[
      {
        highestgraduation:{
          type: String,
          default:""
        },
        course:{
          type: String,
          default:""
        },
        specialization:{
          type: String,
          default:""
        },
        institute:{
          type: String,
          default:""
        },
        passedoutyear:{
          type:Number,
          default:""
        },
        courseType:{
          type:String,
          default:""
        },
        marks:{
          type:Number,
          default:""
        }
      }
    ],
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
    // resume: {
    //   type: String,
    //   default:""
    // },
    resume:{
      filename:{
        type: String,
        default:""
      },
      url:{
        type: String,
        default:""
      }
    },
    profile: {
      type: String,
      default:""
    },
    personaldetails:
      {
        dateofbirth:{
          type:Date,
          default:""
        },
        address:{
          type:String,
          default:""
        },
        gender:{
          type:String,
          default:""
        },
        pincode:{
          type:Number,
          default:""
        },
        maritalStatus:{
          type:String,
          default:""
        },
        hometown:{
          type:String,
          default:""
        },
        languages:[{
          type:String,
          default:""
        }]
      },
    contactNumber: {
      type: Number,
      // validate: {
      //   validator: function (v) {
      //     // var v = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      //     return v !== "" ? /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) : true;
      //   },
      //   msg: "Phone number is invalid!",
      // },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("JobApplicantInfo", schema);
