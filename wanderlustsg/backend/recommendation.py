import pandas as pd
from flask import Flask, jsonify, request, send_file
import os
import json
import base64

app = Flask(__name__)

@app.route("/<folder_path>")
def load_xlsx_files(folder_path):
    # folder_path = './CS5224'
    dataframes = {}
    # Iterate over each file in the folder
    for filename in os.listdir(folder_path):
        # Check if the file is an Excel file
        if filename.endswith(".xlsx"):
            # Construct the full path to the file
            file_path = os.path.join(folder_path, filename)
            # Read the Excel file into a DataFrame
            df = pd.read_excel(file_path)
            # Add the DataFrame to the dictionary with the file name as the key
            dataframes[filename] = df
    df_hotel = dataframes['20_hotels.xlsx']
    df_sightsee = dataframes['20_sightsee.xlsx']
    df_rest = dataframes['20_restuarants.xlsx']
    df_shop = dataframes['20_shopping.xlsx']
    return df_hotel, df_sightsee, df_rest, df_shop


@app.route("/reco/<input_json>")
def recommend_food_and_preference(input_json, top_n=5):
    print("------------------------Initiated call to backend---------------------------------")
    input_data = json.loads(input_json)
    folder_path = './CS5224'

    food_mapping = {
        0: "Chinese",
        1: "Japanese",
        2: "Indian" ,
        3: "Malay",
        4: "Thailand",
        5: "Vietnam",
        6: "Singapore",
        7: "Western",
        8: "Others"
    }
    preference_mapping = {
        0: "Culture",
        1: "City Walk",
        2: "Shopping" ,
        3: "Natural View",
        4: "History",
        5: "Educational",
        6: "Local View",
        7: "Amuzement Park",
        8: "Landmark"
    }
    hotel, sightsee, rest, shop = load_xlsx_files(folder_path)
    
    #FOOD RECO
    code_list = input_data['food']
    cuisine_pref = [food_mapping[code] for code in code_list if code in food_mapping]
    # Filter restaurants DataFrame based on selected cuisine(s)

    filtered_results = pd.DataFrame()
    for cuisine_type in cuisine_pref:
        filtered_df = rest[rest['Cuisine'].str.contains(cuisine_type, case=False, na=False)]
        filtered_results = pd.concat([filtered_results, filtered_df])

    # Sort filtered DataFrame by price and score
    sorted_df_rest = filtered_results.sort_values(by=['Price', 'Score'], ascending=[True, False])

    # Get the top N recommended restaurants
    top_restaurants = sorted_df_rest.head(top_n)

    #SHOP / SIGHTSEE RECO
    shopping_results = pd.DataFrame()
    code_shop = input_data['preference']
    shop_pref = [preference_mapping[code] for code in code_shop if code in preference_mapping]
    # Filter restaurants DataFrame based on selected cuisine(s)
    
    #if interested in shopping: 
    if 'Shopping' in shop_pref:
        shop_df = shop.sort_values(by=['Rating'], ascending=[False])
        top_shop = shop_df.head(top_n)
        shopping_results = pd.concat([shopping_results, top_shop])
    
    for pref in code_shop:
        filtered_df = sightsee[sightsee['Preference Map'] == pref]
        shopping_results = pd.concat([shopping_results, filtered_df])
        
    # Sort filtered DataFrame by price and score
    sorted_shopping_results = shopping_results.sort_values(by=['Rating'], ascending=[False])
    # Get the top N recommended restaurants
    top_shopping = sorted_shopping_results.head(top_n)
    top_restaurants_json = top_restaurants.to_json()
    top_shopping_json = top_shopping.to_json(orient='records')

    print("------------------------------------")
    print(top_restaurants.keys())
    print("------------------------------------")

    # working
    # return jsonify({'top_restaurants': json.loads(top_restaurants_json), 
    #                 'top_shopping': json.loads(top_shopping_json), "image_data": encoded_string})

    return jsonify({'top_restaurants': json.loads(top_restaurants_json), 
                    'top_shopping': json.loads(top_shopping_json)})



if __name__ == "__main__":
    app.run(debug=True)

# {"food": [0,1], "preference": [2,4]}


# 1-10 rest
# 11-20 landscape
# 21-30 shopping 
# 31-40 hotel 
# 41-50 hotel
# 51-60 restaurant
# 61-70 landscape 
# 71-80 shopping

# 1-20 restaurants
# 21-40 hotels
# 41-60 landscape
# 61-80 shopping