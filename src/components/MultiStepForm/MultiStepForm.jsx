import React, { useState, useRef, lazy, Suspense } from 'react';
import './MultiStepForm.css';

// Lazy load components
const Stepper = lazy(() => import('../Stepper/Stepper'));
const Step1Form = lazy(() => import('../Stepper/Step1Form'));
const Step2Form = lazy(() => import('../Stepper/Step2Form'));
const Step3Form = lazy(() => import('../Stepper/Step3Form'));
const Step4Form = lazy(() => import('../Stepper/Step4Form'));
const DataTable = lazy(() => import('../DataTable'));

const INITIAL_FORM_DATA = {
  fullName: '',
  displayName: '',
  workspaceName: '',
  workspaceUrl: '',
  usage: '',
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Set usage option (for Step 3)
  const handleUsageChange = (value) => {
    setFormData({
      ...formData,
      usage: value
    });
    
    // Clear error
    if (errors.usage) {
      setErrors({
        ...errors,
        usage: ''
      });
    }
  };

  // Validate the current step
  const validateStep = () => {
    let isValid = true;
    const newErrors = {};
    
    // Only validate if the form is defined
    if (formRef.current) {
      // Check all required fields in the form
      const requiredFields = formRef.current.querySelectorAll('[required]');
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          newErrors[field.name] = `${field.name.charAt(0).toUpperCase() + field.name.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        }
      });
      
      // Special validation for step 3 (usage selection)
      if (currentStep === 3 && !formData.usage) {
        isValid = false;
        newErrors.usage = 'Please select how you plan to use My Form';
      }
      
      // Validate workspace URL format if provided (not required)
      if (currentStep === 2 && formData.workspaceUrl && !/^[a-zA-Z0-9-_]*$/.test(formData.workspaceUrl)) {
        isValid = false;
        newErrors.workspaceUrl = 'URL can only contain letters, numbers, hyphens, and underscores';
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Skip validation for final step
    if (currentStep === 4) {
      if (editingIndex !== null) {
        // Update existing entry
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = formData;
        setEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        // Add new entry
        setEntries([...entries, formData]);
      }
      
      // Reset form and go back to step 1
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      return;
    }
    
    // Validate the current step
    if (validateStep()) {
      // If valid, move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle editing an entry
  const handleEdit = (index) => {
    setFormData(entries[index]);
    setEditingIndex(index);
    setCurrentStep(1);
  };

  // Handle deleting an entry
  const handleDelete = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  // Render the form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Form
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            formTitle={editingIndex !== null ? "Edit User Information" : "Welcome! First things first..."}
          />
        );
      case 2:
        return (
          <Step2Form
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3Form
            formData={formData}
            handleUsageChange={handleUsageChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4Form
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form-container">
      <Suspense fallback={<div className="loading">Loading header...</div>}>
        <div className="form-header">
          <h1 className="app-title">My Form</h1>
        </div>
        
        <Stepper currentStep={currentStep} steps={[1, 2, 3, 4]} />
      </Suspense>
      
      <form ref={formRef} onSubmit={handleSubmit} className="form-wrapper" noValidate>
        <Suspense fallback={<div className="loading">Loading form...</div>}>
          {renderForm()}
          
          <button 
            type="submit" 
            className="form-button"
          >
            {currentStep === 4 ? (editingIndex !== null ? 'Update' : 'Launch My Form') : 'Create Workspace'}
          </button>
        </Suspense>
      </form>
      
      {entries.length > 0 && (
        <Suspense fallback={<div className="loading">Loading table...</div>}>
          <DataTable 
            entries={entries} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </Suspense>
      )}
    </div>
  );
};

export default MultiStepForm;
