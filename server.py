# Author: Caroline Hoang
# Server Code for site in python
#
# [UI Design Final Project] 
#####---------------------------------------------------------------------------
#####
#####---------------------------------------------------------------------------
##### Imports:
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect
app = Flask(__name__)

#####---------------------------------------------------------------------------
##### Json file imports:
import json

with open('./json/lessonInfo.json') as f2:
    lInfo = json.load(f2)

with open('./json/testQuestions.json') as f3:
    tInfo = json.load(f3)

with open('./json/resultsMsg.json') as f4:
    rInfo = json.load(f4)

#####---------------------------------------------------------------------------
##### Variables:

noteDesc = lInfo
testQs = tInfo
results = rInfo

currentTestScore=0 

questionStatus=[-1,-1,-1,-1,-1,-1,-1,-1 ]

#####---------------------------------------------------------------------------
##### Routes:


# Homepage found when we open to the base url
@app.route('/', methods=['GET', 'POST'])
def home():
   return render_template('homepage.html')


#Page from which you can choose into a lesson to learn
@app.route('/lessons', methods=['GET', 'POST'])
def lessonDirectory():
   return render_template('lessondir.html')

#Alternate url for the Page from which you can choose into a lesson to learn
@app.route('/lessons/lesson', methods=['GET', 'POST'])
def lesson():
   return render_template('lessondir.html')

#Lesson page of a particular note for redirects in test
@app.route('/lessons/<lessonNum>/<lessonType>', methods=['GET', 'POST'])
def lessonT(lessonType = "", lessonNum="lesson"):
    if (lessonType=="note"):
        dataArray = noteDesc[0]["noteInfo"]
    elif (lessonType=="rest"):
        dataArray = noteDesc[0]["restInfo"]
    elif (lessonType=="dotted"):
        dataArray = noteDesc[0]["dotInfo"]
    else:
        dataArray = noteDesc[0]["noteInfo"]
    return render_template('lesson.html' , dataArray = dataArray)

#route to search for info on clicked note in lesson
@app.route('/lessons/<lessonNum>/<lessonType>/searchClicked', methods=['GET', 'POST'])
def searchClicked(lessonType= "" , lessonNum= "lesson"):
    global  noteDesc
    json_data = request.get_json()   
    noteIdx= int(json_data["noteIdx"] )
    ntype = ""
    if lessonType == "note":
        ntype= "noteInfo"
    elif lessonType == "rest":
        ntype= "restInfo"
    elif lessonType == "dotted":
        ntype= "dotInfo"
    result = noteDesc[0][ntype][noteIdx]
    return jsonify( clickedInfo= result)

#route for an intro to starting the test
@app.route('/test', methods=['GET', 'POST'])
def testStart():
   return render_template('testInstruction.html')

#route for an particular problem in test
@app.route('/test/<qnum>', methods=['GET', 'POST'])
def testProblem(qnum=0):
    global testQs
    qnumInt = int(qnum)
    questionJSON = testQs[qnumInt-1]
    optionArr= questionJSON["options"]
    question = questionJSON["answerInfo"][0]
    questButtons = []
    for opt in optionArr:
        if opt<5:
            quest = noteDesc[0]["noteInfo"][opt]
        elif opt<10:
            quest = noteDesc[0]["restInfo"][(opt-5)]
        else:
            quest = noteDesc[0]["dotInfo"][(opt-10)]
        questButtons.append(quest)
    return render_template('testProblem.html', questionJSON = questionJSON , questButtons = questButtons )

#route to get problem info for the problem
@app.route('/test/<qnum>/getProblemInfo', methods=['GET', 'POST'])
def getProblemInfo(qnum=0):
    global testQs
    json_data = request.get_json() 
    problemNum= int(json_data["problemNum"])
    qnumInt = int(qnum)
    questionJSON = testQs[qnumInt-1]
    return jsonify( problemInfo = questionJSON )

#route from which to increment or zero out the score
@app.route('/updateScore', methods=['GET', 'POST'])
def updateScore():
    global currentTestScore
    json_data = request.get_json() 
    clear= bool(json_data["clearData"])
    problemNum = int(json_data["problemNum"])
    if (clear):
        currentTestScore =0
    else:
        currentTestScore += 1  
    return jsonify( currentScore= currentTestScore )
    
#route to determine if we are allowing the user to score based on 'codes' passed
@app.route('/scorable', methods=['GET', 'POST'])
def scorPossibility():
    # __________________________________
    #|key:   [don't skip!]              |
    #|----------------------------------|
    #|-4 = clearall                     |
    #|-3 =                              |
    #|-2 = non-default indeterminate    |
    #|-1 = default indeterminate        |
    #|skip:                             |
    #| 0 = wrong                        |
    #| 1 = correct                      |
    #| 2 = correct after-correction     |
    #|__________________________________|

    global questionStatus
    json_data = request.get_json() 
    # print("boolNum: " ,json_data["boolNum"])
    boolNum= int(json_data["boolNum"])
    problemNum= int(json_data["problemNum"])
    # for x in range(0,len(questionStatus)):
    #      questionStatus[x]=-3
    # print("----INDEX:  " , problemNum, len(questionStatus))
    if (problemNum< (len(questionStatus)+1)):
        # print("----INDEX:  " , problemNum, len(questionStatus))
        currStatus = questionStatus[problemNum-1]
        if (boolNum == -4):
            # print("We are Clearing!  ")
            for x in range(0,len(questionStatus)):
                questionStatus[x]=-1
            # print("QUESTION STATUS:  " , questionStatus)
        else:
            if (currStatus == -1):
                if (boolNum == 1):
                    questionStatus[problemNum-1] = 1
                elif (boolNum == 0):
                    questionStatus[problemNum-1] = 0
            elif (currStatus == -2 or currStatus == -1):
                if (boolNum == -2):
                    questionStatus[problemNum-1] = -2
                else:
                    pass
            elif (currStatus == 0 and boolNum== 2):
                questionStatus[problemNum-1] = 2
        return jsonify( scorable= (questionStatus[problemNum-1]==-1 or questionStatus[problemNum-1]==-2 ) , scorableStat = questionStatus[problemNum-1])
    else:
        for x in range(0,len(questionStatus)):
            questionStatus[x]=-1
        return jsonify( scorable= True , scorableStat = {})

#route to get the current score
@app.route('/getScore', methods=['GET', 'POST'])
def getScore():
    global currentTestScore
    return jsonify( finalScore= currentTestScore)

#route to get resutls messagess based on current score
@app.route('/test/results', methods=['GET', 'POST'])
def testResults():
    global currentTestScore, results
    resultMsg=""
    if (currentTestScore<= 8*.65):
        resultMsg=results[0]["poorResult"]
    elif (currentTestScore> 8*.65 and currentTestScore<= (8-1)):
        resultMsg=results[0]["goodResult"]
    elif (currentTestScore== 8):
        resultMsg=results[0]["perfectResult"]
    return render_template('testResults.html', finalScore= currentTestScore, resultMsg=resultMsg)


if __name__ == '__main__':
   app.run(debug = True)




