// Author: Caroline Hoang
// Simple Bootstrap Navbar
//
// This navbar is the base of the template structure.
//
// [UI Design Final Project] 

$(document).ready(function(){

    console.log(window.location.pathname)
    console.log(document.referrer)
    // const url = new URL(document.referrer)
    // console.log(url.pathname)

    console.log(window.location.pathname, window.location.pathname == "/")

    if (window.location.pathname == "/"){
        $("#nav1").addClass("activeColor");
    }

    // $("#navSearchButton").on("click", function(){
    //     if (window.location.pathname != "/" && $("#navSearch").val() && $("#navSearch").val().trim() ){
    //         console.log("route: " + document.location.pathname)
    //         document.location.href = '/?query='+$("#navSearch").val().trim() ;
    //     }
    // })
})

// $(document).ready(function(){
//     // pressing enter to submit the form
//     $("#navSearch").keyup(function(event){
//         if (event.key == "Enter"){
//                 $("#navSearchButton").click(); //trigger button click event behavior
//         }
//     })
// })