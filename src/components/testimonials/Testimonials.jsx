import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Creative Director',
      company: 'Fashion Forward Inc.',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b812c1c4?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      text: 'Bengal Label has transformed our brand identity with their exceptional woven labels. The quality and attention to detail are simply outstanding. Our customers constantly compliment the premium feel of our products.',
      location: 'New York, USA',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Brand Manager',
      company: 'Urban Style Co.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      text: 'Working with Bengal Label has been a game-changer for our business. Their innovative designs and quick turnaround times have helped us stay ahead in the competitive fashion market. Highly recommended!',
      location: 'Los Angeles, USA',
    },
    {
      id: 3,
      name: 'Emma Williams',
      position: 'Founder & CEO',
      company: 'Sustainable Threads',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      text: 'The team at Bengal Label understands our vision for sustainable fashion. Their eco-friendly label options and commitment to quality have made them our go-to partner for all labeling needs.',
      location: 'London, UK',
    },
    {
      id: 4,
      name: 'David Rodriguez',
      position: 'Product Manager',
      company: 'Elite Garments',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      text: 'Bengal Label delivers excellence in every order. Their precision in manufacturing and ability to handle complex designs has elevated our product line significantly. True professionals!',
      location: 'Mumbai, India',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Design Lead',
      company: 'Luxury Labels Ltd.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      text: 'From concept to delivery, Bengal Label exceeds expectations. Their customer service is exceptional, and the final products always surpass our quality standards. A reliable partner indeed!',
      location: 'Toronto, Canada',
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    )
  }

  const goToPrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const currentTestimonial = testimonials[currentIndex]
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    goToNext()
  }

  const handlePrev = () => {
    setDirection(-1)
    goToPrev()
  }

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    goToSlide(index)
  }

  return (
    <section className="testimonials-section" ref={ref}>
      {/* Background Elements */}
      <div className="testimonials-bg">
        <motion.div
          className="bg-element bg-element-1"
          variants={floatingVariants}
          animate="animate"
        ></motion.div>
        <motion.div
          className="bg-element bg-element-2"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        ></motion.div>
        <motion.div
          className="bg-element bg-element-3"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        ></motion.div>
      </div>

      <motion.div
        className="testimonials-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="testimonials-header" variants={titleVariants}>
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <div className="testimonials-subtitle-line"></div>
          <p className="testimonials-subtitle">
            Discover why leading brands trust Bengal Label for their premium
            woven and printed label needs
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="testimonials-carousel">
          <div
            className="testimonials-wrapper"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <motion.button
              className="nav-button nav-prev"
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>‹</span>
            </motion.button>

            <motion.button
              className="nav-button nav-next"
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>›</span>
            </motion.button>

            {/* Testimonial Card */}
            <div className="testimonial-track">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="testimonial-card"
                >
                  <div className="testimonial-content">
                    {/* Quote Icon */}
                    <motion.div
                      className="quote-icon"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <span>"</span>
                    </motion.div>

                    {/* Rating Stars */}
                    <motion.div
                      className="rating"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="star"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.p
                      className="testimonial-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {currentTestimonial.text}
                    </motion.p>

                    {/* Client Info */}
                    <motion.div
                      className="client-info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="client-avatar">
                        <motion.img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.9,
                            type: 'spring',
                            stiffness: 200,
                          }}
                        />
                      </div>
                      <div className="client-details">
                        <h4 className="client-name">
                          {currentTestimonial.name}
                        </h4>
                        <p className="client-position">
                          {currentTestimonial.position}
                        </p>
                        <p className="client-company">
                          {currentTestimonial.company}
                        </p>
                        <p className="client-location">
                          {currentTestimonial.location}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <motion.div
            className="testimonials-dots"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="dot-inner"></span>
              </motion.button>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className="progress-container">
            <motion.div
              className="progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0,
              }}
              key={currentIndex}
            ></motion.div>
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          className="testimonials-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.4 }}
        >
          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
            >
              500+
            </motion.h3>
            <p className="stat-label">Happy Clients</p>
          </div>
          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
            >
              98%
            </motion.h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 2.0, type: 'spring', stiffness: 200 }}
            >
              1M+
            </motion.h3>
            <p className="stat-label">Labels Delivered</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Testimonials
