import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './Footer.css'
import { useTheme } from '../../theme/ThemeContext'

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom animated marker component
const AnimatedMarker = () => {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Marker
      position={[22.5726, 88.3639]}
      icon={L.divIcon({
        className: `custom-marker ${bounce ? 'bounce' : ''}`,
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      })}
    >
      <Popup>
        <div>
          <h3>Bengal Label HQ</h3>
          <p>123 Label Street, Kolkata</p>
          <p>West Bengal, India</p>
        </div>
      </Popup>
    </Marker>
  )
}

// Animated map wrapper component
const AnimatedMap = ({ isInView }) => {
  const mapRef = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isInView && mapRef.current) {
      // Add animation to map tiles when they load
      const mapElement = mapRef.current
      if (mapElement && !isMapLoaded) {
        setIsMapLoaded(true)

        // Pan the map for animation effect when in view
        setTimeout(() => {
          if (mapElement && mapElement.leafletElement) {
            mapElement.leafletElement.setView(
              [22.5726, 88.3639],
              isMobile ? 12 : 13,
              {
                animate: true,
                duration: 1.5,
              }
            )

            // Force a resize event to ensure map renders correctly
            window.dispatchEvent(new Event('resize'))
          }
        }, 500)
      }
    }
  }, [isInView, isMapLoaded, isMobile])

  // Adjust zoom level for mobile
  const zoomLevel = isMobile ? 12 : 13

  return (
    <motion.div
      className="map-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{ duration: 0.8 }}
    >
      <MapContainer
        center={[22.5726, 88.3639]}
        zoom={zoomLevel}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '12px',
          minHeight: isMobile ? '250px' : '300px',
          position: 'relative',
          zIndex: 5,
        }}
        ref={mapRef}
        whenCreated={(map) => {
          mapRef.current = { leafletElement: map }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        <AnimatedMarker />
      </MapContainer>

      <motion.div
        className="map-overlay"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="map-card">
          <h3>Visit Our Office</h3>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            123 Label Street, Kolkata
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            +91 1234567890
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            info@bengallabel.com
          </p>
          <div className="social-icons">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#4267B2' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#1DA1F2' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#E1306C' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#0077B5' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Footer = () => {
  // Use ref and useInView hook for viewport detection
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.1 })
  const { theme } = useTheme() // Use our theme context

  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })

      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 3000)
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: 'var(--color-primary)',
      boxShadow: '0 0 0 2px var(--focus-ring)',
      transition: { duration: 0.3 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 6px 15px rgba(236, 72, 153, 0.3)',
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    success: {
      backgroundColor: '#10B981',
      transition: { duration: 0.3 },
    },
  }

  return (
    <footer className={`footer ${theme}-theme`} ref={footerRef} id="contact">
      <motion.div
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Map Section */}
        <motion.div
          className="footer-section map-section"
          variants={itemVariants}
        >
          <AnimatedMap isInView={isInView} />
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="footer-section contact-section"
          variants={itemVariants}
        >
          <h3>Contact Us</h3>
          <p>Get in touch with our team</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <motion.div className="form-group">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleInputChange}
                required
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            <motion.div className="form-group">
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleInputChange}
                required
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            <motion.div className="form-group">
              <motion.textarea
                name="message"
                placeholder="Your Message"
                value={formState.message}
                onChange={handleInputChange}
                required
                rows="3"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`submit-btn ${
                formStatus === 'success' ? 'success' : ''
              }`}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              disabled={formStatus === 'sending' || formStatus === 'success'}
            >
              {formStatus === 'sending' ? (
                <div className="loader"></div>
              ) : formStatus === 'success' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <motion.div
        className="footer-bottom"
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="footer-bottom-content">
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/legal">Legal Notice</a>
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="copyright">
            ©{new Date().getFullYear()} Bengal Label Inc. All rights reserved.
            Distributed by{' '}
            <a href="/" className="theme-link">
              Bengal Label
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="scroll-to-top"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
        </svg>
      </motion.div>
    </footer>
  )
}

export default Footer
