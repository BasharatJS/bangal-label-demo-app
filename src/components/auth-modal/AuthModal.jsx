import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AuthModal.css'

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    remember: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        remember: false,
      })
    }
  }, [isOpen, initialTab])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onClose()
  }

  // Modal animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const tabVariants = {
    inactive: { opacity: 0.6, scale: 0.95 },
    active: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="auth-modal-overlay">
        {/* Background Overlay */}
        <motion.div
          className="modal-backdrop"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="auth-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="modal-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>

          {/* Modal Header */}
          <motion.div
            className="modal-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="auth-tabs">
              <motion.button
                className={`tab-button ${
                  activeTab === 'login' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('login')}
                variants={tabVariants}
                animate={activeTab === 'login' ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                className={`tab-button ${
                  activeTab === 'signup' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('signup')}
                variants={tabVariants}
                animate={activeTab === 'signup' ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
            <motion.div
              className="tab-indicator"
              layoutId="activeTab"
              animate={{
                x: activeTab === 'login' ? 0 : '100%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </motion.div>

          {/* Modal Body */}
          <div className="modal-body">
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.form
                  key="login"
                  className="auth-form"
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div className="welcome-text" variants={itemVariants}>
                    <h2>Welcome Back!</h2>
                    <p>Please sign in to your account</p>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="email">Email Address</label>
                    <div className="input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                      <span className="input-icon">📧</span>
                    </div>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div className="form-options" variants={itemVariants}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="forgot-password">
                      Forgot Password?
                    </a>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        ⏳
                      </motion.div>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>

                  <motion.div className="social-login" variants={itemVariants}>
                    <p>Or continue with</p>
                    <div className="social-buttons">
                      <motion.button
                        type="button"
                        className="social-btn google"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🔍 Google
                      </motion.button>
                      <motion.button
                        type="button"
                        className="social-btn facebook"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        📘 Facebook
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  className="auth-form"
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div className="welcome-text" variants={itemVariants}>
                    <h2>Create Account</h2>
                    <p>Join us and start your journey</p>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="name">Full Name</label>
                    <div className="input-container">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                      <span className="input-icon">👤</span>
                    </div>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="signup-email">Email Address</label>
                    <div className="input-container">
                      <input
                        type="email"
                        id="signup-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                      <span className="input-icon">📧</span>
                    </div>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="signup-password">Password</label>
                    <div className="input-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="signup-password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div className="form-group" variants={itemVariants}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-container">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                      />
                      <span className="input-icon">🔒</span>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        ⏳
                      </motion.div>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>

                  <motion.div className="social-login" variants={itemVariants}>
                    <p>Or sign up with</p>
                    <div className="social-buttons">
                      <motion.button
                        type="button"
                        className="social-btn google"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🔍 Google
                      </motion.button>
                      <motion.button
                        type="button"
                        className="social-btn facebook"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        📘 Facebook
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AuthModal
