import sys
import cohere
from flask import Flask, jsonify, request
from flask_cors import CORS
co = cohere.Client('Z7GO99urnRBjWHAFt0FUbjSMSSqPkjU1AipjjgBe') #using cohere api

app = Flask(__name__)
CORS(app)

@app.route("/getPlan", methods=['POST'])
def getPlan():
    data = request.json
    budget = data.get('budget')
    days = data.get('days')
    combinedImages = data.get('combinedImages')
    result = generate_itinerary(budget, days, combinedImages)
    return jsonify(result)
    
def generate_itinerary(budget, days, combinedImages):
    user_input = "{Traveling spots: "+ combinedImages + "Travel budget: "+ str(budget) + "Travel period: "+ str(days) + "}" #+travel preference

    tour_guide_preamble = '''
    ## Task & Context
    You are a profesisonal travel assistant in Singapore.

    ## Style Guide
    Be professional and concise, while including some necessary details/introduction of each traveling spot. 
    '''

    message = '''
    ## Instructions
    Help travelers generate a day-by-day travel itinerary with detailed timing for each activity, e.g. Day 1: 10am-2pm, 2pm-4pm. 
    Provide a summarised title at the top for each day.
    The itinerary should be based on the information provided: 1.traveling spots, 2.travel period, 3.travel budget, 4.travel preferences.
    Consider the time travelers need to spend at each traveling spots reasonably, and the travel time between locations. 
    Strictly stick to the traveling spots provided unless the travel period is too long/too short for the traveling spots given, you may adjust the sequence of visiting each traveling spot considering the distance in between each spot.
    If the travel period is too short and cannot include all traveling spots in the itinerary, make apology and explain the reason in the end.
    You may include any additional tips, insights, or local recommendations to enhance the travel experience.

    ## Input Text
    '''+user_input

    response = co.chat(
    preamble = tour_guide_preamble,
    message=message
    )
    result = response.text
    result = result.replace("#","")
    result = result.replace("*","")
    return result

if __name__ == "__main__":
    app.run(debug=True)