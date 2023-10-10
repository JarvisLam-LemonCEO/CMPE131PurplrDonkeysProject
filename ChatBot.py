import sys
import json
import re
import random

#add a joke function, date function, hobby, -> random like
def randomResponse():
    randomResponses = [
        "Please try writing something more descriptive.",
        "Oh! It appears you wrote something I don't understand yet",
        "Do you mind trying to rephrase that?",
        "I'm terribly sorry, I didn't quite catch that.",
        "I can't answer that yet, please try asking something else.",
        "My master didn't implement that feature yet, Sorry.",
        "I don't understand what you just said",
        "I'm going to need more information about that"
    ]

    randomResponseIndex = random.randrange(len(randomResponses))
    return randomResponses[randomResponseIndex]

def joke():
    jokes = [
        "I invented a new work. Plagarism!",
        "Why do we tell actors to break a leg? Because every movie has a cast",
        "Did you hear about the claustrophobic astronaut? He just need a little space"
    ]

    randomJokeIndex = random.randrange(len(jokes))
    return jokes[randomJokeIndex]

def like(input, isQuestion):
    choice = random.randint(0, 1)
    inputArr = input.split()
    subjectStart = 0
    for i in range(len(inputArr)):
        if (inputArr[i] == "like" or inputArr[i] == "enjoy"):
            subjectStart = i+1
            break
    out = ""
    for i in range(subjectStart, len(inputArr)):
        out+=inputArr[i] + " "

    temp = ""
    if (isQuestion): 
        if (choice == 0): 
            temp = "No, I don't like "
        else: 
            temp = "Yeah, I like "
    else:
        if (choice == 0):
            temp = "Hmm, I don't like "
        else:
            temp = "I also like "
    out = re.sub('[^A-Za-z0-9\s]+', '',out) #filter out special characters
    out = temp + out
    return out
            
#in json file, switch to camel case, get rid of type, maybe add an or_words field, where things can be this or that to by pass required

#also, make users pay after a month. the whole shtick is build a bot
#save preference, and on login, get the preferences from db, call a function and make a map with thing->like_value
# Load JSON data


# Store JSON data

responses = ""

with open("BotResponses.json") as botResponses:
    #print("loaded bot responses successfully")
    responses = json.load(botResponses)   #just responses

def getResponse(input):  #just input
    

    if (input == ""):
        return "Please type something so we can chat :("
    
    humanMessage = re.split(r'\s+|[,;?!.-]\s*', input.lower()) 
    bestScore = -999999
    bestResponse = ""

    for response in responses:  
        responseScore = 0
        requiredScore = 0
        orScore = 0
        requiredWords = response["requiredWords"]
        orWords = response["orWords"]

        if (requiredWords):
            for word in humanMessage:
                if word in requiredWords:
                    requiredScore += 1
        
        if (orWords):
            orScore = -1
            for word in humanMessage:
                if word in orWords:
                    orScore = 1
                    break
        
        if (requiredScore == len(requiredWords) and orScore != -1):   
            for word in humanMessage:
                if word in response["userInput"]:
                    responseScore += 1

        if (responseScore > bestScore):
            bestScore = responseScore
            bestResponse = response["botResponse"]
    
    
    if (bestResponse == "joke"):
        return joke()
    if (bestResponse == "likeQuestion"):
        return like(input, True)
    if (bestResponse == "likeStatement"):
        return like(input, False)
    if (bestScore != 0):
        return bestResponse

    return randomResponse()
    
print(getResponse(str(sys.argv[1])))