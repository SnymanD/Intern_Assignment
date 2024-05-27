from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/survey_db.surveys')
db = client['survey_db']
surveys = db['surveys']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/submit', methods=['POST'])
def submit_survey():
    try:
        data = request.json
        surveys.insert_one(data)
        return jsonify({"message": "Survey submitted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/results', methods=['GET'])
def get_results():
    try:
        survey_count = surveys.count_documents({})
        if survey_count == 0:
            return jsonify({"message": "No Surveys Available."})

        survey_data = list(surveys.find({}))

        total_age = sum([(datetime.now().year - int(survey['dob'][:4])) for survey in survey_data])
        average_age = total_age / survey_count
        max_age = max([(datetime.now().year - int(survey['dob'][:4])) for survey in survey_data])
        min_age = min([(datetime.now().year - int(survey['dob'][:4])) for survey in survey_data])

        favorite_foods = [survey['favoriteFood'] for survey in survey_data]
        percentage_pizza = (favorite_foods.count('Pizza') / survey_count) * 100
        percentage_pasta = (favorite_foods.count('Pasta') / survey_count) * 100
        percentage_pap_and_wors = (favorite_foods.count('Pap and Wors') / survey_count) * 100

        def average_rating(category):
            return sum([int(survey['ratings'][category]) for survey in survey_data]) / survey_count

        average_movies = average_rating('movies')
        average_radio = average_rating('radio')
        average_eat_out = average_rating('eatOut')
        average_tv = average_rating('tv')

        return jsonify({
            "total_surveys": survey_count,
            "average_age": average_age,
            "max_age": max_age,
            "min_age": min_age,
            "percentage_pizza": percentage_pizza,
            "percentage_pasta": percentage_pasta,
            "percentage_pap_and_wors": percentage_pap_and_wors,
            "average_movies": average_movies,
            "average_radio": average_radio,
            "average_eat_out": average_eat_out,
            "average_tv": average_tv
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
