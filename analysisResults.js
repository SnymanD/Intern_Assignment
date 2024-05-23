// AnalysisResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalysisResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/analyze');
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analysis results', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!results || Object.keys(results).length === 0) return <div>No Surveys Available.</div>;

  return (
    <div>
      <h2>Survey Results</h2>
      <p>Total number of surveys: {results.total_surveys}</p>
      <p>Average Age: {results.average_age}</p>
      <p>Oldest person who participated in survey: {results.oldest_person}</p>
      <p>Youngest person who participated in survey: {results.youngest_person}</p>
      <p>Percentage of people who like Pizza: {results.percentage_likes_pizza}%</p>
      <p>Percentage of people who like Pasta: {results.percentage_likes_pasta}%</p>
      <p>Percentage of people who like Pap and Wors: {results.percentage_likes_pap_and_wors}%</p>
      <p>People who like to watch movies: {results.average_watch_movies}</p>
      <p>People who like to listen to radio: {results.average_listen_to_radio}</p>
      <p>People who like to eat out: {results.average_eat_out}</p>
      <p>People who like to watch TV: {results.average_watch_tv}</p>
    </div>
  );
};

export default AnalysisResults;
