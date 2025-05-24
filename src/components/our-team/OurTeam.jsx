import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './OurTeam.css'

const OurTeam = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredCard, setHoveredCard] = useState(null)

  // Team data
  const teamMembers = [
    {
      id: 1,
      name: 'Abd Sarfraj Khan',
      role: 'Co-Founder & Technical Director',
      experience: '10+ years of experience in the woven label industry',
      description:
        'Leading expert in woven label manufacturing with deep industry knowledge and innovative manufacturing techniques.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      specialties: [
        'Label Manufacturing',
        'Quality Control',
        'Production Management',
        'Technical Innovation',
      ],
      gradient: 'from-blue-500 to-purple-600',
      icon: '⚙️',
    },
    {
      id: 2,
      name: 'Borhan Haldar',
      role: 'Co-Founder & Business Director',
      experience:
        '30+ years of combined experience in garment and accessories industry',
      description:
        'Visionary leader with extensive experience in garment business, bringing strategic insight and industry connections.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      specialties: [
        'Business Strategy',
        'Client Relations',
        'Market Development',
        'Industry Partnerships',
      ],
      gradient: 'from-purple-500 to-pink-600',
      icon: '💼',
    },
    {
      id: 3,
      name: 'Imran Haldar',
      role: 'Operations Director',
      experience:
        'Multi-generational expertise from the family garment business legacy',
      description:
        'Bringing family legacy and operational excellence to ensure smooth production and delivery processes.',
      image:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
      specialties: [
        'Operations Management',
        'Supply Chain',
        'Process Optimization',
        'Team Leadership',
      ],
      gradient: 'from-green-500 to-blue-600',
      icon: '📊',
    },
  ]

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
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 60,
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.8,
      rotateY: index % 2 === 0 ? -15 : 15,
    }),
    visible: (index) => ({
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: index * 0.2,
      },
    }),
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      x: [-5, 5, -5],
      rotate: [-3, 3, -3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const iconVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="team-section" ref={ref}>
      {/* Background Elements */}
      <div className="team-bg">
        <motion.div
          className="team-bg-element team-bg-1"
          variants={floatingVariants}
          animate="animate"
        ></motion.div>
        <motion.div
          className="team-bg-element team-bg-2"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        ></motion.div>
        <motion.div
          className="team-bg-element team-bg-3"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        ></motion.div>
      </div>

      <motion.div
        className="team-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="team-header" variants={titleVariants}>
          <motion.div
            className="team-icon"
            variants={iconVariants}
            animate="animate"
          >
            👥
          </motion.div>
          <h2 className="team-title">Our Team</h2>
          <div className="team-subtitle-line"></div>
          <p className="team-subtitle">
            Meet the visionary leaders and experienced professionals driving
            Bengal Label's success with decades of combined expertise
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card"
              variants={cardVariants}
              custom={index}
              onHoverStart={() => setHoveredCard(member.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{
                y: -20,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              {/* Card Background Gradient */}
              <div className={`card-gradient ${member.gradient}`}></div>

              {/* Member Image */}
              <div className="member-image-container">
                <motion.div
                  className="member-image"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <img src={member.image} alt={member.name} />
                  <div className="image-overlay">
                    <motion.div
                      className="role-icon"
                      animate={{
                        rotate: hoveredCard === member.id ? 360 : 0,
                        scale: hoveredCard === member.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {member.icon}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Member Info */}
              <div className="member-info">
                <motion.h3
                  className="member-name"
                  layoutId={`name-${member.id}`}
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  className="member-role"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {member.role}
                </motion.p>

                <motion.p
                  className="member-experience"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {member.experience}
                </motion.p>

                <motion.p
                  className="member-description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {member.description}
                </motion.p>

                {/* Specialties */}
                <motion.div
                  className="member-specialties"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <h4 className="specialties-title">Specialties:</h4>
                  <div className="specialties-list">
                    {member.specialties.map((specialty, specIndex) => (
                      <motion.span
                        key={specIndex}
                        className="specialty-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.7 + index * 0.1 + specIndex * 0.05,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                          transition: { duration: 0.2 },
                        }}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="card-hover-overlay"
                variants={overlayVariants}
                initial="hidden"
                animate={hoveredCard === member.id ? 'visible' : 'hidden'}
              >
                <motion.div
                  className="connect-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect
                </motion.div>
              </motion.div>

              {/* Card Border Animation */}
              <motion.div
                className="card-border"
                animate={{
                  opacity: hoveredCard === member.id ? 1 : 0,
                  scale: hoveredCard === member.id ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          className="team-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
            >
              40+
            </motion.h3>
            <p className="stat-label">Years Combined Experience</p>
          </div>

          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.9, type: 'spring', stiffness: 200 }}
            >
              3
            </motion.h3>
            <p className="stat-label">Industry Experts</p>
          </div>

          <div className="stat-item">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 2.1, type: 'spring', stiffness: 200 }}
            >
              1970
            </motion.h3>
            <p className="stat-label">Legacy Since</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default OurTeam
