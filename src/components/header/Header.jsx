import React, { useState, useEffect, useRef } from 'react'
import './Header.css'
import { useTheme } from '../../theme/ThemeContext'

const ResponsiveHeader = () => {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobile, setIsMobile] = useState(false)

  // Use a ref to track if we're in a click transition to prevent flickering
  const clickTransitionRef = useRef(false)
  const headerRef = useRef(null)

  useEffect(() => {
    setAnimated(true)

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Function to determine which section is currently in view
    const handleScroll = () => {
      // Don't update active section during click transition to prevent flickering
      if (clickTransitionRef.current) return

      const sections = [
        'hero',
        'journey',
        'features',
        'testimonials',
        'team',
        'contact',
      ]

      // Find the section that is currently in view
      const current =
        sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // The section is considered in view if its top is within the viewport
            // or if its top is above but still filling a significant part of the viewport
            return rect.top <= 100 && rect.bottom >= 300
          }
          return false
        }) || 'hero' // Default to 'hero' if no section is found

      setActiveSection(current)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Call it once to set the initial active section
    handleScroll()

    // Handle clicks outside mobile menu to close it
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Clean up all event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Smooth scroll function with improved transition handling
  const scrollToSection = (sectionId, event) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)

    if (section) {
      if (menuOpen) {
        setMenuOpen(false)
      }

      // Set active section immediately to prevent flickering
      setActiveSection(sectionId)

      // Set the clickTransition flag to prevent scroll updates during transition
      clickTransitionRef.current = true

      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' })

      // Reset the flag after animation completes
      setTimeout(() => {
        clickTransitionRef.current = false
      }, 1000) // 1 second should cover most scroll animations
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
  }

  // Handle app link click
  const handleAppLinkClick = () => {
    // Close mobile menu if open
    if (menuOpen) {
      setMenuOpen(false)
    }

    // You can replace this URL with your actual app URL
    window.open('https://your-app-url.com', '_blank')
    // Or use: window.location.href = 'https://your-app-url.com' to open in same tab
  }

  // Animated Logo Component
  const AnimatedLogo = () => (
    <div className="animated-logo">
      <svg viewBox="0 0 50 50" className="logo-svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-secondary)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Circle with Animation */}
        <circle
          cx="25"
          cy="25"
          r="22"
          fill="url(#logoGradient)"
          stroke="white"
          strokeWidth="2"
          className="logo-circle"
          filter="url(#glow)"
        />

        {/* Floating Particles */}
        <circle
          cx="15"
          cy="12"
          r="1.5"
          fill="white"
          opacity="0.6"
          className="particle particle-1"
        />
        <circle
          cx="38"
          cy="15"
          r="1"
          fill="white"
          opacity="0.4"
          className="particle particle-2"
        />
        <circle
          cx="12"
          cy="38"
          r="1"
          fill="white"
          opacity="0.5"
          className="particle particle-3"
        />
        <circle
          cx="38"
          cy="38"
          r="1.5"
          fill="white"
          opacity="0.3"
          className="particle particle-4"
        />

        {/* BL Text */}
        <text
          x="25"
          y="32"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          className="logo-text"
        >
          BL
        </text>

        {/* Rotating Ring */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="5,10"
          className="rotating-ring"
        />
      </svg>
    </div>
  )

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${theme ? 'dark' : 'light'} ${
          animated ? 'animated' : ''
        }`}
      >
        <div className="header-container">
          {/* Left section - Logo with Bengal Label */}
          <div className="logo-container">
            <a
              href="#hero"
              className="logo-link"
              onClick={(e) => scrollToSection('hero', e)}
              onMouseDown={handleMouseDown}
            >
              <AnimatedLogo />
              <span className="logo-text-main">Bengal Label</span>
            </a>
          </div>

          {/* Mobile menu button - only visible on mobile */}
          <div className="mobile-menu-button" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Mobile dark mode toggle - only visible on mobile */}
          {isMobile && (
            <button
              className="dark-mode-toggle mobile-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}

          {/* Center section - Menu items (shown on all screen sizes) */}
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection('hero', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'hero' ? 'active' : ''}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#journey"
                  onClick={(e) => scrollToSection('journey', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'journey' ? 'active' : ''}
                >
                  Our Journey
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => scrollToSection('features', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'features' ? 'active' : ''}
                >
                  Our Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => scrollToSection('testimonials', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'testimonials' ? 'active' : ''}
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => scrollToSection('team', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'team' ? 'active' : ''}
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection('contact', e)}
                  onMouseDown={handleMouseDown}
                  className={activeSection === 'contact' ? 'active' : ''}
                >
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Mobile app button - Only visible in mobile menu */}
            <div className={`mobile-app-button ${menuOpen ? 'active' : ''}`}>
              <button className="app-button" onClick={handleAppLinkClick}>
                🚀 Launch App
              </button>
            </div>
          </nav>

          {/* Right section - App Button & Dark Mode for desktop */}
          <div className="app-container">
            {/* Desktop app button */}
            <div className="desktop-app-button">
              <button className="app-button" onClick={handleAppLinkClick}>
                🚀 Launch App
              </button>

              {/* Desktop dark mode toggle - Only visible on desktop */}
              {!isMobile && (
                <button
                  className="dark-mode-toggle desktop-toggle"
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default ResponsiveHeader
