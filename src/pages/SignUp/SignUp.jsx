import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaUserTie, FaBuilding, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaPhone, FaMapMarkerAlt, FaCode, FaChartLine, FaGlobe, FaIndustry,
  FaCloudUploadAlt, FaCheckCircle, FaTimes, FaArrowLeft, FaSpinner, FaShieldAlt,
  FaLandmark,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { seekerDocuments, giverDocuments, governmentDocuments, industries, experienceLevels } from '../../data/verificationData';
import './SignUp.css';

export default function SignUp() {
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    phone: '', location: '', skills: [], experienceLevel: '',
    companyName: '', companyWebsite: '', industry: '',
    departmentName: '', employeeId: '', stateRegion: '',
  });

  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(5);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [emailError, setEmailError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [docType, setDocType] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [docError, setDocError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const documents = role === 'seeker' ? seekerDocuments : role === 'government' ? governmentDocuments : giverDocuments;
  const selectedDoc = documents.find((d) => d.id === docType);

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const addSkill = () => {
    if (!skillName.trim()) return;
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: skillName.trim(), level: Number(skillLevel) }],
    }));
    setSkillName('');
    setSkillLevel(5);
  };

  const removeSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const validateStep2 = () => {
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword || !form.phone || !form.location) {
      setError('Please fill in all required fields');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (role === 'seeker' && (form.skills.length === 0 || !form.experienceLevel)) {
      setError('Please fill in all required fields');
      return false;
    }
    if (role === 'giver' && (!form.companyName || !form.companyWebsite || !form.industry)) {
      setError('Please fill in all required fields');
      return false;
    }
    if (role === 'government' && (!form.departmentName || !form.employeeId || !form.stateRegion)) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setError('');
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    setError('');
    if (validateStep3()) {
      setStep(4);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setEmailError('');
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((d) => !d);
    otpRefs[nextEmpty === -1 ? 5 : nextEmpty].current?.focus();
  };

  const handleVerifyEmail = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setEmailError('Please enter the complete 6-digit code');
      return;
    }
    if (code !== '123456') {
      setEmailError('Invalid code. Please try again.');
      return;
    }
    setStep(5);
  };

  const handleResendCode = () => {
    setOtp(['', '', '', '', '', '']);
    setEmailError('');
    setResendTimer(30);
    otpRefs[0].current?.focus();
  };

  const handleFileSelect = (file) => {
    setDocError('');
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setDocError('File size must be less than 5MB');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setDocError('Only JPG, PNG, and PDF files are accepted');
      return;
    }
    setDocFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setDocFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleVerify = () => {
    if (!docType || !docNumber || !docFile) {
      setDocError('Please fill in all fields and upload a document');
      return;
    }
    setDocError('');
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signUp(role, form.fullName, form.email, form.skills, form.experienceLevel);
    }, 800);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="signup-page">
      <div className="signup-bg-shapes">
        <div className="signup-shape signup-shape--1" />
        <div className="signup-shape signup-shape--2" />
        <div className="signup-shape signup-shape--3" />
      </div>

      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-logo">
            <FaRocket className="signup-logo-icon" />
          </div>
          <h1 className="signup-title">SkillQuest</h1>
          <p className="signup-subtitle">
            {step === 1 && 'Join SkillQuest'}
            {step === 2 && 'Create your account'}
            {step === 3 && (role === 'seeker' ? 'Your skills & experience' : role === 'giver' ? 'Company details' : 'Department details')}
            {step === 4 && 'Verify your email'}
            {step === 5 && 'Verify your identity'}
          </p>
        </div>

        {step === 1 && (
          <>
            <p className="signup-step-desc">Choose your role to get started</p>
            <div className="role-grid">
              <button className="role-card role-card--seeker" onClick={() => handleRoleSelect('seeker')}>
                <div className="role-card-icon role-card-icon--seeker">
                  <FaUserTie />
                </div>
                <h3 className="role-card-title">Job Seeker</h3>
                <p className="role-card-desc">Find your dream job, showcase skills, and get hired</p>
              </button>
              <button className="role-card role-card--giver" onClick={() => handleRoleSelect('giver')}>
                <div className="role-card-icon role-card-icon--giver">
                  <FaBuilding />
                </div>
                <h3 className="role-card-title">Job Giver</h3>
                <p className="role-card-desc">Post jobs, find the best talent, and build your team</p>
              </button>
              <button className="role-card role-card--government" onClick={() => handleRoleSelect('government')}>
                <div className="role-card-icon role-card-icon--government">
                  <FaLandmark />
                </div>
                <h3 className="role-card-title">Government</h3>
                <p className="role-card-desc">Monitor skill development programs and national employability data</p>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <form className="signup-form" onSubmit={handleStep2Submit}>
            <button type="button" className="signup-back" onClick={() => { setStep(1); setError(''); }}>
              <FaArrowLeft /> Back
            </button>

            <div className="signup-step-indicator">
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--active" />
              <span className="step-dot" />
              <span className="step-dot" />
              <span className="step-dot" />
            </div>

            <div className="signup-role-badge">
              {role === 'seeker' ? <FaUserTie /> : role === 'government' ? <FaLandmark /> : <FaBuilding />}
              <span>{role === 'seeker' ? 'Job Seeker' : role === 'government' ? 'Government' : 'Job Giver'}</span>
            </div>

            {error && <div className="signup-error">{error}</div>}

            <div className="signup-field">
              <FaUser className="signup-field-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => updateForm('fullName', e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="signup-field">
              <FaEnvelope className="signup-field-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateForm('email', e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="signup-field">
              <FaLock className="signup-field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => updateForm('password', e.target.value)}
                className="signup-input"
              />
              <button type="button" className="signup-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="signup-field">
              <FaLock className="signup-field-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => updateForm('confirmPassword', e.target.value)}
                className="signup-input"
              />
              <button type="button" className="signup-toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {form.confirmPassword && form.password !== form.confirmPassword && (
              <span className="signup-password-mismatch">Passwords do not match</span>
            )}

            <div className="signup-field">
              <FaPhone className="signup-field-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="signup-field">
              <FaMapMarkerAlt className="signup-field-icon" />
              <input
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={(e) => updateForm('location', e.target.value)}
                className="signup-input"
              />
            </div>

            <button type="submit" className="signup-button">
              Continue
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="signup-form" onSubmit={handleStep3Submit}>
            <button type="button" className="signup-back" onClick={() => { setStep(2); setError(''); }}>
              <FaArrowLeft /> Back
            </button>

            <div className="signup-step-indicator">
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--active" />
              <span className="step-dot" />
              <span className="step-dot" />
            </div>

            <div className="signup-role-badge">
              {role === 'seeker' ? <FaUserTie /> : role === 'government' ? <FaLandmark /> : <FaBuilding />}
              <span>{role === 'seeker' ? 'Job Seeker' : role === 'government' ? 'Government' : 'Job Giver'}</span>
            </div>

            {error && <div className="signup-error">{error}</div>}

            {role === 'seeker' && (
              <>
                <div className="signup-skills-input">
                  <div className="signup-field">
                    <FaCode className="signup-field-icon" />
                    <input
                      type="text"
                      placeholder="Skill name (e.g. JavaScript)"
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="signup-input"
                    />
                  </div>
                  <div className="signup-skill-level-row">
                    <label className="signup-skill-level-label">Level: {skillLevel}/10</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="signup-skill-level-slider"
                    />
                    <button type="button" className="signup-skill-add-btn" onClick={addSkill}>
                      Add
                    </button>
                  </div>
                </div>

                {form.skills.length > 0 && (
                  <div className="signup-skill-tags">
                    {form.skills.map((skill, index) => (
                      <span key={index} className="signup-skill-tag">
                        {skill.name} <span className="signup-skill-tag-level">{skill.level}/10</span>
                        <button type="button" className="signup-skill-tag-remove" onClick={() => removeSkill(index)}>
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="signup-field">
                  <FaChartLine className="signup-field-icon" />
                  <select
                    value={form.experienceLevel}
                    onChange={(e) => updateForm('experienceLevel', e.target.value)}
                    className="signup-input signup-select"
                  >
                    <option value="">Select Experience Level</option>
                    {experienceLevels.map((lvl) => (
                      <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {role === 'giver' && (
              <>
                <div className="signup-field">
                  <FaBuilding className="signup-field-icon" />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={(e) => updateForm('companyName', e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <FaGlobe className="signup-field-icon" />
                  <input
                    type="url"
                    placeholder="Company Website (https://...)"
                    value={form.companyWebsite}
                    onChange={(e) => updateForm('companyWebsite', e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <FaIndustry className="signup-field-icon" />
                  <select
                    value={form.industry}
                    onChange={(e) => updateForm('industry', e.target.value)}
                    className="signup-input signup-select"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>{ind.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {role === 'government' && (
              <>
                <div className="signup-field">
                  <FaLandmark className="signup-field-icon" />
                  <input
                    type="text"
                    placeholder="Ministry / Department Name"
                    value={form.departmentName}
                    onChange={(e) => updateForm('departmentName', e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <FaUser className="signup-field-icon" />
                  <input
                    type="text"
                    placeholder="Employee ID"
                    value={form.employeeId}
                    onChange={(e) => updateForm('employeeId', e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <FaMapMarkerAlt className="signup-field-icon" />
                  <input
                    type="text"
                    placeholder="State / Region"
                    value={form.stateRegion}
                    onChange={(e) => updateForm('stateRegion', e.target.value)}
                    className="signup-input"
                  />
                </div>
              </>
            )}

            <button type="submit" className="signup-button">
              Continue
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="signup-form">
            <button type="button" className="signup-back" onClick={() => { setStep(3); setOtp(['', '', '', '', '', '']); setEmailError(''); }}>
              <FaArrowLeft /> Back
            </button>

            <div className="signup-step-indicator">
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--active" />
              <span className="step-dot" />
            </div>

            <div className="signup-email-verify-icon">
              <FaShieldAlt />
            </div>

            <p className="signup-step-desc">
              We've sent a verification code to<br />
              <strong>{form.email}</strong>
            </p>

            <p className="signup-otp-hint">
              For testing, your code is: <strong>123456</strong>
            </p>

            {emailError && <div className="signup-error">{emailError}</div>}

            <div className="otp-input-group" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`otp-input ${digit ? 'otp-input--filled' : ''}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="signup-button"
              onClick={handleVerifyEmail}
              disabled={otp.join('').length !== 6}
            >
              Verify Email
            </button>

            <p className="signup-resend">
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : <button type="button" className="signup-resend-btn" onClick={handleResendCode}>Resend Code</button>
              }
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="signup-form">
            <button type="button" className="signup-back" onClick={() => { setStep(4); setVerified(false); setVerifying(false); setDocError(''); }}>
              <FaArrowLeft /> Back
            </button>

            <div className="signup-step-indicator">
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--completed" />
              <span className="step-dot step-dot--active" />
            </div>

            <p className="signup-step-desc">
              {role === 'seeker'
                ? 'Upload a valid government-issued ID'
                : role === 'government'
                  ? 'Upload your government service ID'
                  : 'Upload your company registration document'}
            </p>

            {docError && <div className="signup-error">{docError}</div>}

            <div className="signup-field">
              <FaUser className="signup-field-icon" />
              <select
                value={docType}
                onChange={(e) => { setDocType(e.target.value); setDocNumber(''); }}
                className="signup-input signup-select"
              >
                <option value="">Select Document Type</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>{doc.label}</option>
                ))}
              </select>
            </div>

            {selectedDoc && (
              <div className="signup-field">
                <FaUser className="signup-field-icon" />
                <input
                  type="text"
                  placeholder={selectedDoc.placeholder}
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="signup-input"
                />
              </div>
            )}

            <div
              className={`upload-zone ${dragOver ? 'upload-zone--dragover' : ''} ${docFile ? 'upload-zone--has-file' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !docFile && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileInputChange}
                className="upload-zone-input"
              />
              {!docFile ? (
                <>
                  <FaCloudUploadAlt className="upload-zone-icon" />
                  <p className="upload-zone-text">Drag & drop your document here</p>
                  <p className="upload-zone-subtext">or click to browse</p>
                  <p className="upload-zone-hint">Supports JPG, PNG, PDF — Max 5MB</p>
                </>
              ) : (
                <div className="upload-zone-file">
                  <div className="upload-zone-file-info">
                    <span className="upload-zone-file-name">{docFile.name}</span>
                    <span className="upload-zone-file-size">{formatFileSize(docFile.size)}</span>
                  </div>
                  <button type="button" className="upload-zone-file-remove" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {verifying && (
              <div className="verification-status verification-status--pending">
                <FaSpinner className="verification-spinner" />
                <span>Verifying your document...</span>
              </div>
            )}

            {verified && (
              <div className="verification-status verification-status--verified">
                <FaCheckCircle />
                <span>Document Verified</span>
              </div>
            )}

            {!verified && !verifying && (
              <button
                type="button"
                className="signup-button"
                onClick={handleVerify}
                disabled={!docType || !docNumber || !docFile}
              >
                Submit for Verification
              </button>
            )}

            {verified && (
              <button
                type="button"
                className={`signup-button ${loading ? 'signup-button--loading' : ''}`}
                onClick={handleFinalSubmit}
                disabled={loading}
              >
                {loading ? <span className="signup-button-spinner" /> : 'Verify & Continue'}
              </button>
            )}
          </div>
        )}

        {(step === 1 || step === 2 || step === 3) && (
          <p className="signup-signup">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
