// {
//     let createUser = function () {
//         let newUserform = $('#create_user_form');
//         newUserform.submit(function(e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/users/create-user',
//                 data: newUserform.seriallize(),
//                 success: function(data) {
//                     console.log(data);
//                 },error: function(error) {
//                     console.log(error.responseText);
//                 }
//             })
//         });
        
//     };

//     createUser();
// }