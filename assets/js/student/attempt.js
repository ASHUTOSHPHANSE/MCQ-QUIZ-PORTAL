{
let index=0;
let examname = get.name;
let questions = get.questions;
let totalQuestion = questions.length;
let duration = get.duration*60;
let datatosend = [];
let totalMarks = 0;
let counter=0;
//get exam id
let url = window.location.href;
let exmid = url.substring(url.lastIndexOf('/') + 1);

$(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) {   //  reduce double fire issues
        switch (e.type) {
            case "blur":
                $('#exampleModal').modal('toggle');
                $('#exampleModal').modal('show');
                setTimeout(function(){
                    window.location.assign("/students/report");
                }, 3000); 
                
                break;
            case "focus":
                $('#exampleModal').modal('toggle');
                $('#exampleModal').modal('show');
                setTimeout(function(){
                    window.location.assign("/students/report");
                }, 3000); 

                break;
        }
    }

    $(this).data("prevType", e.type);
})

$(document).bind("contextmenu",function(e){
    return false;
 });
 
$(function (){    
    let totalTime = duration;
    let min = 0;
    let sec = 0;
    counter = 0;

    let timer = setInterval(function (){
        counter++;
        min = Math.floor((totalTime - counter) / 60); // CALCUTATE MIN
        sec = totalTime - min*60 - counter;

        $(".timerBox span").text(min + ":" + sec);

        if(counter == totalTime){
            submitbtn();
            alert("Time's up . Your response is auto submitted");

            clearInterval(timer);
        }
    
    },1000); //timer set for 1 seconds interval
        //timer code end

        printQuestion(index);   //print question
});

function printQuestion(index){
    $(".questionBox").text((index+1) + ". " + questions[index].content);

    $(".optionBox span").eq(0).text(questions[index].option1)
    $(".optionBox span").eq(1).text(questions[index].option2)
    $(".optionBox span").eq(2).text(questions[index].option3)
    $(".optionBox span").eq(3).text(questions[index].option4)

        // color for marked option
    const j = datatosend.findIndex(_element => _element.question === questions[index]._id);

    $(".optionBox span").removeClass("marked");
    if(j>-1) {
        let i;
        for(i=0; i<=3; i++) {
            let spn = $(".optionBox span").eq(i);
            if(datatosend[j].chosenoption == spn.data("opt")) {
                spn.addClass("marked") ;
            }
        }
    }
}

function fillanswer(option) {
    let chosenoption = $(option).data("opt");
    let marks=0;
    if(chosenoption==questions[index].answer) {
        marks=questions[index].mark;
    }

    $(".optionBox span").removeClass("marked");
    $(option).addClass("marked");

    let answer = {
        student: studid,
        exam: exmid,
        question: questions[index]._id,
        chosenoption: chosenoption,
        answer: questions[index].answer,
        marks: marks
    };
    function upsert(array, element) { // (1)
        const i = array.findIndex(_element => _element.question === element.question);
        if (i > -1) array[i] = element; // (2)
        else array.push(element);
      }
      upsert(datatosend, answer);
}
function showNext() {
    if(index>=totalQuestion-1) {
        return;
    }
    // console.log("next");
    index++;
    $(".optionBox span").removeClass();


    printQuestion(index);
}
function showPrevious() {
    if(index<=0) {
        return;
    }
    // console.log("prev");
    index--;
    $(".optionBox span").removeClass();

    printQuestion(index);
}

function submitbtn() {
    $.ajax({
        url: "/students/submit-answer",
        type: "POST",
        data: {myArray : datatosend, timetaken: counter}
    });
    window.location.assign("/students/dashboard");
}
}