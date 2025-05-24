import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './OurJourney.css'

const OurJourney = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Journey data
  const journeyData = [
    {
      id: 1,
      year: '1970',
      title: 'The Foundation',
      description:
        'Hazi Saheb and Manick Haldar established the garment business, laying the foundation for what would become a multi-generational enterprise in the textile industry.',
      icon: '🏗️',
      position: 'left',
    },
    {
      id: 2,
      year: '1980s-90s',
      title: 'Learning & Growth',
      description:
        'Borhan Haldar and Imran Haldar joined the family business, gaining invaluable experience and knowledge in garment manufacturing that would shape their future vision.',
      icon: '📚',
      position: 'right',
    },
    {
      id: 3,
      year: '2000s',
      title: 'Industry Experience',
      description:
        'Abd Sarfraj Khan accumulated over 10 years of specialized experience in the woven label industry, developing expertise and identifying market opportunities.',
      icon: '⚙️',
      position: 'left',
    },
    {
      id: 4,
      year: '2020',
      title: 'The Conversation',
      description:
        'A pivotal discussion between friends Borhan Haldar and Abd Sarfraj Khan about business opportunities led to the decision to venture into label manufacturing.',
      icon: '💭',
      position: 'right',
    },
    {
      id: 5,
      year: '2021',
      title: 'Bengal Label Born',
      description:
        'After careful consideration and leveraging combined expertise, Borhan Haldar and Abd Sarfraj Khan partnered to establish Bengal Label, focusing on high-quality woven and printed labels.',
      icon: '🚀',
      position: 'left',
    },
    {
      id: 6,
      year: 'Present',
      title: 'Dual Excellence',
      description:
        'Today we continue to operate and grow our established garment business while building Bengal Label into a leading manufacturer of premium woven and printed labels.',
      icon: '🌟',
      position: 'right',
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  const timelineVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: (position) => ({
      opacity: 0,
      x: position === 'left' ? -100 : 100,
      y: 30,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const yearVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  return (
    <section className="journey-section" ref={ref}>
      <motion.div
        className="journey-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="journey-header" variants={titleVariants}>
          <h2 className="journey-title">Our Journey</h2>
          <div className="journey-subtitle-line"></div>
          <p className="journey-subtitle">
            From a family garment business established in 1970 to the birth of
            Bengal Label - discover the legacy, friendship, and vision that
            shaped our story
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="timeline-container">
          {/* Central Timeline Line */}
          <motion.div
            className="timeline-line"
            variants={timelineVariants}
          ></motion.div>

          {/* Journey Items */}
          <div className="timeline-items">
            {journeyData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`timeline-item ${item.position}`}
                variants={itemVariants}
                custom={item.position}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Timeline Icon */}
                <motion.div
                  className="timeline-icon"
                  variants={iconVariants}
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <span className="icon-emoji">{item.icon}</span>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="timeline-content"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index + 0.8,
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 15px 30px rgba(236, 72, 153, 0.2)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div className="timeline-year" variants={yearVariants}>
                    {item.year}
                  </motion.div>

                  <motion.h3
                    className="timeline-item-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * index + 1,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    className="timeline-item-description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * index + 1.2,
                    }}
                  >
                    {item.description}
                  </motion.p>

                  {/* Decorative Arrow */}
                  <div className={`timeline-arrow ${item.position}`}></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="journey-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            className="journey-cta-button"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default OurJourney
