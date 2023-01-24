const rows = Array.from(document.querySelectorAll('tr'));

function slideOut(row) {
  row.classList.add('slide-out');
}

function slideIn(row, index) {
  setTimeout(function() {
    row.classList.remove('slide-out');
  }, (index + 5) * 200);  
}

rows.forEach(slideOut);

rows.forEach(slideIn);
// let deleteUser = function(deleteLink) {
//     $(deleteLink).click(function(e) {
//         e.preventDefault();

//         $.ajax({
//             type: 'get',
//             url: $(deleteLink).prop('href'),
//             success: function(data) {
//                 $(`#user-${data.data.user_id}`).remove();
//                 new Noty({
//                     theme: 'relax',
//                     text: "User Deleted",
//                     type: 'success',
//                     layout: 'topRight',
//                     timeout: 1500
                    
//                 }).show();
//             },error: function(error) {
//                 console.log(error.responseText);
//             }

//         });
//     });
// }

// let convertPostsToAjax = function(){
//     $('.view-user-table').each(function(){
//         let self = $(this);
//         console.log(self);
//         // let deleteButton = $(' .delete-user-button', self);
//         // deleteUser(deleteButton);

//     });
// }

// convertPostsToAjax();