import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './HeroSection.css'
import videoBackground from '../../assets/machine.mp4'

const HeroSection = () => {
  // Add ref and useInView hook for viewport detection
  const heroRef = useRef(null)
  const videoRef = useRef(null) // Add a ref for the video element
  const isInView = useInView(heroRef, { once: false, amount: 0.3 })

  // Use useEffect to control video playback rate when it loads
  useEffect(() => {
    if (videoRef.current) {
      // Set the playback rate to slow down the video (values less than 1 slow it down)
      // 0.5 will make it play at half speed, 0.75 at three-quarters speed, etc.
      videoRef.current.playbackRate = 0.25 // Adjust this value to your preferred speed
    }
  }, [])

  // Animation variants
  const backgroundVariants = {
    hidden: { scale: 1 },
    animate: {
      scale: 1.05,
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 20px rgba(236, 72, 153, 0.4)',
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <div className="hero-container" ref={heroRef} id="hero">
      {/* Background animation */}
      <motion.div
        className="hero-background"
        initial="hidden"
        animate={isInView ? 'animate' : 'hidden'}
        variants={backgroundVariants}
      >
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          ref={videoRef} // Add the ref to the video element
        >
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="hero-overlay"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={overlayVariants}
      ></motion.div>

      {/* Content container */}
      <motion.div
        className="hero-content"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={contentVariants}
      >
        <motion.h1
          custom={0}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={textVariants}
        >
          Elevate Your Brand with Exquisite Woven Labels
        </motion.h1>

        <motion.p
          custom={1}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={textVariants}
        >
          Precision Craftsmanship. Unmatched Quality. Exceptional Service.
        </motion.p>

        <div className="hero-buttons">
          <motion.button
            className="hero-button primary-button"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Get a Free Quote
          </motion.button>
          <motion.button
            className="hero-button secondary-button"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Explore Our Products
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection
