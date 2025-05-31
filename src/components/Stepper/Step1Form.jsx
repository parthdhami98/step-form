import React from 'react';
import './Form.css';

const Step1Form = ({ formData, handleChange, errors, formTitle = "Welcome! First things first..." }) => {
  return (
    <div className="form-step">
      <h1 className="form-title">{formTitle}</h1>
      <p className="form-subtitle">You can always change them later.</p>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className={errors.fullName ? 'error' : ''}
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          placeholder="Display Name"
          value={formData.displayName}
          onChange={handleChange}
          required
          className={errors.displayName ? 'error' : ''}
        />
        {errors.displayName && <span className="error-message">{errors.displayName}</span>}
      </div>
    </div>
  );
};

export default Step1Form;
