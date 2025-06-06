import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './TeamMember.css'
import Image10 from '../../assets/images/image10.jpeg'
import Image1 from '../../assets/images/image1.jpg'
import Image2 from '../../assets/images/image2.jpg'
import Image3 from '../../assets/images/image3.jpg'
import Image4 from '../../assets/images/image4.jpg'
import Image5 from '../../assets/images/image5.jpg'
import Image6 from '../../assets/images/image6.jpg'
import Image7 from '../../assets/images/image7.jpg'
import Image8 from '../../assets/images/image8.jpeg'
import Image9 from '../../assets/images/image9.jpg'

const TeamMembers = () => {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Mohammad Firoz Nayeem',
      role: 'Manager',
      department: 'Management Team',
      experience: '12 years',
      image: Image10,
      bio: 'Experienced manager with a proven track record of leading teams and driving business growth.',
      gradient: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mdfiroz@bengal.com',
      },
    },
    {
      id: 2,
      name: 'Prashan kr Jena',
      role: 'MuCad Designer',
      department: 'Design Team',
      experience: '12 years',
      image: Image1,
      bio: 'Leading innovative design solutions with passion for creating memorable brand experiences.',
      gradient: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'prashan@bengal.com',
      },
    },
    {
      id: 3,
      name: 'SK Naqib',
      role: 'Assistant Manager',
      department: 'Management Team',
      experience: '4 years',
      image: Image4,
      bio: 'Ensuring excellence in every product with meticulous attention to detail and quality standards.',
      gradient: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      social: {
        linkedin: '#',
        email: 'suresh@bengal.com',
      },
    },
    {
      id: 4,
      name: 'Sk Insan',
      role: 'Packing & Delivery Incharge',
      department: 'Packing Team',
      experience: '6 years',
      image: Image2,
      bio: 'Full-stack developer passionate about building scalable and efficient web applications.',
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      social: {
        linkedin: '#',
        github: '#',
        email: 'skinsan@bengallabel.com',
      },
    },
    {
      id: 5,
      name: 'Parsuram Rout',
      role: 'Production Incharge',
      department: 'Production Team',
      experience: '20 years',
      image: Image3,
      bio: 'Leading production team with expertise in managing production processes and ensuring quality standards.',
      gradient: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      social: {
        linkedin: '#',
        instagram: '#',
        email: 'parsuram@bengal.com',
      },
    },
    {
      id: 6,
      name: 'Basanta Poi',
      role: 'Operator',
      department: 'Production Team',
      experience: '16 years',
      image: Image5,
      bio: 'Ensuring smooth production and delivery processes.',
      gradient: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'basanta@bengal.com',
      },
    },
    {
      id: 7,
      name: 'Saikat Dutta',
      role: 'Operator',
      department: 'Production Team',
      experience: '13 years',
      image: Image6,
      bio: 'Ensuring smooth production and delivery processes.',
      gradient: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      social: {
        linkedin: '#',
        email: 'saikat@bengal.com',
      },
    },
    {
      id: 8,
      name: 'Biren Bera',
      role: 'Operator',
      department: 'Production Team',
      experience: '15 years',
      image: Image7,
      bio: 'Ensuring smooth production and delivery processes.',
      gradient: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'biren@bengal.com',
      },
    },
    {
      id: 9,
      name: 'Manab Pal',
      role: 'Cutfold Operator',
      department: 'Production Team',
      experience: '7 years',
      image: Image8,
      bio: 'Ensuring smooth production and delivery processes.',
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'biren@bengal.com',
      },
    },
    {
      id: 10,
      name: 'Anwar Ali',
      role: 'Packing Operator',
      department: 'Packing Team',
      experience: '7 years',
      image: Image9,
      bio: 'Ensuring smooth production and delivery processes.',
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'biren@bengal.com',
      },
    },
  ]

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition)
      return () =>
        scrollElement.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  // Unique Animation variants for Team Members
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

  const headerVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
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
      x: 100,
      y: 50,
      scale: 0.8,
      rotateY: 45,
    }),
    visible: (index) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    }),
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  }

  // New Unique Background Animation Variants
  const waveVariants = {
    animate: (index) => ({
      pathLength: [0, 1],
      pathOffset: [0, 1],
      transition: {
        duration: 3 + index,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  }

  const meshVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 90, 180, 270, 360],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  }

  const spiralVariants = {
    animate: (index) => ({
      rotate: [0, 360],
      scale: [0.8, 1.3, 0.8],
      x: [0, 50, -50, 0],
      y: [0, -30, 30, 0],
      transition: {
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  }

  const liquidVariants = {
    animate: {
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '40% 50% 60% 30% / 70% 50% 40% 30%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
      ],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const geometricVariants = {
    animate: (index) => ({
      rotate: [0, 120, 240, 360],
      scale: [1, 0.8, 1.2, 1],
      skewX: [0, 10, -10, 0],
      skewY: [0, -5, 5, 0],
      transition: {
        duration: 6 + index,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  }

  return (
    <section className="team-members-section" ref={ref} id="team-members">
      {/* Unique Background Elements for Team Members */}
      <div className="team-bg-container">
        {/* DNA Helix Animation */}
        <div className="dna-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`dna-${i}`}
              className={`dna-strand strand-${i % 2 === 0 ? 'left' : 'right'}`}
              animate={{
                y: [0, -1000],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 0.3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Matrix Rain Effect */}
        <div className="matrix-rain">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="matrix-column"
              style={{ left: `${i * 7}%` }}
              animate={{
                y: ['-100vh', '100vh'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            >
              {['⭐', '💫', '✨', '🌟', '💎'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        {/* Constellation Network */}
        <div className="constellation">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className={`constellation-star star-${i + 1}`}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Connecting Lines */}
          <svg className="constellation-lines" viewBox="0 0 1200 800">
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={`line-${i}`}
                x1={`${(i * 150) % 1200}`}
                y1={`${(i * 80) % 800}`}
                x2={`${((i + 1) * 150) % 1200}`}
                y2={`${((i + 1) * 80) % 800}`}
                stroke="rgba(236, 72, 153, 0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Floating Bubbles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className={`floating-bubble bubble-${i + 1}`}
            animate={{
              y: [800, -200],
              x: [
                Math.sin(i) * 100,
                Math.sin(i + 1) * 150,
                Math.sin(i + 2) * 200,
              ],
              scale: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Animated Grid Pattern */}
        <motion.div
          className="animated-grid"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className={`pulse-circle circle-${i + 1}`}
            animate={{
              scale: [0, 3, 0],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Energy Waves */}
        <div className="energy-waves">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className={`energy-wave wave-${i + 1}`}
              animate={{
                scaleX: [0, 1.5, 0],
                scaleY: [1, 0.5, 1],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="team-members-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div className="team-members-header" variants={headerVariants}>
          <motion.div
            className="team-members-icon"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌟
          </motion.div>
          <h2 className="team-members-title">Our Amazing Team</h2>
          <div className="title-decoration">
            <motion.div
              className="decoration-line"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="decoration-dot"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </div>
          <p className="team-members-subtitle">
            Meet the talented individuals who make Bengal Label's success
            possible
          </p>
        </motion.div>

        {/* Scroll Navigation */}
        <div className="scroll-navigation">
          <motion.button
            className={`scroll-btn scroll-left ${
              !canScrollLeft ? 'disabled' : ''
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.8 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </motion.button>

          <motion.button
            className={`scroll-btn scroll-right ${
              !canScrollRight ? 'disabled' : ''
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.8 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </motion.button>
        </div>

        {/* Team Cards Container */}
        <div className="team-scroll-container" ref={scrollRef}>
          <div className="team-cards-wrapper">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-member-card"
                variants={cardVariants}
                custom={index}
                onHoverStart={() => setHoveredCard(member.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Card Background Gradient */}
                <div className={`card-bg-gradient ${member.gradient}`} />

                {/* Member Image */}
                <div className="member-image-wrapper">
                  <motion.div
                    className="member-avatar"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <img src={member.image} alt={member.name} />
                    <motion.div
                      className="avatar-overlay"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredCard === member.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="role-emoji"
                        animate={{
                          rotate: hoveredCard === member.id ? 360 : 0,
                          scale: hoveredCard === member.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        ⭐
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Status Indicator */}
                  <motion.div
                    className="status-indicator"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Member Details */}
                <div className="member-details">
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

                  <motion.div
                    className="member-department"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="department-badge">
                      {member.department}
                    </span>
                    <span className="experience-badge">
                      {member.experience}
                    </span>
                  </motion.div>

                  <motion.p
                    className="member-bio"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {member.bio}
                  </motion.p>

                  {/* Social Links */}
                  <motion.div
                    className="member-social"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredCard === member.id ? 1 : 0,
                      y: hoveredCard === member.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(member.social).map(([platform, link]) => (
                      <motion.a
                        key={platform}
                        href={link}
                        className={`social-link ${platform}`}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {platform === 'linkedin' && '💼'}
                        {platform === 'twitter' && '🐦'}
                        {platform === 'github' && '💻'}
                        {platform === 'instagram' && '📸'}
                        {platform === 'email' && '✉️'}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                {/* Card Shine Effect */}
                <motion.div
                  className="card-shine"
                  animate={{
                    x: hoveredCard === member.id ? ['-100%', '100%'] : '-100%',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                />

                {/* Border Animation */}
                <motion.div
                  className="card-border-glow"
                  animate={{
                    opacity: hoveredCard === member.id ? 1 : 0,
                    scale: hoveredCard === member.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          className="team-stats-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="stat-card">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
            >
              {teamMembers.length}+
            </motion.h3>
            <p className="stat-label">Team Members</p>
          </div>

          <div className="stat-card">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1.9, type: 'spring', stiffness: 200 }}
            >
              5+
            </motion.h3>
            <p className="stat-label">Departments</p>
          </div>

          <div className="stat-card">
            <motion.h3
              className="stat-number"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 2.1, type: 'spring', stiffness: 200 }}
            >
              {teamMembers.reduce(
                (total, member) =>
                  total + Number(member.experience.split(' ')[0]),
                0
              )}
              +
            </motion.h3>
            <p className="stat-label">Years Experience</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TeamMembers
