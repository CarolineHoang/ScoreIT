// Author: Caroline Hoang
// JS for the Testing Question Page where a user can answer the question shown
// [UI Design Final Project] 

// GLOBAL VARIABLE(S) ==========================================================
currentNote = "";
noteInformation= [];
first_try= true;
solved= false;
scorableBool = true;
scorableStat = -1;
problemInfo = {}

var questionTotal=8;

var url= window.location.href.replace(/\/$/, ''); /* remove optional end / */ 
var urlLastSeg = url.substr(url.lastIndexOf('/') + 1);
var currentQuestion = parseInt(urlLastSeg)

// AJAX CALL(S) ================================================================


var getProblemInfo = function(idx){
    console.log("this call started    "+ window.location.pathname+"/getProblemInfo" )
    var data_to_save = {"problemNum": currentQuestion};      
    $.ajax({
        type: "POST",
        url: window.location.pathname+"/getProblemInfo",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            problemInfo = result["problemInfo"]
            console.log("this call succeeded")
            console.log("PROBLEM INFO:  ")
            console.log(problemInfo)
            console.log(problemInfo["answerIdx"])
            defaultRenders(problemInfo)
            if (problemInfo["qType"] =="id"){
                $("#qPrompt").html(problemInfo["questionPartial"] + "&nbsp;" + "<b>" + problemInfo["answerInfo"][0] + "</b>" + "?")
            }
            else if (problemInfo["qType"] =="length"){
                $("#qPrompt").html("Which symbol lasts for " + "<b>" + problemInfo["questionPartial"] + "</b>"+ "?")
            }
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var updateScore = function(problemNum){
    console.log("this call started    "+ window.location.pathname+"/searchClicked" )
    var data_to_save = {    "problemNum": problemNum, 
                            "lastQuestion": false, 
                            "clearData": false
                        }; 
    $.ajax({
        type: "POST",
        url: "/updateScore",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            console.log("this call succeeded")
            $("#currScore").html(result["currentScore"])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 

var scorable = function(boolNum=-1, clickedButton=null){
    var startingScorableBool = scorableBool

    var data_to_save = {    "boolNum": boolNum,
                            "problemNum": currentQuestion
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
            scorableStat = result["scorableStat"]
            console.log("AFTER:  Scorable: "+ scorableStat    +     "      ScorableBool: "+ scorableBool)

            if (startingScorableBool || scorableStat == 2){
                if (scorableStat == 1 || scorableStat == 2){
                    correctRenderedObjects(clickedButton)
                }
                else if (scorableStat == 0){
                    incorrectRenderedObjects(clickedButton)
                }
            }
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
} 


// OTHER HELPER FUNCTION(S) ====================================================

var defaultRenders = function(problemInfo){
    console.log("DEFAULT IS STARTING =============  #buttonOp"+problemInfo["answerIdx"])
    console.log("AFTER:  Scorable: "+ scorableStat    +     "      ScorableBool: "+ scorableBool)

    console.log("answer idx:  " + problemInfo["answerIdx"])
    console.log("hit here1" + scorableBool == true)
    if ( first_try && scorableStat == 1 && scorableBool == true){
        console.log("hit here2" + scorableBool == true)
        console.log("default correct " + problemInfo["answerIdx"])
        $("#buttonOp"+problemInfo["answerIdx"]).addClass("correct");
        correctRenderedObjects()
    }
    else if (first_try && scorableStat == 2){

        console.log("default was corrected  " + problemInfo["answerIdx"])
        correctRenderedObjects()
        $("#buttonOp"+problemInfo["answerIdx"]).addClass("correct");
    }
    console.log("DEFAULT IS ENDING =============  ")
}

var correctRenderedObjects = function(correctButton=null){
    $("#buttonOp"+problemInfo["answerIdx"]).addClass("correct");
    
    $("#hintDiv").css("display","none")
    $("#readMore").removeClass("hide").addClass("centeredContainer msgMargin")
    // $("#hintDiv").html("<span class='greyFont'>Read More about &nbsp; </span><a href= \"/lessons/lesson/dotted\"> Dotted Music Notes </a> ")
    if (scorableStat == 1){
        $("#validity").html("<span class='correctMsgColor msgTextSize bolded'>CORRECT</span>")
    }
    else if (scorableStat == 2){
        $("#validity").html("<div class='correctedMsgColor msgTextSize bolded'>CORRECT</div><div class='correctedMsgColor msgSubtextSize'>(AFTER CORRECTION)</div>")
    }

    
    if (currentQuestion == questionTotal){
        // updateScore(currentQuestion);
        $("#nextButton").html("<a href=\"/test/results\"> <button class= \"greyNavButton\" >  Finish &gt;   </button></a>");
    }
    else{
        $("#nextButton").html("<a href=\"/test/"+(currentQuestion+1)+"\"> <button class= \"greyNavButton\" >  Continue &gt;   </button></a>");
    }
}

var incorrectRenderedObjects = function(incorrectButton=null){
    $("#validity").html("<span class='incorrectMsgColor msgTextSize bolded'>INCORRECT</span>")
    if (problemInfo["qType"] =="id"){
        if (problemInfo["ansType"] == "noteInfo"){
            $("#hintDiv").html("<span class='greyFont'>Hint: Consider reviewing &nbsp; </span><a href= \"/lessons/lesson/note\"> <b> Music Notes </b>  </a> ")
        }
        else if (problemInfo["ansType"] == "restInfo"){
            $("#hintDiv").html("<span class='greyFont'>Hint: Consider reviewing &nbsp; </span><a href= \"/lessons/lesson/rest\"> <b> Rests </b> </a> ")
        }
        else if (problemInfo["ansType"] == "dotInfo"){
            $("#hintDiv").html("<span class='greyFont'>Hint: Consider reviewing &nbsp; </span><a href= \"/lessons/lesson/dotted\"> <b> Dotted Music Notes </b> </a> ")
        }
    }
    else if (problemInfo["qType"] =="length"){
        $("#hintDiv").html("<span class='greyFont'>Hint: Here, in 4/4 time, a quarter <a href='/lessons/2/note'>note</a>/<a href='/lessons/2/rest'>rest</a> is worth 1 beat.")
    }
    $("#hintDiv").addClass("show")
    console.log("wrong answer!")
}

// MAIN FUNCTION ===============================================================
$(document).ready(function(){

    console.log("url path loc: " + urlLastSeg)
    console.log ("linkedas");
    console.log(currentNote);
    console.log("the test:" + window.test);
    scorable(-2)
    getProblemInfo();
    scorable(-2)

    loaderFillingPercent = ((currentQuestion)/8) *100;
    $("#loaderBar").css("width", loaderFillingPercent+"%")
    $("#QNum").html("Q"+currentQuestion+": ");
    
    if (urlLastSeg == "note"){
        $("#nextButton").html("<a href=\"/lessons/lesson/rest\"> <button class= \"\" >  Learn Rests &gt;  </button></a>");

    }
    else if (urlLastSeg == "rest"){
        $("#lastButton").html("<a href=\"/lessons/lesson/note\"> <button class= \"\" > &lt; Review Notes  </button></a>");
        $("#nextButton").html("<a href=\"/lessons/lesson/dotted\"> <button class= \"\" >  Learn Dotted Notes &gt;  </button></a>");
    }
    else if (urlLastSeg == "dotted"){
        $("#lastButton").html("<a href=\"/lessons/lesson/rest\"> <button class= \"\" > &lt; Review Rests  </button></a>");
        $("#nextButton").html("<a href=\"/test\"> <button class= \"goTest\" >  Take the Test! &gt;   </button></a>");
        $(".lastNoteButton").addClass("hide");
    }

    $(".changeNote").on("click", function(){
        console.log ("linked");
        console.log("Scorable: "+ scorableStat    +     "      ScorableBool: "+ scorableBool)
        if ($(this).attr("validAns")== 1){
            
            var correctButton = $(this);
            console.log("this is the answer!")
            correctRenderedObjects(correctButton);
            if (!solved && scorableBool){
                //mark solvable to true
                updateScore(currentQuestion);
                scorable(1,correctButton)
            }
            else if (!solved && scorableStat == 0){
                scorable(2,correctButton)
            }
            solved = true;
        }
        else{
                var incorrectButton = $(this);
                incorrectButton.addClass("incorrect");
                if (!solved){
                    scorable(0, incorrectButton)
                }
        }
        currentNote= parseInt($(this).attr("noteIdx"));
        console.log("currentnote: " + currentNote);
        first_try = false;
    })

    window.addEventListener('keydown', function(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if (!audio) return;
        audio.currentTime = 0; // rewind to the start of audio
        audio.play();
        key.classList.add('playing')
    });

})