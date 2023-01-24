const express = require('express');
const router = express.Router();
const passport = require('passport');
const app = express();

//  Users routes
const studentsController = require('../controllers/students_controller');
router.get('/dashboard',passport.checkStudentAuthentication, studentsController.dashboardstudent);
router.get('/report',passport.checkStudentAuthentication, studentsController.report);
router.get('/review-detail/:examid',passport.checkStudentAuthentication, studentsController.reviewdetail);
router.post('/create-student-session', passport.authenticate(
    'login-student',
    {failureRedirect: '/'}
    ), studentsController.createStudentSession
);
router.get('/sign-out', studentsController.destroySession);
router.get('/attempt/:id', passport.checkStudentAuthentication, studentsController.attempt);
router.post('/submit-answer', passport.checkStudentAuthentication, studentsController.submitanswer);
router.get('/nextpage', passport.checkStudentAuthentication, studentsController.nextpage);
router.get('/prevpage', passport.checkStudentAuthentication, studentsController.prevpage);

module.exports = router;