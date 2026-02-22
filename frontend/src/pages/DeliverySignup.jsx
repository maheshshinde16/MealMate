import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliverySignup.css';

const DeliverySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Documents
    aadharNumber: '',
    panNumber: '',
    drivingLicense: '',
    
    // Vehicle
    vehicleType: 'bike',
    vehicleNumber: '',
    vehicleModel: '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Password
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    } else if (step === 3) {
      if (!formData.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
      else if (!/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = 'Aadhar must be 12 digits';
      if (!formData.drivingLicense.trim()) newErrors.drivingLicense = 'Driving license is required';
    } else if (step === 4) {
      if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
      if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    } else if (step === 5) {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
      if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
    } else if (step === 6) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // TODO: Submit to backend API
      console.log('Form submitted:', formData);
      alert('Application submitted successfully! We will review and contact you within 24 hours.');
      navigate('/delivery-login');
    }
  };

  const renderProgressBar = () => (
    <div className="progress-bar">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className={`progress-step ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''}`}>
          <div className="step-circle">{num}</div>
          <div className="step-label">
            {num === 1 && 'Personal'}
            {num === 2 && 'Address'}
            {num === 3 && 'Documents'}
            {num === 4 && 'Vehicle'}
            {num === 5 && 'Bank'}
            {num === 6 && 'Security'}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="delivery-signup">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Become a Delivery Partner</h1>
          <p>Complete the registration process to start earning with MealMate</p>
        </div>

        {renderProgressBar()}

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="form-step">
              <h2 className="step-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="form-step">
              <h2 className="step-title">Address Details</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No., Building Name, Street"
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="form-step">
              <h2 className="step-title">Identity Documents</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="aadharNumber">Aadhar Number *</label>
                  <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    placeholder="12-digit Aadhar number"
                    maxLength="12"
                    className={errors.aadharNumber ? 'error' : ''}
                  />
                  {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="panNumber">PAN Number (Optional)</label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="Enter PAN number"
                    maxLength="10"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="drivingLicense">Driving License Number *</label>
                  <input
                    type="text"
                    id="drivingLicense"
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleChange}
                    placeholder="Enter driving license number"
                    className={errors.drivingLicense ? 'error' : ''}
                  />
                  {errors.drivingLicense && <span className="error-message">{errors.drivingLicense}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Vehicle Details */}
          {step === 4 && (
            <div className="form-step">
              <h2 className="step-title">Vehicle Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="vehicleType">Vehicle Type *</label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="bike">Motorcycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleNumber">Vehicle Registration Number *</label>
                  <input
                    type="text"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g., MH12AB1234"
                    className={errors.vehicleNumber ? 'error' : ''}
                  />
                  {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="vehicleModel">Vehicle Model *</label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g., Honda Activa, Hero Splendor"
                    className={errors.vehicleModel ? 'error' : ''}
                  />
                  {errors.vehicleModel && <span className="error-message">{errors.vehicleModel}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Bank Details */}
          {step === 5 && (
            <div className="form-step">
              <h2 className="step-title">Bank Account Details</h2>
              <p className="step-description">For receiving your weekly payouts</p>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="bankName">Bank Name *</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Enter bank name"
                    className={errors.bankName ? 'error' : ''}
                  />
                  {errors.bankName && <span className="error-message">{errors.bankName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="accountNumber">Account Number *</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    className={errors.accountNumber ? 'error' : ''}
                  />
                  {errors.accountNumber && <span className="error-message">{errors.accountNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="ifscCode">IFSC Code *</label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="Enter IFSC code"
                    maxLength="11"
                    className={errors.ifscCode ? 'error' : ''}
                  />
                  {errors.ifscCode && <span className="error-message">{errors.ifscCode}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Password */}
          {step === 6 && (
            <div className="form-step">
              <h2 className="step-title">Create Your Account Password</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {step > 1 && (
              <button type="button" onClick={handlePrevious} className="btn-previous">
                Previous
              </button>
            )}
            {step < 6 ? (
              <button type="button" onClick={handleNext} className="btn-next">
                Next
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                Submit Application
              </button>
            )}
          </div>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate('/delivery-login')} className="link-button">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliverySignup;
