const Exam = require("../models/exam");
const Answer = require("../models/answer");
const Student = require("../models/student");
const Question = require("../models/question");

let index=0;
let examid;
let no_ques;
let quesl;

module.exports.createStudentSession = function (req, res) {
    req.flash('success','Logged in successfully');
    return res.redirect('/students/dashboard');
};

module.exports.dashboardstudent = async(req, res)=>{
   let exam = await Exam.find({}).populate('course');

    return res.render('./student/dashboard',{
        layout: './student/layout.ejs',
        exam: exam
    });
};

module.exports.report = async(req, res)=>{
    let student = await Student.findById(req.user._id).populate({
        path: 'attempts',
    populate: {
        path: 'course',
    }});
     
     return res.render('./student/report',{
         layout: './student/layout.ejs',
         student: student
     });
 };

 module.exports.reviewdetail = async(req, res)=>{
    let studentid = req.user._id;
    let attemptexamid = req.params.examid;
    let exam = await Exam.findById(attemptexamid);

    let question = await Answer.find({student: studentid, exam: attemptexamid}).populate('question');
    let totalM = 0;
    for (i of question) {
        totalM = totalM+i.marks;
    }
 
     return res.render('./student/reviewdetail',{
         layout: './student/layout.ejs',
         questions: question,
         exam: exam,
         totalM: totalM

     });
 };


module.exports.attempt = async(req, res)=> {
    let student = await Student.findById(req.user._id);

    let att = student.attempts;
    const found = att.find(element => element == req.params.id);
    if(found) {
        return res.send("Not allowed / Only one attempt allowed");
    }   

    let exam = await Exam.findById(req.params.id).populate({
        path: 'questions'
    });
    
    student.attempts.push(exam);
    student.save();

    examid = await exam._id;
    no_ques = await exam.questions.length;
    quesl = await exam.questions;

    return res.render('./student/attempt', {
        layout: './student/layout.ejs',
        exams: exam
    });
};

module.exports.submitanswer = async(req, res)=>{
    try {  
        let timetaken = req.body.timetaken;
        await Answer.insertMany(req.body.myArray);

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
};

module.exports.nextpage = async(req, res)=>{
    try {
        if(index<no_ques-1) {
            index = index+1;
        }
        if(req.xhr) {
            res.status(200).json({
                data: {
                    question: quesl[index],
                    index: index
                },
                message: "Next Question loaded"
            });
        }
    }catch(error) {
        console.log(error);
        return res.redirect('back');
    }
};
module.exports.prevpage = async(req, res)=>{
    try {
        if(index>0) {
            index = index-1;
        }
        if(req.xhr) {
            res.status(200).json({
                data: {
                    question: quesl[index],
                    index: index
                },
                message: "Previous Quesion loaded"
            });
        }
    }catch(error) {
        console.log(error);
        return res.redirect('back');
    }
};

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
};