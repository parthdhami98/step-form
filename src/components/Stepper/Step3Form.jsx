import React from 'react';
import './Form.css';

const Step3Form = ({ formData, handleUsageChange, errors }) => {
  const usage = formData.usage || '';

  const handleOptionClick = (value) => {
    handleUsageChange(value);
  };

  return (
    <div className="form-step">
      <h1 className="form-title">Please select how you plan to use My Form?</h1>
      <p className="form-subtitle">We'll streamline your setup experience accordingly.</p>
      
      <div className="form-group radio-group">
        <div 
          className={`option-card ${usage === 'myself' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('myself')}
        >
          <div className="option-icon">👤</div>
          <h3>For myself</h3>
          <p>Write better. Think more clearly. Stay organized.</p>
          <input
            type="radio"
            id="myself"
            name="usage"
            value="myself"
            checked={usage === 'myself'}
            onChange={() => handleOptionClick('myself')}
            style={{ display: 'none' }}
            required
          />
        </div>
        
        <div 
          className={`option-card ${usage === 'team' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('team')}
        >
          <div className="option-icon">👥</div>
          <h3>With my team</h3>
          <p>Wikis, docs, tasks & projects, all in one place.</p>
          <input
            type="radio"
            id="team"
            name="usage"
            value="team"
            checked={usage === 'team'}
            onChange={() => handleOptionClick('team')}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {errors.usage && <span className="error-message">{errors.usage}</span>}
    </div>
  );
};

export default Step3Form;
