import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`step ${currentStep >= index + 1 ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`connector ${currentStep > index + 1 ? 'active' : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
