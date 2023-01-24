const Student = require("../models/student");
const User = require("../models/user");
const Course = require("../models/course");
const Exam = require("../models/exam");
const Question = require("../models/question");

let ucount=0;
let stcount=0;
let crcount=0;
let qscount=0;
let excount=0;
let coursel;
Course.find({}, (err, course)=>{
    coursel=course;
});
module.exports.dashboard = async(req, res)=> {

    ucount = await User.countDocuments({}).exec();
    stcount = await Student.countDocuments({}).exec();
    crcount = await Course.countDocuments({}).exec();
    qscount = await Question.countDocuments({}).exec();
    excount = await Exam.countDocuments({}).exec();
    let course = await Course.findById(req.user.course);

    return res.render('./admin/admindashboard',{
        no_of_users: ucount,
        no_of_students: stcount,
        no_of_courses: crcount,
        no_of_questions: qscount,
        no_of_exams: excount,
        course: course
    });

};

// render sign up page
module.exports.addUser = async(req, res)=>{
    return res.render('./admin/adduser', {
        title: "Add User",
        course_list: coursel
    });

};
module.exports.viewUser = function (req, res) {
    User.find({}).populate('course').exec(function(err, user) {
        return res.render('./admin/viewuser', {
            title: "View User",
            viewhead: "Admin and Examiners",
            user_student_list: user
        });
    });
};

module.exports.addStudent = (req, res)=>{
    return res.render('./admin/addstudent.ejs', {
        title: "Add Student"
    });
};
module.exports.viewStudent = (req, res)=>{
    Student.find({}, (err, student)=>{
        return res.render('./admin/viewstudent', {
            title: "View Student",
            viewhead: "Students",
            user_student_list: student
        });
    });
};
module.exports.createUser = async function (req, res) {
    try {
        await User.create(req.body);
        req.flash('success','user created' );
        return res.redirect('back');
    } catch (err) {
        console.log('error: ',err);
        return res.redirect('back');
    }
};
module.exports.createStudent = async (req, res)=> {
    Student.findOne({email: req.body.email}, (err, student)=>{
        if(err) {
            console.log('error in finding student in signing up');
            return;
        }
        if(!student) {
            Student.create(req.body, (err, newStudent)=>{
                if(err) {
                    console.log(`error in creating student: ${err}`);
                    return;
                }
                req.flash('success','Student created' );
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
};
module.exports.createCourse = async (req, res)=> {
    Course.findOne({coursename: req.body.coursename}, (err, course)=>{
        if(err) {
            console.log('error in finding Course ');
            return;
        }
        if(!course) {
            Course.create(req.body, (err, newCourse)=>{
                if(err) {
                    console.log(`error in creating course: ${err}`);
                    return;
                }
                req.flash('success','Course created' );
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
};
module.exports.addCourse = function (req, res) {
    return res.render('./admin/addcourse', {
        title: "Add Course"
    });
};
module.exports.viewCourse = function (req, res) {
    Course.find({}, function(err, course) {
            return res.render('./admin/viewcourse', {
                title: "View Course",
                viewhead: "Courses",
                course_list: course
            });
    });
};

// Examiner
module.exports.dashboardExaminer = async(req, res)=> {

    ucount = await User.countDocuments({}).exec();
    stcount = await Student.countDocuments({}).exec();
    crcount = await Course.countDocuments({}).exec();
    qscount = await Question.countDocuments({}).exec();
    excount = await Exam.countDocuments({}).exec();
    let course = await Course.findById(req.user.course);

    return res.render('./examiner/dashboard',{
        layout: './examiner/layout.ejs',
        no_of_users: ucount,
        no_of_students: stcount,
        no_of_courses: crcount,
        no_of_questions: qscount,
        no_of_exams: excount,
        course: course
    });

};
module.exports.addExam = async function (req, res) {
    let course= await Course.findById(req.user.course);
        
    return res.render('./examiner/addexam', {
        layout: './examiner/layout.ejs',
        title: "Add Exam",
        course: course
    });

};
module.exports.createExam = async (req, res)=> {
    try {
        await Exam.create({
            name: req.body.name,
            description: req.body.description,
            marks: req.body.marks,
            starttime: req.body.starttime,
            duration: req.body.duration,
            user: req.user._id,
            course: req.user.course
        });
        req.flash('success','exam created' );
        return res.redirect('back');
        
    } catch (err) {
        console.log('error: ',err);
        return res.redirect('back');
    }
};
module.exports.viewExam = async function (req, res) {
    let exam = await Exam.find({user: req.user._id}).populate('course');
    return res.render('./examiner/viewexam', {
        layout: './examiner/layout.ejs',
        title: "View Exam",
        exams: exam
    });
};
module.exports.createQuestion = async (req, res)=>{
    try {
        let exam = await Exam.findById(req.body.exam);
        let question = await Question.create(req.body);
        exam.questions.push(question);
        exam.save();

        req.flash('success','question added' );
        return res.redirect('back');
        
    } catch (err) {
        console.log('error: ',err);
        return res.redirect('back');
    }
};
module.exports.addQuestion = async function (req, res) {
    await Exam.find({user: req.user._id}).exec((err, exam)=>{
        return res.render('./examiner/addquestion', {
            layout: './examiner/layout.ejs',
            title: "Add Question",
            exams: exam
        });
    });

};
module.exports.examDetails = async function (req, res) {
    let exam = await Exam.findById(req.params.id).populate({
        path: 'questions'
    });
    return res.render('./examiner/examdetails', {
        layout: './examiner/layout.ejs',
        title: "View Exam",
        exams: exam
    });
};
// create session
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in successfully');
    return res.redirect('/users/dashboard');
};
module.exports.createExaminerSession = function (req, res) {
    req.flash('success','Logged in successfully');
    return res.redirect('/users/examiner/dashboard');
};
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
};

module.exports.destroy = async function(req, res) {
    try {
        let user = await User.findById(req.params.id);
        user.remove();

        // if(req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             user_id: req.params.id
        //         },
        //         message: "post deleted"
        //     })
        // }
        req.flash('success', 'User deleted!');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return;
    }
};
module.exports.destroyS = async function(req, res) {
    try {
        let user = await Student.findById(req.params.id);
        user.remove();


        req.flash('success', 'Student deleted!');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return;
    }
};
module.exports.destroyC = async function(req, res) {
    try {
        let course = await Course.findById(req.params.id);
        course.remove();


        req.flash('success', 'Course deleted!');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return;
    }
};
module.exports.destroyQ = async function(req, res) {
    try {
        let question = await Question.findById(req.params.id);
        let examId = await question.exam;
        await question.remove();
        let exam = await Exam.findByIdAndUpdate(examId, { $pull: {questions: req.params.id}});

        req.flash('success', 'Question deleted!');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return;
    }
};
module.exports.destroyE = async function(req, res) {
    try {
        let exam = await Exam.findById(req.params.id);
        await exam.remove();

        req.flash('success', 'Exam deleted!');
        return res.redirect('back');
    }catch(err) {
        req.flash('error', err);
        return;
    }
};