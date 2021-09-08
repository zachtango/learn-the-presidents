/*
    CREATING A TEST FILE
    Create a JSON file with one object w/ properties: skillId, locale, type, and userInput (COPY FROM EXAMPLE)
    userInput is an array of strings, in the sequence of your input to Alexa
    Example below VVVVVV


    TESTING A TEST FILE
    ask dialog -r <insert test file path>
*/
{
    "skillId": "amzn1.ask.skill.24dd30e9-1314-44f7-9084-34b188c1ca91", 
    "locale": "en-US",
    "type": "text",
    "userInput": [
        "ask learn the presidents I want to take the hard test",
        "george washington",
        "john adams",
        "thomas jefferson",
        "joe biden",
        "donald trump",
        "donald trump",
        "donald trump",
        ".quit" // IF u want ask dialog to quit automatically (it will stay open if .quit isn't present)
    ]
}