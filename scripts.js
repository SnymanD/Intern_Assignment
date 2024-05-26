document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.ratings = {
        movies: formData.get('ratings[movies]'),
        radio: formData.get('ratings[radio]'),
        eat_out: formData.get('ratings[eat_out]'),
        tv: formData.get('ratings[tv]')
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            alert('Failed to submit survey.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Check console for details.');
    }
});

async function fetchResults() {
    try {
        const response = await fetch('/api/results');
        const data = await response.json();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchResults);

