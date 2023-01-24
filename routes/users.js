const express = require('express');
const router = express.Router();
const passport = require('passport');
const app = express();

//  Users routes
const usersController = require('../controllers/users_controller');
router.get('/dashboard',passport.checkAdminAuthentication, usersController.dashboard);
router.get('/add-user',passport.checkAdminAuthentication, usersController.addUser);
router.get('/view-user',passport.checkAdminAuthentication, usersController.viewUser);
router.get('/view-student',passport.checkAdminAuthentication, usersController.viewStudent);
router.get('/add-student', passport.checkAdminAuthentication, usersController.addStudent);
router.get('/add-course',passport.checkAdminAuthentication, usersController.addCourse);
router.get('/view-course',passport.checkAdminAuthentication, usersController.viewCourse);
router.post('/create-user', passport.checkAdminAuthentication, usersController.createUser);
router.post('/create-student', passport.checkAdminAuthentication, usersController.createStudent);
router.post('/create-course', passport.checkAdminAuthentication, usersController.createCourse);
router.post('/create-admin-session', passport.authenticate(
    'login-admin',
    {failureRedirect: '/'}
    ), usersController.createSession
);
router.post('/create-examiner-session', passport.authenticate(
    'login-examiner',
    {failureRedirect: '/'}
    ), usersController.createExaminerSession
); 
router.get('/sign-out', usersController.destroySession);
router.get('/destroy/:id', passport.checkAdminAuthentication, usersController.destroy);
router.get('/destroys/:id', passport.checkAdminAuthentication, usersController.destroyS);
router.get('/destroyc/:id', passport.checkAdminAuthentication, usersController.destroyC);

// Examiner routes
router.get('/examiner/dashboard',passport.checkExaminerAuthentication, usersController.dashboardExaminer);
router.get('/examiner/add-question',passport.checkExaminerAuthentication, usersController.addQuestion);
router.get('/examiner/add-exam',passport.checkExaminerAuthentication, usersController.addExam);
router.post('/examiner/create-exam', passport.checkExaminerAuthentication, usersController.createExam);
router.get('/examiner/view-exam',passport.checkExaminerAuthentication, usersController.viewExam);
router.post('/examiner/create-question', passport.checkExaminerAuthentication, usersController.createQuestion);
router.get('/examiner/exam-details/:id',passport.checkExaminerAuthentication, usersController.examDetails);
router.get('/examiner/destroyQ/:id', passport.checkExaminerAuthentication, usersController.destroyQ);
router.get('/examiner/destroyE/:id', passport.checkExaminerAuthentication, usersController.destroyE);

module.exports = router;