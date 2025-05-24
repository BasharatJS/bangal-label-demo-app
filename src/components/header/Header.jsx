import React, { useState, useEffect } from 'react'
import './Header.css'
import { useTheme } from '../../theme/ThemeContext'
import AuthModal from '../auth-modal/AuthModal'

const ResponsiveHeader = () => {
  const { theme, toggleTheme } = useTheme() // Use our theme context

  const [menuOpen, setMenuOpen] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState('login')

  useEffect(() => {
    setAnimated(true)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const openAuthModal = (tab) => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
    // Close mobile menu if open
    setMenuOpen(false)
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
  }

  return (
    <>
      <header
        className={`header ${theme ? 'dark' : 'light'} ${
          animated ? 'animated' : ''
        }`}
      >
        <div className="header-container">
          {/* Left section - Logo */}
          <div className="logo-container">
            <a href="/" className="logo">
              Woven Label
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Center section - Menu items */}
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/explore">Explore</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
            </ul>
          </nav>

          {/* Right section - Authentication & Dark Mode */}
          <div className={`auth-container ${menuOpen ? 'active' : ''}`}>
            <button
              className="auth-button login"
              onClick={() => openAuthModal('login')}
            >
              Login
            </button>
            <button
              className="auth-button signup"
              onClick={() => openAuthModal('signup')}
            >
              Sign Up
            </button>
            <button
              className="dark-mode-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        initialTab={authModalTab}
      />
    </>
  )
}

export default ResponsiveHeader
