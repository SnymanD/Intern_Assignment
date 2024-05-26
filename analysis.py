from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from datetime import datetime

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.survey_db
surveys = db.surveys

@app.route('/api/submit', methods=['POST'])
def submit_survey():
    data = request.get_json()
    data['dob'] = datetime.strptime(data['dob'], '%Y-%m-%d')
    surveys.insert_one(data)
    return jsonify({'message': 'Survey submitted successfully!'}), 201

@app.route('/api/results', methods=['GET'])
def get_results():
    survey_count = surveys.count_documents({})
    if survey_count == 0:
        return jsonify({'message': 'No Surveys Available'}), 200

    all_surveys = list(surveys.find())
    
    ages = [(datetime.now() - s['dob']).days // 365 for s in all_surveys]
    avg_age = sum(ages) / survey_count
    max_age = max(ages)
    min_age = min(ages)
    
    favorite_foods = [s['favoriteFood'] for s in all_surveys]
    percentage_pizza = (favorite_foods.count('Pizza') / survey_count) * 100
    percentage_pasta = (favorite_foods.count('Pasta') / survey_count) * 100
    percentage_pap_and_wors = (favorite_foods.count('Pap and Wors') / survey_count) * 100
    
    def average_rating(category):
        return sum(int(s['ratings'][category]) for s in all_surveys) / survey_count
    
    data = {
        'total_surveys': survey_count,
        'average_age': avg_age,
        'max_age': max_age,
        'min_age': min_age,
        'percentage_pizza': percentage_pizza,
        'percentage_pasta': percentage_pasta,
        'percentage_pap_and_wors': percentage_pap_and_wors,
        'average_movies': average_rating('movies'),
        'average_radio': average_rating('radio'),
        'average_eat_out': average_rating('eat_out'),
        'average_tv': average_rating('tv')
    }
    
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
