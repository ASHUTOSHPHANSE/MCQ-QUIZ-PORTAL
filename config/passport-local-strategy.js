const passport = require('passport');
const Student = require('../models/student');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use('login-admin',new LocalStrategy({
    usernamefield: 'username',
    passReqToCallback: true
},
    function (req, username, password, done) {
        //find the user and establish the identity
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                req.flash('error',err);
                // console.log('error', err);
                return done(err);
            }
            if (!user || user.password != password || user.usertype!='admin') {
                req.flash('error','Invalid password/username');
                // console.log('Invalid admin-user pass');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));
passport.use('login-examiner',new LocalStrategy({
    usernamefield: 'username',
    passReqToCallback: true
},
    function (req, username, password, done) {
        //find the user and establish the identity
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                req.flash('error',err);
                // console.log('error', err);
                return done(err);
            }
            if (!user || user.password != password || user.usertype!='examiner') {
                req.flash('error','Invalid password/username');
                // console.log('Invalid examiner-user pass');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));
passport.use('login-student',new LocalStrategy({
    usernamefield: 'username',
    passReqToCallback: true
},
    function (req, username, password, done) {
        //find the user and establish the identity
        Student.findOne({ username: username }, function (err, user) {
            if (err) {
                req.flash('error',err);
                // console.log('error', err);
                return done(err);
            }
            if (!user || user.password != password ) {
                req.flash('error','Invalid password/username');
                // console.log('Invalid student-user pass');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

// Multiple strategy implementation
function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
  }
  
  passport.serializeUser(function (userObject, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "model1";
    let userPrototype =  Object.getPrototypeOf(userObject);

    if (userPrototype === User.prototype) {
      userGroup = "model1";
    } else if (userPrototype === Student.prototype) {
      userGroup = "model2";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
  });

  passport.deserializeUser(function (sessionConstructor, done) {

    if (sessionConstructor.userGroup == 'model1') {
      User.findOne({
          _id: sessionConstructor.userId
      }, function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'model2') {
      Student.findOne({
          _id: sessionConstructor.userId
      },function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    }

  });

//check if the user is authenticated
passport.checkAdminAuthentication = function(req, res, next) {
    if(req.isAuthenticated() && req.user.usertype=='admin') {
        return next();
    }
    return res.redirect('/');
};
passport.checkExaminerAuthentication = function(req, res, next) {
    if(req.isAuthenticated() && req.user.usertype=='examiner') {
        return next();
    }
    return res.redirect('/');
};
passport.checkStudentAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

passport.setAuthenticatedUser = function(req,res,next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;