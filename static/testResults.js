// Author: Caroline Hoang
// JS for the Test Results Page AND the testInstruction page (because they are functinonally idential mostly)
// If the user descides to test again, the corresponding button clears their last score.
// [UI Design Final Project]  


var updateScore = function(problemNum){
    console.log("this call started    "+ window.location.pathname+"/searchClicked" )
    var data_to_save = {    "problemNum": problemNum, 
                            "lastQuestion": false, 
                            "clearData": true
                        };   
    $.ajax({
        type: "POST",
        url: "/updateScore",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("this update call succeeded")
            window.location.replace("/test/1");
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 


var scorable = function(boolNum){

    var data_to_save = {    "boolNum": boolNum,
                            "problemNum": 9 //this is one more than the max number of questions (probably will change this codification for a terminator in the future)
                        };      
    $.ajax({
        type: "POST",
        url: "/scorable",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("this scorable call succeeded :   " +  result["scorable"])
            scorableBool = result["scorable"]
            updateScore(0);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });

} 

$(document).ready(function(){
    console.log("test test")
    $("#retake").on("click", function(){
        console.log("click")
        // scorable(-4);
        // updateScore(0);
        // window.location.replace("/test/1");
        scorable(-4);  
    })
})
