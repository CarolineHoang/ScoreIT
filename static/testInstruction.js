// Author: Caroline Hoang
//This file is arbitrary (for possible future development where the results page 
//and the test instructions page doesn't do the same thing and unused!!!


currentNote = "";
testest = "sorry"
noteInformation= [];

var url= window.location.href.replace(/\/$/, ''); /* remove optional end / */ 
var urlLastSeg = url.substr(url.lastIndexOf('/') + 1);
// var currentQuestion = parseInt(urlLastSeg)


var updateScore = function(problemNum){
    console.log("this call started    "+ window.location.pathname+"/searchClicked" )
    // var data_to_save = {"dataPack": {"problemNum": problemNum, "lastQuestion": false, "clear": true }};  
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
            // var sales = result["sales"]
            // noteNames=
            // noteInformation = result["clickedInfo"]
            console.log("this call succeeded")
            // console.log(noteInformation)
            // $("#nName").html(noteInformation[0]).addClass("vertlesson ")
            // $("#nName").append("<div class= 'centeredContainer ' ><img src= \""+ noteInformation[1] +"\"   class=\"noteImgDesc\" /> </div>")
            // $("#nName").append("<div class= 'centeredContainer ' > = "+ noteInformation[2] +"</div>")
            // $("#infoContainer").removeClass("hide").addClass("show");
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
                            "problemNum": 1
                            // ,"lastQuestion": false, 
                            // "clearData": false//(currentQuestion ? '$2.00' : '$10.00')
                        };      
    // data_to_save = {"problemNum": problemNum, "clear": true }; 
    $.ajax({
        type: "POST",
        url: "/scorable",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("this call succeeded:   " +  result["scorable"])
            scorableBool = result["scorable"]
            console.log("scorableBool: " + scorableBool)

            // $("#currScore").html(result["currentScore"])
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
    console.log("url path loc: " + urlLastSeg)
    console.log ("linkedas");
    console.log(currentNote);
    console.log("the test:" + window.test);
    scorable(-4);
    updateScore(0);
})