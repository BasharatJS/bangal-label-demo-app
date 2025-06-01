import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './TeamSupport.css'
import SupportImage1 from '../../assets/images/Hazi-Saheb.jpg'
import SupportImage2 from '../../assets/images/ImranHalder.jpg'
import SupportImage3 from '../../assets/images/BangalLabel.png'

const TeamSupport = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [selectedMember, setSelectedMember] = useState(null)
  const [activeCard, setActiveCard] = useState(null)

  // Support team data
  const supportTeam = [
    {
      id: 1,
      name: 'Hazi Saheb',
      role: 'Customer Success Manager',
      department: 'Customer Support',
      experience: '48+ years',
      description:
        'Dedicated to ensuring exceptional customer experiences and building long-lasting relationships with our clients.',
      image: SupportImage1,
      specialties: [
        'Customer Relations',
        'Problem Solving',
        'Team Coordination',
        'Process Improvement',
      ],
      achievements: [
        '98% Customer Satisfaction',
        '500+ Resolved Cases',
        'Team Leadership Award',
      ],
      gradient: 'from-cyan-400 to-blue-500',
      accentColor: '#06b6d4',
      icon: '🎯',
      // pattern: 'hexagon',
      pattern: 'diamond',
    },
    {
      id: 2,
      name: 'Imran Halder',
      role: 'Technical Support Lead',
      department: 'Technical Support',
      experience: '10+ years',
      description:
        'Expert in resolving complex technical issues and maintaining seamless operations for optimal productivity.',
      image: SupportImage2,
      specialties: [
        'Technical Troubleshooting',
        'System Maintenance',
        'Documentation',
        'Training & Development',
      ],
      achievements: [
        '99.5% System Uptime',
        'Expert Certification',
        'Innovation Award 2024',
      ],
      gradient: 'from-violet-400 to-purple-500',
      accentColor: '#8b5cf6',
      icon: '⚡',
      // pattern: 'circle',
      pattern: 'diamond',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Operations Coordinator',
      department: 'Operations Support',
      experience: '6+ years',
      description:
        'Streamlining operations and ensuring efficient workflow coordination across all departments.',
      image: SupportImage3,
      specialties: [
        'Operations Management',
        'Workflow Optimization',
        'Cross-team Collaboration',
        'Quality Assurance',
      ],
      achievements: [
        '35% Efficiency Increase',
        'Process Excellence Award',
        'Team Collaboration Leader',
      ],
      gradient: 'from-emerald-400 to-green-500',
      accentColor: '#10b981',
      icon: '📊',
      pattern: 'diamond',
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
      scale: 0.5,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 12,
        duration: 1.2,
      },
    },
  }

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      scale: 0.3,
      y: 100,
      rotateZ: index === 1 ? 0 : index === 0 ? -45 : 45,
      filter: 'blur(10px)',
    }),
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        delay: index * 0.4,
        duration: 0.8,
      },
    }),
  }

  const imageVariants = {
    hover: {
      scale: 1.15,
      rotateY: 15,
      rotateX: 10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const orbitalVariants = {
    animate: (index) => ({
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        rotate: {
          duration: 8 + index * 2,
          repeat: Infinity,
          ease: 'linear',
        },
        scale: {
          duration: 3 + index,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    }),
  }

  const particleVariants = {
    animate: {
      y: [-20, -60, -20],
      x: [-10, 10, -10],
      opacity: [0.7, 1, 0.7],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const morphVariants = {
    animate: {
      borderRadius: [
        '30% 70% 70% 30% / 30% 30% 70% 70%',
        '70% 30% 30% 70% / 70% 70% 30% 30%',
        '30% 70% 70% 30% / 30% 30% 70% 70%',
      ],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="support-section" ref={ref} id="support">
      {/* Dynamic Background */}
      <div className="support-bg">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`support-particle particle-${i + 1}`}
            variants={particleVariants}
            animate="animate"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}

        <motion.div
          className="morph-bg"
          variants={morphVariants}
          animate="animate"
        />

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbital-${i}`}
            className={`orbital-ring ring-${i + 1}`}
            variants={orbitalVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      <motion.div
        className="support-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="support-header" variants={titleVariants}>
          <motion.div
            className="support-icon-container"
            animate={{
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="support-icon">🚀</span>
          </motion.div>

          <h2 className="support-title">Support Excellence</h2>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView
                ? { width: '120px', opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="underline-dot"
              animate={{
                x: [-60, 60, -60],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <p className="support-subtitle">
            Our dedicated support team ensures your success every step of the
            way
          </p>
        </motion.div>

        {/* Support Team Grid */}
        <div className="support-grid">
          {supportTeam.map((member, index) => (
            <motion.div
              key={member.id}
              className={`support-card ${member.pattern} ${
                activeCard === member.id ? 'active' : ''
              }`}
              variants={cardVariants}
              custom={index}
              onHoverStart={() => {
                setActiveCard(member.id)
                setSelectedMember(member.id)
              }}
              onHoverEnd={() => {
                setActiveCard(null)
                setSelectedMember(null)
              }}
              whileHover={{
                y: -25,
                scale: 1.05,
                rotateX: 5,
                rotateY: index === 1 ? 0 : index === 0 ? 5 : -5,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              {/* Card Pattern Background */}
              <div className={`card-pattern pattern-${member.pattern}`} />

              {/* Card Gradient */}
              <div
                className="card-gradient"
                style={{
                  background: `linear-gradient(135deg, ${member.accentColor}15, ${member.accentColor}25)`,
                }}
              />

              {/* Member Image with 3D Effect */}
              <div className="member-image-container">
                <motion.div
                  className="image-frame"
                  animate={{
                    boxShadow:
                      selectedMember === member.id
                        ? `0 20px 40px ${member.accentColor}40`
                        : `0 10px 20px ${member.accentColor}20`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="member-image"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <img src={member.image} alt={member.name} />

                    {/* Floating Icon */}
                    <motion.div
                      className="floating-icon"
                      animate={{
                        y: selectedMember === member.id ? [-5, 5, -5] : [0],
                        rotate:
                          selectedMember === member.id ? [0, 10, -10, 0] : [0],
                        scale: selectedMember === member.id ? [1, 1.2, 1] : [1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: selectedMember === member.id ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                      style={{ color: member.accentColor }}
                    >
                      {member.icon}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Experience Badge */}
                <motion.div
                  className="experience-badge"
                  style={{
                    background: `linear-gradient(135deg, ${member.accentColor}, ${member.accentColor}80)`,
                  }}
                  animate={{
                    scale: selectedMember === member.id ? [1, 1.1, 1] : [1],
                    rotate: selectedMember === member.id ? [0, 5, -5, 0] : [0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: selectedMember === member.id ? Infinity : 0,
                  }}
                >
                  {member.experience}
                </motion.div>
              </div>

              {/* Member Info */}
              <div className="member-info">
                <motion.h3
                  className="member-name"
                  style={{ color: member.accentColor }}
                  layoutId={`support-name-${member.id}`}
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  className="member-role"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {member.role}
                </motion.p>

                <motion.div
                  className="member-department"
                  style={{ borderColor: member.accentColor }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  {member.department}
                </motion.div>

                <motion.p
                  className="member-description"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                >
                  {member.description}
                </motion.p>

                {/* Specialties with Stagger Animation */}
                <motion.div
                  className="member-specialties"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                >
                  <h4 className="specialties-title">Core Specialties</h4>
                  <div className="specialties-grid">
                    {member.specialties.map((specialty, specIndex) => (
                      <motion.span
                        key={specIndex}
                        className="specialty-chip"
                        style={{ borderColor: member.accentColor }}
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          delay: 0.9 + index * 0.2 + specIndex * 0.1,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: member.accentColor,
                          color: 'white',
                          x: 5,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  className="member-achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: selectedMember === member.id ? 1 : 0,
                    y: selectedMember === member.id ? 0 : 20,
                    height: selectedMember === member.id ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <h4 className="achievements-title">Key Achievements</h4>
                  <div className="achievements-list">
                    {member.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        className="achievement-item"
                        style={{ color: member.accentColor }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                          opacity: selectedMember === member.id ? 1 : 0,
                          x: selectedMember === member.id ? 0 : -30,
                        }}
                        transition={{
                          delay: achIndex * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <span className="achievement-icon">★</span>
                        {achievement}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Interactive Hover Elements */}
              <motion.div
                className="card-glow"
                style={{
                  background: `radial-gradient(circle at center, ${member.accentColor}40, transparent 70%)`,
                }}
                animate={{
                  opacity: selectedMember === member.id ? 0.6 : 0,
                  scale: selectedMember === member.id ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Animated Border */}
              <motion.div
                className="animated-border"
                style={{
                  background: `conic-gradient(from 0deg, ${member.accentColor}, transparent, ${member.accentColor})`,
                }}
                animate={{
                  rotate: selectedMember === member.id ? [0, 360] : [0],
                  opacity: selectedMember === member.id ? 1 : 0,
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: selectedMember === member.id ? Infinity : 0,
                    ease: 'linear',
                  },
                  opacity: { duration: 0.3 },
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Support Stats with Unique Counter Animation */}
        <motion.div
          className="support-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ scale: 0, rotate: -180 }}
              animate={
                isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
              }
              transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
            >
              24/7
            </motion.h3>
            <p className="stat-label">Support Available</p>
          </motion.div>

          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ scale: 0, rotate: 180 }}
              animate={
                isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }
              }
              transition={{ delay: 2.4, type: 'spring', stiffness: 200 }}
            >
              &lt;2min
            </motion.h3>
            <p className="stat-label">Response Time</p>
          </motion.div>

          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ scale: 0, rotate: -180 }}
              animate={
                isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
              }
              transition={{ delay: 2.6, type: 'spring', stiffness: 200 }}
            >
              99.8%
            </motion.h3>
            <p className="stat-label">Satisfaction Rate</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TeamSupport
