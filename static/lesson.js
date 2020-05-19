// Author: Caroline Hoang
//
// JS functionality for the Lesson Page where a user can click notes to learn them
// Upon clicking a note it will load an original example video (made by me) and information about the note
//
// [UI Design Final Project] 


// GLOBAL VARIABLE(S) ==========================================================
currentNote = "";
noteInformation= [];

// var url= window.location.href.replace(/\/$/, ''); /* remove optional end / */ 
var url= window.location.pathname.replace(/\/$/, ''); /* remove optional end / */ 
var urlCopy =url
// var urlNoteType = url.substr(url.lastIndexOf('/') + 1);
var splitSlashUrl = urlCopy.split("/")
var urlNotePreselect = splitSlashUrl[splitSlashUrl.length-2] 
var urlNoteType = splitSlashUrl[splitSlashUrl.length-1]  //urlLastSeg
var urlStartArr = splitSlashUrl.slice(0, splitSlashUrl.length-2);
var urlStart = urlStartArr.join('')

// console.log("splitSlashUrl:  "+ splitSlashUrl + splitSlashUrl[] )
console.log("urlNoteType:  "+ urlNoteType )
console.log("urlStart:  "+ urlStart )


// AJAX CALL(S) ================================================================

var getInfo = function(idx){
    console.log("this call started    "+ window.location.pathname+"/searchClicked" )
    var data_to_save = {"noteIdx": idx};      
    $.ajax({
        type: "POST",
        url: window.location.pathname+"/searchClicked",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            // var sales = result["sales"]
            // noteNames=
            noteInformation = result["clickedInfo"]
            console.log("this call succeeded")
            console.log(noteInformation)
            $("#nName").html(noteInformation[0]).addClass("vertlesson textCenter noteDefName")
            // dottedImg1="<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> "

            //DON'T DELETE THIS FOR REFERENCE AND FUTURE DEVELOPMENT
            // tooltipDiv1=    "<div class= 'tooltips'>"
            // tooltipDiv2=        "<span class='tooltiptext-bottom'>"//+noteInformation[9][1][0]+"="+noteInformation[9][1][2]+
            // tooltipDiv3=        "</span>"+
            //                 "</div>"

            // var tooltipMsg = ""

            if (urlNoteType == "dotted"){
                // tooltipMsg=
                mathButton = "&nbsp;&nbsp;" + "<div class='prompt'><div class= 'defButton'><button id='showMath' class='showMathButton greyFont'>?</button></div><span id='noteDef' class= 'hide qPrompt'></span></div>"
                // mathDef= "<div class= 'hide'>"+noteInformation[7]+"</div>"
                // mathDef= "<div id='mathDef' class= 'centeredContainer vertCenter noteNumVal' >" +noteInformation[7]+"</div>";
                
                console.log("note info: ", noteInformation[9][0])
                
                noteMathLinkEndTag1 = "</a>"
                noteMathLinkEndTag2 = noteMathLinkEndTag1

                if (noteInformation[9][0][3] == -1 ){
                    noteMathLinkTag1= ""
                    noteMathLinkEndTag1 = ""
                }
                else{
                    noteMathLinkTag1= "<a id='noteMathLink1' href='"+ window.location.protocol + "//" + window.location.host + "/" +urlStart+"/"+noteInformation[9][0][3]+"/"+noteInformation[9][0][4]+"'>"
                }
                if (noteInformation[9][1][3] == -1 ){
                    noteMathLinkTag2= ""
                    noteMathLinkEndTag2 = ""
                }
                else{
                    noteMathLinkTag2= "<a id='noteMathLink2' href='"+ window.location.protocol + "//" + window.location.host + "/" +urlStart+"/"+noteInformation[9][1][3]+"/"+noteInformation[9][1][4]+"'>"
                }

                // ---- render all the note information
                $("#nNameImg").html("<div class= 'centeredContainer  vertCenterFD-row noteNumVal'>"+
                                        // "<div class='inlineBlock' >" +
                                        "<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDesc noteImg\" alt='"+ noteInformation[0] + "'/> "+
                                        "<div class= 'inlineBlock' > &nbsp; = &nbsp;</div>"+ 
                                        // "<div id='noteMathImgs' class='inlineBlock' >" +"<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> "+ "</div>" + 
                                        "<div id='noteMathImgs' class='inlineBlock' >" + "</div>" + 
                                        "<div id='noteMathNumeric' class='inlineBlock' >" +noteInformation[3] + "</div>" + 

                                        // "<button class='changeNoteMath' ><div class= 'tooltips'><a href='/lessons'>"+
                                        //     "<img src= \""+ noteInformation[9][0][1] +"\" id='noteMathImg1' class=\"noteImgDescSmall noteImg hide\" />" +
                                        //     "<span class='tooltiptext-top'>"+noteInformation[9][0][0]+"=val</span>"+
                                        // "</a></div></button>"+
                                        "<div id='noteMathButton1' class= 'tooltips noteMathButton'>"+
                                            // "<a href='"+ (splitSlashUrl.slice(0, splitSlashUrl.length-2)).join('ad')+"2"+"/dotted"+"'>"+
                                            noteMathLinkTag1+
                                            // "<a id='noteMathLink1' href='"+ window.location.protocol + "//" + window.location.host + "/" +urlStart+"/"+noteInformation[9][0][3]+"/"+noteInformation[9][0][4]+"'>"+
                                                "<img src= \""+ noteInformation[9][0][1] +"\" id='noteMathImg1' class=\"noteImgDescSmall noteImg hide\" alt='"+ noteInformation[9][0][0]+ "' />" +
                                                "<span class='tooltiptext-bottom'>"+noteInformation[9][0][0]+"="+noteInformation[9][0][2]+"</span>"+
                                            noteMathLinkEndTag1+
                                            // "</a>"+
                                        "</div>"+
                                        "<div id='noteMathAdd' class='hide' > &nbsp; + &nbsp; </div>"+
                                        "<div id='noteMathButton2' class= 'tooltips noteMathButton'>"+
                                            noteMathLinkTag2+
                                            // "<a id='noteMathLink2' href='"+ window.location.protocol + "//" + window.location.host + "/" +urlStart+"/"+noteInformation[9][1][3]+"/"+noteInformation[9][1][4]+"'>"+
                                            // "<a href='/lessons'>"+
                                                "<img src= \""+ noteInformation[9][1][1] +"\" id='noteMathImg2' class=\"noteImgDescSmall noteImg hide\" alt='"+ noteInformation[9][1][0]+ "'/>" +
                                                "<span class='tooltiptext-bottom'>"+noteInformation[9][1][0]+"="+noteInformation[9][1][2]+"</span>"+
                                            noteMathLinkEndTag2+
                                            // "</a>"+
                                        "</div>"+

                                        // "<div id='noteImgNumeric' class='inlineBlock'>"+
                                        //     "<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDesc noteImg inlineBlock\" /> "+ 
                                        // "</div>"+
                                        // "<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDesc noteImg\" /> "+
                                        mathButton + 
                                        // "</div>"+
                                    "</div>");
                // if ($("#noteMathButton1").attr())

                // dottedImg1="<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> "
                // $("#noteMathImg").html(dottedImg1)

                // "<div class= 'centeredContainer vertCenter noteNumVal' >" + mathDef + "</div>"
                // $("#nMath").html("<div class= 'centeredContainer vertCenter noteNumVal hide' >" + mathDef + "</div>" )
                // $("#nMath").html(mathDef)
                $("#nMath").html("<span class='whiteFont'>"+noteInformation[10] +"</span>&nbsp; <span class='mathFontSize'>"+ noteInformation[3] + "</span>")
                $("#nMath").addClass("hide");
            }
            else{
                $("#nNameImg").html("<div class= 'centeredContainer vertCenterFD-row noteNumVal' ><img src= \""+ noteInformation[1] +"\"   class=\"noteImgDesc noteImg\" /> &nbsp; = &nbsp;"+ "<div >" + noteInformation[3] +  "</div>" + "</div>");
            }
            // $("#mathDef").addClass("hide")
            // $("#nNameDesc").html("<div class= 'centeredContainer textCenter' > = "+ noteInformation[3] +"</div>")
            $("#infoContainer").removeClass("hide").addClass("show");
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

var loadInfo = function(currNote ){
    $("#videoContainer").removeClass("hide").addClass("centeredContainer ")
    $("#contentContainer").removeClass("vertCenterFD-column")
    console.log ("linked");
    // $("#viewer").attr("src","https://www.youtube.com/embed/KLYM7pCGRNk");
    $("#viewer").removeClass("invisible").addClass("visible");
    $("#viewer").attr("src", $(this).attr("link")+"&mute=0"); //google policies only allow unmuted autoplay if they've clicked on the page before the video is loaded (ie, not by typing into the search bar. If you set it to not be muted like above, it will automatically disable the autoplay.)
    console.log("currentvideolink:  "+ $(this).attr("link"))
    currentNote= parseInt($(this).attr("noteIdx"));
    console.log("currentnote: " + currentNote);
    // currentNote= window.buttonName[parseInt($(this).attr("noteIdx"))];
    // console.log("currentnote1: " + currentNote);
    getInfo($(this).attr("noteIdx"));
}

// MAIN FUNCTION ===============================================================

$(document).ready(function(){
    
    console.log("url path loc: " + urlNoteType)
    console.log ("linkedas");
    console.log(currentNote);
    console.log("the test:" + window.test);

    // ---- render the next and last buttons and the progress bar's numberic progress based on the content
    if (urlNoteType == "note"){
        $("#nextButton").html("<a href=\"/lessons/lesson/rest\"> <button class= \"dirButton\" >  Learn Rests &gt;  </button></a>");
        // $("#loaderBar").css("background-color", "red")
        
        $(".dottedButton").addClass("hide");
        $("#noteTitle").html("Music Notes: ")
        $("#noteDef").html("Notation for how long a pitch is played")

        loaderFillingPercent = (1/3) *100;
        $("#loaderBar").css("width", loaderFillingPercent+"%")

    }
    else if (urlNoteType == "rest"){
        $("#lastButton").html("<a href=\"/lessons/lesson/note\"> <button class= \"dirButton\" > &lt; Review Music Notes  </button></a>");
        $("#nextButton").html("<a href=\"/lessons/lesson/dotted\"> <button class= \"dirButton\" >  Learn Dotted Notes & Rests &gt;  </button></a>");

        $(".dottedButton").addClass("hide");
        $("#noteTitle").html("Rests: ")
        $("#noteDef").html("Notation for how long to remain silent")

        loaderFillingPercent = (2/3) *100;
        $("#loaderBar").css("width", loaderFillingPercent+"%")
    }
    else if (urlNoteType == "dotted"){
        $("#lastButton").html("<a href=\"/lessons/lesson/rest\"> <button class= \"dirButton\" > &lt; Review Rests  </button></a>");
        $("#nextButton").html("<a href=\"/test\"> <button class= \"goTestButton dirButton\" >  Take the Test! &gt;   </button></a>");

        $("#noteTitle").html("Dotted Notes & Rests: ")
        $("#noteDef").html("A note or rest who's <br> length = the base note + half the length of the base")
        $("#noteDef").css("font-size", "1.5rem")//.css("vertical-align", "middle")//.css("vertical-align", "bottom")
        
        loaderFillingPercent = (3/3) *100;
        $("#loaderBar").css("width", loaderFillingPercent+"%")
    }

    if (urlNotePreselect != "lesson"){
        console.log("we're not in a generic lesson   : " + "buttonOp"+urlNotePreselect)
        // $("#buttonOp"+urlNotePreselect).click();
        // $(".changeNote").click();
        console.log ("linked");
        // $("#viewer").attr("src","https://www.youtube.com/embed/KLYM7pCGRNk");
        $("#buttonOp"+urlNotePreselect).click();
        loadInfo.call($("#buttonOp"+urlNotePreselect) ); 
        // loadInfo.call($("#buttonOp"+urlNotePreselect), urlNotePreselect ); 
    }

    // ---- When you click an new note
    $(".changeNote").on("click", function(){
        console.log("change note clicked")
        $(".changeNote").find('div').find('img').removeClass("activeNoteImgBorder")
        $(this).find('div').find('img').addClass("activeNoteImgBorder")
        $("#nMath").removeClass("centeredContainer vertCenterFD-row noteNumVal").addClass("hide")
        loadInfo.call(this);    
    })

    $("#showDef").on("click", function(){
        console.log ("linked");
        $("#showDef").addClass("hide");
        $("#noteDef").removeClass("hide").addClass("show")
    })

    $("#nNameImg").on("click", "#showMath", function(){
        console.log ("linked");
        // dottedImg1= "<img src=\" "+  noteInformation[1] +"\"   class=\"noteImgDesc noteImg displayBlock\" />"
        // dottedImg1="<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> "

        // dottedImg1="<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> + "+ "<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" />"

        // dottedImg2="<img src= \""+ noteInformation[1] +"\"   class=\"noteImgDescSmall noteImg inlineBlock\" /> "
        // $("#noteMathImgs").html(dottedImg1 )

        // $("#noteMathImgs").html(dottedImg1 + " + " + dottedImg2)

        // $("#noteImgNumeric").html(dottedImg1)
        // "<div id='noteImgNumeric' >" +noteInformation[3] + "</div>" 

        $("#noteMathImg1").removeClass("hide").addClass("inlineBlock")
        $("#noteMathAdd").removeClass("hide").addClass("inlineBlock")
        $("#noteMathImg2").removeClass("hide").addClass("inlineBlock")

        $("#showMath").addClass("hide");
        $("#noteMathNumeric").css("display","none")//.html("asdf")//.addClass("hide")

        $("#nMath").removeClass("hide").addClass("centeredContainer vertCenterFD-row noteNumVal")
    })
})

