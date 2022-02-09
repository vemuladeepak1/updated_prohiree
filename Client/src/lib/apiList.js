export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  sendOTP: `${server}/auth/mobile/send-otp`,
  verifyOTP: `${server}/auth/mobile/verify-otp`,
  contactSendOTP: `${server}/auth/contact-verification/send-otp`,
  contactVerifyOTP: `${server}/auth/contact-verification/verify-otp`,
  forgotPassword: `${server}/auth/forgot-password`,
  mobilelogin: `${server}/auth/mobilelogin`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  sendotp:`${server}/api/sendotp`,
  alljobs:`${server}/api/alljobs`,
  changepassword:`${server}/api/changepassword`
};

export default apiList;
