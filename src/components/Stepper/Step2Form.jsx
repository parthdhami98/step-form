import React from 'react';
import './Form.css';

const Step2Form = ({ formData, handleChange, errors }) => {
  return (
    <div className="form-step">
      <h1 className="form-title">Let's set up a home for all your work in My Form</h1>
      <p className="form-subtitle">You can always create another workspace later.</p>
      
      <div className="form-group">
        <label htmlFor="workspaceName">Workspace Name</label>
        <input
          type="text"
          id="workspaceName"
          name="workspaceName"
          placeholder="Workspace Name"
          value={formData.workspaceName}
          onChange={handleChange}
          required
          className={errors.workspaceName ? 'error' : ''}
        />
        {errors.workspaceName && <span className="error-message">{errors.workspaceName}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="workspaceUrl">
          Workspace URL <span className="optional">(optional)</span>
        </label>
        <div className="input-group">
          <div className="input-prefix">www.google.com/</div>
          <input
            type="text"
            id="workspaceUrl"
            name="workspaceUrl"
            placeholder="Workspace URL"
            value={formData.workspaceUrl}
            onChange={handleChange}
            className={errors.workspaceUrl ? 'with-prefix error' : 'with-prefix'}
          />
        </div>
        {errors.workspaceUrl && <span className="error-message">{errors.workspaceUrl}</span>}
      </div>
    </div>
  );
};

export default Step2Form;
