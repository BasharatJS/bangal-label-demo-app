import React from 'react'
import { motion } from 'framer-motion'
import './Card.css'

const Card = ({ image, title, description, index }) => {
  // Animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="card"
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <div className="card-image-container">
        <motion.img
          src={image}
          alt={title}
          className="card-image"
          variants={imageVariants}
        />
        <div className="card-overlay">
          <motion.div
            className="card-icon"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
          >
            <span>+</span>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="card-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="card-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="card-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {description}
        </motion.p>
        <motion.button
          className="card-button"
          whileHover={{
            scale: 1.05,
            backgroundColor: '#d946ef',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Card
