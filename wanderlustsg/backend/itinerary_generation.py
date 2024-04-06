import sys
import cohere
co = cohere.Client('Z7GO99urnRBjWHAFt0FUbjSMSSqPkjU1AipjjgBe') #using cohere api

def generate_itinerary(budget, days, combinedImages):
    user_input = "{Traveling spots: "+ combinedImages + "Travel budget: "+ budget + "Travel period: "+ days + "}" #+travel preference

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
    return result

budget = sys.argv[1]
days = sys.argv[2]
combinedImages = sys.argv[3]

result = generate_itinerary(budget, days, combinedImages)
print(result)