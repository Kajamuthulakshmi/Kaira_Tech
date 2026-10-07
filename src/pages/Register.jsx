import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  calculateAge,
  getCategoryForAge,
  isCategoryMatchingAge,
  generateRegistrationId,
  saveRegistration,
  CATEGORIES,
  COMPETITIONS_DATA,
  TAMIL_NADU_DISTRICTS
} from '../data/competitions';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  FileCheck,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial values from navigation state if navigated from a competition card
  const initialCategory = location.state?.category || '';
  const initialCompetition = location.state?.competition || '';

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
    state: 'Tamil Nadu',
    district: '',
    city: '',
    address: '',
    category: initialCategory,
    competition: initialCompetition,
    institution: '',
    previousExperience: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    agreeTerms: false
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Success State for rendering on the same page
  const [submittedData, setSubmittedData] = useState(null);

  // Automatically recalculate age and suggest category when dateOfBirth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const computedAge = calculateAge(formData.dateOfBirth);
      if (computedAge !== null) {
        const suggestedCat = getCategoryForAge(computedAge);

        setFormData((prev) => {
          let updatedCategory = prev.category;

          // If no category was selected, or if existing category no longer matches age
          if (!updatedCategory || updatedCategory === 'Kids' || updatedCategory === 'Medium' || updatedCategory === 'Under 35') {
            if (suggestedCat === 'Kids' || suggestedCat === 'Medium' || suggestedCat === 'Under 35') {
              updatedCategory = suggestedCat;
            }
          }

          // If category changed, check if competition is still compatible
          let updatedCompetition = prev.competition;
          if (updatedCompetition) {
            const compObj = COMPETITIONS_DATA.find((c) => c.name === updatedCompetition);
            if (compObj && compObj.category !== updatedCategory) {
              updatedCompetition = '';
            }
          }

          return {
            ...prev,
            age: computedAge,
            category: updatedCategory,
            competition: updatedCompetition
          };
        });

        // Trigger immediate validation of age and category
        validateAgeAndCategory(computedAge, formData.category || suggestedCat);
      }
    } else {
      setFormData((prev) => ({ ...prev, age: '' }));
    }
  }, [formData.dateOfBirth]);

  const validateAgeAndCategory = (currentAge, currentCat) => {
    const newErrors = { ...errors };

    if (currentAge !== null && currentAge !== '') {
      if (currentAge >= 35) {
        newErrors.age = 'This event is currently available only for participants below 35 years.';
        newErrors.category = 'This event is currently available only for participants below 35 years.';
      } else if (currentAge < 5) {
        newErrors.age = 'Minimum age requirement for participation is 5 years.';
        newErrors.category = 'Participants must be at least 5 years old.';
      } else {
        delete newErrors.age;

        if (currentCat) {
          const check = isCategoryMatchingAge(currentAge, currentCat);
          if (!check.valid) {
            newErrors.category = check.message;
          } else {
            delete newErrors.category;
          }
        }
      }
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const nextData = { ...prev, [name]: val };

      // If user manually changed category, validate against calculated age
      if (name === 'category') {
        // If changing category, reset competition if it was previously chosen
        if (prev.competition) {
          const compObj = COMPETITIONS_DATA.find((c) => c.name === prev.competition);
          if (compObj && compObj.category !== val) {
            nextData.competition = '';
          }
        }

        if (prev.age !== '') {
          const check = isCategoryMatchingAge(prev.age, val);
          setErrors((errs) => {
            const updated = { ...errs };
            if (!check.valid) {
              updated.category = check.message;
            } else {
              delete updated.category;
            }
            return updated;
          });
        }
      }

      return nextData;
    });

    // Clear error for field once edited (if valid)
    if (errors[name] && name !== 'category') {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'fullName':
        if (!value || !value.trim()) {
          newErrors.fullName = 'Full Name is required';
        } else if (value.trim().length < 3) {
          newErrors.fullName = 'Name must be at least 3 characters';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          newErrors.dateOfBirth = 'Date of Birth is required';
        } else {
          delete newErrors.dateOfBirth;
        }
        break;

      case 'gender':
        if (!value) {
          newErrors.gender = 'Please select a gender';
        } else {
          delete newErrors.gender;
        }
        break;

      case 'mobile':
        if (!value) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(value.trim())) {
          newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
        } else {
          delete newErrors.mobile;
        }
        break;

      case 'email':
        if (!value) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          newErrors.email = 'Enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'district':
        if (!value) {
          newErrors.district = 'Please select your district';
        } else {
          delete newErrors.district;
        }
        break;

      case 'city':
        if (!value || !value.trim()) {
          newErrors.city = 'City / Town is required';
        } else {
          delete newErrors.city;
        }
        break;

      case 'address':
        if (!value || !value.trim()) {
          newErrors.address = 'Residential address is required';
        } else {
          delete newErrors.address;
        }
        break;

      case 'category':
        if (!value) {
          newErrors.category = 'Please select an age category';
        } else if (formData.age !== '') {
          const check = isCategoryMatchingAge(formData.age, value);
          if (!check.valid) {
            newErrors.category = check.message;
          } else {
            delete newErrors.category;
          }
        }
        break;

      case 'competition':
        if (!value) {
          newErrors.competition = 'Please select a competition';
        } else {
          delete newErrors.competition;
        }
        break;

      case 'emergencyContactName':
        if (!value || !value.trim()) {
          newErrors.emergencyContactName = 'Emergency contact name is required';
        } else {
          delete newErrors.emergencyContactName;
        }
        break;

      case 'emergencyContactNumber':
        if (!value) {
          newErrors.emergencyContactNumber = 'Emergency contact number is required';
        } else if (!/^[6-9]\d{9}$/.test(value.trim())) {
          newErrors.emergencyContactNumber = 'Enter a valid 10-digit mobile number';
        } else {
          delete newErrors.emergencyContactNumber;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const validateAll = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';

    if (formData.age === '' || formData.age === null) {
      newErrors.dateOfBirth = 'Valid Date of Birth is required to calculate age';
    } else if (formData.age >= 35) {
      newErrors.age = 'This event is currently available only for participants below 35 years.';
      newErrors.category = 'This event is currently available only for participants below 35 years.';
    } else if (formData.age < 5) {
      newErrors.age = 'Minimum age requirement for participation is 5 years.';
      newErrors.category = 'Participants must be at least 5 years old.';
    }

    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.district) newErrors.district = 'Please select your district';
    if (!formData.city.trim()) newErrors.city = 'City / Town is required';
    if (!formData.address.trim()) newErrors.address = 'Residential address is required';

    if (!formData.category) {
      newErrors.category = 'Please select an age category';
    } else if (formData.age !== '') {
      const check = isCategoryMatchingAge(formData.age, formData.category);
      if (!check.valid) {
        newErrors.category = check.message;
      }
    }

    if (!formData.competition) newErrors.competition = 'Please select a competition';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactNumber) {
      newErrors.emergencyContactNumber = 'Emergency contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.emergencyContactNumber.trim())) {
      newErrors.emergencyContactNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must confirm the details and accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {};
    Object.keys(formData).forEach((k) => { allTouched[k] = true; });
    setTouched(allTouched);

    const isValid = validateAll();
    if (!isValid) {
      // Scroll to top of the form so user sees any pending errors
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    // Generate unique Registration ID: REG-2026-00125
    const regId = generateRegistrationId();
    const submissionRecord = {
      registrationId: regId,
      fullName: formData.fullName.trim(),
      dateOfBirth: formData.dateOfBirth,
      age: formData.age,
      gender: formData.gender,
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      state: formData.state,
      district: formData.district,
      city: formData.city.trim(),
      address: formData.address.trim(),
      category: formData.category,
      competition: formData.competition,
      institution: formData.institution.trim() || 'Independent / Individual',
      previousExperience: formData.previousExperience.trim() || 'None specified',
      emergencyContactName: formData.emergencyContactName.trim(),
      emergencyContactNumber: formData.emergencyContactNumber.trim(),
      registeredAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    // Save to LocalStorage
    saveRegistration(submissionRecord);

    // Render Success Section on the SAME page
    setSubmittedData(submissionRecord);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      mobile: '',
      email: '',
      state: 'Tamil Nadu',
      district: '',
      city: '',
      address: '',
      category: '',
      competition: '',
      institution: '',
      previousExperience: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      agreeTerms: false
    });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  // Filter competitions dynamically based on selected category
  const categoryCompetitions = formData.category
    ? COMPETITIONS_DATA.filter((c) => c.category === formData.category)
    : [];

  return (
    <div className="register-page-wrapper">
      <div className="container">
        {/* If submitted successfully, show the SUCCESS SECTION on the SAME page */}
        {submittedData ? (
          <div className="register-main-card success-screen-wrapper">
            <div className="success-badge-crest">
              <CheckCircle2 size={44} />
            </div>

            <h2 className="success-title">Registration Successful!</h2>
            <p className="success-sub">
              Thank you for registering for the State-Level Competition. Your entry has been securely registered in the state competition directory.
            </p>

            {/* Event Registration Pass Card */}
            <div className="event-pass-card">
              <div className="pass-header">
                <span className="pass-header-title">Official Competitor Pass</span>
                <span className="pass-header-chip">State Level 2026</span>
              </div>

              <div className="pass-body">
                <div className="pass-reg-id-box">
                  <div className="pass-reg-id-label">Official Registration ID</div>
                  <div className="pass-reg-id-number">{submittedData.registrationId}</div>
                </div>

                <div className="pass-details-grid">
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">Participant</span>
                    <span className="pass-detail-val">{submittedData.fullName}</span>
                  </div>
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">Category</span>
                    <span className="pass-detail-val" style={{ color: '#38bdf8' }}>
                      {submittedData.category}
                    </span>
                  </div>
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">Competition</span>
                    <span className="pass-detail-val">{submittedData.competition}</span>
                  </div>
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">Age & Gender</span>
                    <span className="pass-detail-val">
                      {submittedData.age} Years ({submittedData.gender})
                    </span>
                  </div>
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">District / State</span>
                    <span className="pass-detail-val">
                      {submittedData.district}, {submittedData.state}
                    </span>
                  </div>
                  <div className="pass-detail-item">
                    <span className="pass-detail-label">Registered At</span>
                    <span className="pass-detail-val">{submittedData.registeredAt}</span>
                  </div>
                </div>
              </div>

              <div className="pass-footer-bar">
                <span>Status: <strong style={{ color: '#10b981' }}>Confirmed Entry</strong></span>
                <span>Tamil Nadu State Competition Board</span>
              </div>
            </div>

            {/* Success Actions */}
            <div className="success-actions-row">
              <Link to="/" className="btn btn-primary btn-lg">
                <ArrowLeft size={18} />
                <span>Back to Home</span>
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => window.print()}
              >
                <Printer size={18} />
                <span>Print Pass</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleResetForm}
              >
                <RotateCcw size={18} />
                <span>Register Another</span>
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <>
            <div className="register-header-box">
              <div className="section-tag">Official Registration</div>
              <h1 className="section-title">Register for the Competition</h1>
              <p className="section-subtitle">
                Complete your details and choose the competition you want to participate in.
              </p>
            </div>

            <div className="register-main-card">
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. PERSONAL DETAILS */}
                <div className="form-section-block">
                  <div className="section-legend">
                    <div className="legend-number">1</div>
                    <h2 className="legend-title">Personal Details</h2>
                  </div>

                  <div className="form-grid-2">
                    {/* Full Name */}
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="fullName">
                        <span>Full Name <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        className={`input-control ${errors.fullName && touched.fullName ? 'has-error' : ''}`}
                        placeholder="Enter your full legal name as per ID"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('fullName')}
                        required
                      />
                      {errors.fullName && touched.fullName && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="dateOfBirth">
                        <span>Date of Birth <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        className={`input-control ${errors.dateOfBirth && touched.dateOfBirth ? 'has-error' : ''}`}
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('dateOfBirth')}
                        max={new Date().toISOString().split('T')[0]}
                        required
                      />
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.dateOfBirth}</span>
                        </div>
                      )}
                    </div>

                    {/* Age (Automatically Calculated - Read Only) */}
                    <div className="form-group">
                      <label className="form-label">
                        <span>Age <span className="optional-tag">(Calculated automatically)</span></span>
                      </label>
                      <div className="age-calc-box">
                        <span className="age-calc-value">
                          {formData.age !== '' ? `${formData.age} Years Old` : 'Select Date of Birth'}
                        </span>
                        {formData.age !== '' && (
                          <span
                            className="age-calc-tag"
                            style={{
                              background: formData.age >= 35
                                ? 'rgba(244, 63, 94, 0.2)'
                                : 'rgba(56, 189, 248, 0.2)',
                              color: formData.age >= 35 ? '#f43f5e' : '#38bdf8'
                            }}
                          >
                            {formData.age >= 35
                              ? 'Exceeds Limit'
                              : formData.age < 13
                              ? 'Kids Category'
                              : formData.age <= 17
                              ? 'Medium Category'
                              : 'Under 35 Category'}
                          </span>
                        )}
                      </div>
                      {errors.age && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.age}</span>
                        </div>
                      )}
                    </div>

                    {/* Age 35+ Alert Banner */}
                    {formData.age !== '' && formData.age >= 35 && (
                      <div className="age-restriction-alert full-width" style={{ gridColumn: '1 / -1' }}>
                        <AlertTriangle size={24} style={{ color: '#f43f5e', flexShrink: 0 }} />
                        <div>
                          <div className="alert-title">Age Eligibility Notice</div>
                          <div>This event is currently available only for participants below 35 years.</div>
                        </div>
                      </div>
                    )}

                    {/* Gender */}
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="gender">
                        <span>Gender <span className="required-star">*</span></span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className={`input-control ${errors.gender && touched.gender ? 'has-error' : ''}`}
                        value={formData.gender}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('gender')}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {errors.gender && touched.gender && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.gender}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. CONTACT DETAILS */}
                <div className="form-section-block">
                  <div className="section-legend">
                    <div className="legend-number">2</div>
                    <h2 className="legend-title">Contact & Location Details</h2>
                  </div>

                  <div className="form-grid-2">
                    {/* Mobile Number */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="mobile">
                        <span>Mobile Number <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        maxLength="10"
                        className={`input-control ${errors.mobile && touched.mobile ? 'has-error' : ''}`}
                        placeholder="10-digit mobile (e.g. 9876543210)"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('mobile')}
                        required
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.mobile}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        <span>Email Address <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className={`input-control ${errors.email && touched.email ? 'has-error' : ''}`}
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        required
                      />
                      {errors.email && touched.email && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* State (Default: Tamil Nadu) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="state">
                        <span>State</span>
                      </label>
                      <input
                        id="state"
                        type="text"
                        name="state"
                        className="input-control read-only-field"
                        value={formData.state}
                        readOnly
                        disabled
                      />
                      <span className="field-hint">State Level Championship is hosted in Tamil Nadu</span>
                    </div>

                    {/* District (Tamil Nadu Districts Dropdown) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="district">
                        <span>District <span className="required-star">*</span></span>
                      </label>
                      <select
                        id="district"
                        name="district"
                        className={`input-control ${errors.district && touched.district ? 'has-error' : ''}`}
                        value={formData.district}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('district')}
                        required
                      >
                        <option value="">Select District</option>
                        {TAMIL_NADU_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                      {errors.district && touched.district && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.district}</span>
                        </div>
                      )}
                    </div>

                    {/* City / Town */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="city">
                        <span>City / Town <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        className={`input-control ${errors.city && touched.city ? 'has-error' : ''}`}
                        placeholder="e.g. Adyar, Gandhipuram, Anna Nagar"
                        value={formData.city}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('city')}
                        required
                      />
                      {errors.city && touched.city && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.city}</span>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="address">
                        <span>Residential Address <span className="required-star">*</span></span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        className={`input-control ${errors.address && touched.address ? 'has-error' : ''}`}
                        placeholder="House / Flat No, Street, Landmark, Pincode"
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('address')}
                        required
                      />
                      {errors.address && touched.address && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. CATEGORY SELECTION */}
                <div className="form-section-block">
                  <div className="section-legend">
                    <div className="legend-number">3</div>
                    <h2 className="legend-title">Select Your Age Category</h2>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                    Category is automatically suggested based on your birth date. You may only select the category that matches your age.
                  </p>

                  <div className="category-selection-grid">
                    {CATEGORIES.map((cat) => {
                      const isSelected = formData.category === cat.id;
                      return (
                        <div
                          key={cat.id}
                          className={`cat-select-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            handleInputChange({
                              target: { name: 'category', value: cat.id, type: 'text' }
                            });
                          }}
                        >
                          <div className="cat-select-name">{cat.name}</div>
                          <div className="cat-select-range">{cat.ageRange}</div>
                          <span
                            className="cat-select-tag"
                            style={{ color: cat.accentColor }}
                          >
                            {cat.count} Competitions
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {errors.category && (
                    <div className="field-error" style={{ marginTop: '0.75rem' }}>
                      <AlertCircle size={16} />
                      <strong style={{ fontSize: '0.88rem' }}>{errors.category}</strong>
                    </div>
                  )}
                </div>

                {/* 4. COMPETITION SELECTION */}
                <div className="form-section-block">
                  <div className="section-legend">
                    <div className="legend-number">4</div>
                    <h2 className="legend-title">Choose Competition</h2>
                  </div>

                  {!formData.category ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      Please select an Age Category above to view available competitions.
                    </p>
                  ) : categoryCompetitions.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      No competitions found for this category.
                    </p>
                  ) : (
                    <div>
                      <div className="competition-selection-list">
                        {categoryCompetitions.map((comp) => {
                          const isSelected = formData.competition === comp.name;
                          return (
                            <div
                              key={comp.id}
                              className={`comp-pick-card ${isSelected ? 'active' : ''}`}
                              onClick={() => {
                                handleInputChange({
                                  target: { name: 'competition', value: comp.name, type: 'text' }
                                });
                              }}
                            >
                              <div className="comp-pick-title">
                                <span>{comp.name}</span>
                                {isSelected && (
                                  <CheckCircle2 size={18} style={{ color: '#38bdf8' }} />
                                )}
                              </div>
                              <div className="comp-pick-desc">{comp.shortDescription}</div>
                              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                                ● {comp.status}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {errors.competition && touched.competition && (
                        <div className="field-error" style={{ marginTop: '0.75rem' }}>
                          <AlertCircle size={14} />
                          <span>{errors.competition}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. ADDITIONAL DETAILS */}
                <div className="form-section-block">
                  <div className="section-legend">
                    <div className="legend-number">5</div>
                    <h2 className="legend-title">Additional Details</h2>
                  </div>

                  <div className="form-grid-2">
                    {/* Institution / Organization (Optional) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="institution">
                        <span>Institution / Organization <span className="optional-tag">(Optional)</span></span>
                      </label>
                      <input
                        id="institution"
                        type="text"
                        name="institution"
                        className="input-control"
                        placeholder="School / College / Organization name"
                        value={formData.institution}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Previous Experience (Optional) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="previousExperience">
                        <span>Previous Experience <span className="optional-tag">(Optional)</span></span>
                      </label>
                      <input
                        id="previousExperience"
                        type="text"
                        name="previousExperience"
                        className="input-control"
                        placeholder="e.g. District winner 2025, 2 years training"
                        value={formData.previousExperience}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Emergency Contact Name (Required) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="emergencyContactName">
                        <span>Emergency Contact Name <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="emergencyContactName"
                        type="text"
                        name="emergencyContactName"
                        className={`input-control ${errors.emergencyContactName && touched.emergencyContactName ? 'has-error' : ''}`}
                        placeholder="Parent / Guardian / Kin name"
                        value={formData.emergencyContactName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('emergencyContactName')}
                        required
                      />
                      {errors.emergencyContactName && touched.emergencyContactName && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.emergencyContactName}</span>
                        </div>
                      )}
                    </div>

                    {/* Emergency Contact Number (Required) */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="emergencyContactNumber">
                        <span>Emergency Contact Number <span className="required-star">*</span></span>
                      </label>
                      <input
                        id="emergencyContactNumber"
                        type="tel"
                        name="emergencyContactNumber"
                        maxLength="10"
                        className={`input-control ${errors.emergencyContactNumber && touched.emergencyContactNumber ? 'has-error' : ''}`}
                        placeholder="10-digit emergency phone number"
                        value={formData.emergencyContactNumber}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('emergencyContactNumber')}
                        required
                      />
                      {errors.emergencyContactNumber && touched.emergencyContactNumber && (
                        <div className="field-error">
                          <AlertCircle size={14} />
                          <span>{errors.emergencyContactNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TERMS AND CONDITIONS */}
                <div className="terms-wrapper">
                  <label className="terms-label" htmlFor="agreeTerms">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      name="agreeTerms"
                      className="terms-checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <span className="terms-text">
                      I confirm that the information provided by me is correct and I agree to the competition terms and conditions.
                    </span>
                  </label>
                  {errors.agreeTerms && touched.agreeTerms && (
                    <div className="field-error" style={{ marginTop: '0.5rem' }}>
                      <AlertCircle size={14} />
                      <span>{errors.agreeTerms}</span>
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON ROW */}
                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-full"
                    disabled={!formData.agreeTerms || (formData.age !== '' && formData.age >= 35)}
                    style={{ maxWidth: '420px' }}
                  >
                    <span>Submit Registration</span>
                    <ShieldCheck size={18} />
                  </button>

                  {!formData.agreeTerms && (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Please confirm terms and conditions checkbox to enable submission
                    </span>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
