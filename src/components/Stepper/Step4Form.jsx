import React from 'react';
import './Form.css';

const Step4Form = ({ formData }) => {
  return (
    <div className="form-step">
      <div className="success-icon">✓</div>
      <h1 className="form-title">Congratulations, {formData.displayName || 'User'}!</h1>
      <p className="form-subtitle">You have completed onboarding, you can start using My Form!</p>
    </div>
  );
};

export default Step4Form;
