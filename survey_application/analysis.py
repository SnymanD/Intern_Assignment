# analysis.py
import pandas as pd
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.surveyDB
collection = db.surveys

data = pd.DataFrame(list(collection.find()))

total_surveys = len(data)
if total_surveys > 0:
    average_age = (pd.Timestamp.now() - pd.to_datetime(data['dateOfBirth'])).astype('<m8[Y]').mean()
    oldest_person = (pd.Timestamp.now() - pd.to_datetime(data['dateOfBirth'])).astype('<m8[Y]').max()
    youngest_person = (pd.Timestamp.now() - pd.to_datetime(data['dateOfBirth'])).astype('<m8[Y]').min()

    percentage_likes_pizza = (data['favoriteFood'].apply(lambda x: 'Pizza' in x).mean()) * 100
    percentage_likes_pasta = (data['favoriteFood'].apply(lambda x: 'Pasta' in x).mean()) * 100
    percentage_likes_pap_and_wors = (data['favoriteFood'].apply(lambda x: 'Pap and Wors' in x).mean()) * 100

    average_watch_movies = data['watchMovies'].mean()
    average_listen_to_radio = data['listenToRadio'].mean()
    average_eat_out = data['eatOut'].mean()
    average_watch_tv = data['watchTV'].mean()

    results = {
        "total_surveys": total_surveys,
        "average_age": round(average_age, 1),
        "oldest_person": round(oldest_person, 1),
        "youngest_person": round(youngest_person, 1),
        "percentage_likes_pizza": round(percentage_likes_pizza, 1),
        "percentage_likes_pasta": round(percentage_likes_pasta, 1),
        "percentage_likes_pap_and_wors": round(percentage_likes_pap_and_wors, 1),
        "average_watch_movies": round(average_watch_movies, 1),
        "average_listen_to_radio": round(average_listen_to_radio, 1),
        "average_eat_out": round(average_eat_out, 1),
        "average_watch_tv": round(average_watch_tv, 1),
    }
else:
    results = {}

print(results)

