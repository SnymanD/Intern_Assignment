// scripts.js
document.getElementById('fill-out-survey').addEventListener('click', () => {
    document.getElementById('survey-form').style.display = 'block';
    document.getElementById('survey-results').style.display = 'none';
});

document.getElementById('view-survey-results').addEventListener('click', async () => {
    document.getElementById('survey-form').style.display = 'none';
    document.getElementById('survey-results').style.display = 'block';
    
    const response = await fetch('/api/results');
    const data = await response.json();
    if (data.message) {
        document.getElementById('results-container').innerText = data.message;
    } else {
        document.getElementById('results-container').innerText = `
Total number of surveys: ${data.total_surveys}
Average Age: ${data.average_age}
Oldest person who participated in survey: ${data.max_age}
Youngest person who participated in survey: ${data.min_age}
Percentage of people who like Pizza: ${data.percentage_pizza}%
Percentage of people who like Pasta: ${data.percentage_pasta}%
Percentage of people who like Pap and Wors: ${data.percentage_pap_and_wors}%

Average ratings:
- I like to watch movies: ${data.average_movies}
- I like to listen to radio: ${data.average_radio}
- I like to eat out: ${data.average_eat_out}
- I like to watch TV: ${data.average_tv}
        `;
    }
});

document.getElementById('submit').addEventListener('click', async () => {
    const fullNames = document.getElementById('full-names').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('date-of-birth').value;
    const contactNumber = document.getElementById('contact-number').value;
    const favoriteFood = document.querySelector('input[name="favorite-food"]:checked').value;
    
    const movies = document.querySelector('input[name="movies"]:checked').value;
    const radio = document.querySelector('input[name="radio"]:checked').value;
    const eatOut = document.querySelector('input[name="eat-out"]:checked').value;
    const tv = document.querySelector('input[name="tv"]:checked').value;

    const surveyData = {
        fullNames,
        email,
        dob,
        contactNumber,
        favoriteFood,
        ratings: {
            movies,
            radio,
            eatOut,
            tv
        }
    };

    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyData)
    });

    if (response.ok) {
        alert('Survey submitted successfully!');
        document.getElementById('survey-form').reset();
    } else {
        alert('Failed to submit survey.');
    }
});
