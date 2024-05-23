// SurveyForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    favoriteFood: [],
    watchMovies: 0,
    listenToRadio: 0,
    eatOut: 0,
    watchTV: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        favoriteFood: checked
          ? [...formData.favoriteFood, value]
          : formData.favoriteFood.filter((food) => food !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/survey', formData);
      alert('Survey submitted successfully!');
    } catch (error) {
      alert('Error submitting survey');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Full Names:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Contact Number:
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>What is your favorite food?</label>
        <label>
          <input type="checkbox" name="favoriteFood" value="Pizza" checked={formData.favoriteFood.includes('Pizza')} onChange={handleChange} />
          Pizza
        </label>
        <label>
          <input type="checkbox" name="favoriteFood" value="Pasta" checked={formData.favoriteFood.includes('Pasta')} onChange={handleChange} />
          Pasta
        </label>
        <label>
          <input type="checkbox" name="favoriteFood" value="Pap and Wors" checked={formData.favoriteFood.includes('Pap and Wors')} onChange={handleChange} />
          Pap and Wors
        </label>
        <label>
          <input type="checkbox" name="favoriteFood" value="Other" checked={formData.favoriteFood.includes('Other')} onChange={handleChange} />
          Other
        </label>
      </div>
      <div>
        <label>
          Please rate your level of agreement on a scale from 1 to 5:
        </label>
        <div>
          <label>
            I like to watch movies:
            <input type="number" name="watchMovies" value={formData.watchMovies} onChange={handleChange} min="1" max="5" required />
          </label>
        </div>
        <div>
          <label>
            I like to listen to radio:
            <input type="number" name="listenToRadio" value={formData.listenToRadio} onChange={handleChange} min="1" max="5" required />
          </label>
        </div>
        <div>
          <label>
            I like to eat out:
            <input type="number" name="eatOut" value={formData.eatOut} onChange={handleChange} min="1" max="5" required />
          </label>
        </div>
        <div>
          <label>
            I like to watch TV:
            <input type="number" name="watchTV" value={formData.watchTV} onChange={handleChange} min="1" max="5" required />
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
