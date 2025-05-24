import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Card from '../cards/Card'
import './CardGrid.css'

const CardGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Sample data for 6 cards
  const cardsData = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1579279263245-bbf82b50092f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d292ZW4lMjBsYWJlbHxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Premium Woven Labels',
      description:
        'Crafted with precision and attention to detail, our woven labels elevate your brand with superior quality and durability.',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1731036329820-74e286b68cc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvdmVuJTIwbGFiZWx8ZW58MHx8MHx8fDA%3D',
      title: 'Custom Design Solutions',
      description:
        'From concept to creation, we bring your vision to life with personalized designs that reflect your brand identity.',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1657212458073-d83c97ac65d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdvdmVuJTIwbGFiZWx8ZW58MHx8MHx8fDA%3D',
      title: 'Fast Turnaround',
      description:
        'Meet your deadlines with our efficient production process and quick delivery without compromising on quality.',
    },
    {
      id: 4,
      image:
        'https://cruzlabel.com/cdn/shop/products/IMG_0124_2000x2000.jpg?v=1633186947',
      title: 'Sustainable Materials',
      description:
        'Eco-friendly production using sustainable materials and processes that care for both your brand and the environment.',
    },
    {
      id: 5,
      image:
        'https://img.freepik.com/free-vector/black-cloth-labels-premium-apparel-brand-tags_107791-2868.jpg?semt=ais_hybrid&w=740',
      title: 'Industry Expertise',
      description:
        'Decades of experience in textile manufacturing ensuring the highest standards and innovative solutions for your needs.',
    },
    {
      id: 6,
      image:
        'https://img.freepik.com/free-vector/blue-pink-fabric-tag-cloth-labels-textile_107791-2852.jpg',
      title: 'Global Reach',
      description:
        'Serving clients worldwide with consistent quality and reliable service that builds lasting business relationships.',
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const underlineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.7,
        ease: 'easeOut',
      },
    },
  }

  // Card variants with alternating side entrances
  const getCardVariants = (index) => {
    const isEven = index % 2 === 0
    const direction = isEven ? -1 : 1 // Left for even, right for odd

    return {
      hidden: {
        opacity: 0,
        x: direction * 100,
        y: 30,
        scale: 0.8,
        rotateY: direction * 15,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          duration: 0.8,
          delay: index * 0.1,
        },
      },
    }
  }

  // Background animation variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="card-section" ref={ref}>
      {/* Animated Background Elements */}
      <motion.div
        className="card-section-bg"
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="floating-element floating-1"
          variants={floatingVariants}
          animate="animate"
        ></motion.div>
        <motion.div
          className="floating-element floating-2"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        ></motion.div>
        <motion.div
          className="floating-element floating-3"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        ></motion.div>
      </motion.div>

      <motion.div
        className="section-title-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2 className="section-title" variants={titleVariants}>
          Our Features
        </motion.h2>

        <motion.div
          className="title-underline"
          variants={underlineVariants}
        ></motion.div>

        <motion.p
          className="section-description"
          variants={descriptionVariants}
        >
          Discover the powerful features and services that make Bengal Label
          your trusted partner in premium woven and printed labels
        </motion.p>
      </motion.div>

      <motion.div
        className="card-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {cardsData.map((card, index) => (
          <motion.div
            className="card-grid-item"
            key={card.id}
            variants={getCardVariants(index)}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        className="card-section-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.h3
          className="cta-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          Ready to Elevate Your Brand?
        </motion.h3>

        <motion.p
          className="cta-description"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 1.9 }}
        >
          Let's create something amazing together
        </motion.p>

        <motion.button
          className="cta-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 0.6,
            delay: 2.1,
            type: 'spring',
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Today
        </motion.button>
      </motion.div>
    </section>
  )
}

export default CardGrid
