const passport = require("passport");

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    console.log(user,info)
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({message:"You Must Login First"});
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = jwtAuth;
