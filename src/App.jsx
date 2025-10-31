import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Array of Merica character poses
  const mericaPoses = [
    '/Images/Merica/Merica Idle.png',
    '/Images/Merica/Merica head slightly left.png',
    '/Images/Merica/Merica head right.png',
    '/Images/Merica/Merica head slightly left blink.png'
  ]

  // State to track current pose
  const [currentPose, setCurrentPose] = useState(mericaPoses[0])

  // Array of customer images for carousel (3 real + 2 placeholders)
  const carouselImages = [
    { src: '/Images/customer images/barber & burnout.jpg', alt: 'Barber & Burnout custom design', isPlaceholder: false },
    { src: "/Images/customer images/Dorman '25 picnic.png", alt: "Customer design at Dorman '25 picnic", isPlaceholder: false },
    { src: '/Images/customer images/Strongside kettlebell.png', alt: 'Strongside kettlebell custom design', isPlaceholder: false },
    { src: '', alt: 'Placeholder 4', isPlaceholder: true },
    { src: '', alt: 'Placeholder 5', isPlaceholder: true }
  ]

  // State to track current carousel index
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  // Preload all images on component mount
  useEffect(() => {
    mericaPoses.forEach((pose) => {
      const img = new Image()
      img.src = pose
    })
  }, [])

  // Random pose change logic
  useEffect(() => {
    const getRandomInterval = () => {
      // Random interval between 8-15 seconds (8000-15000ms)
      return Math.floor(Math.random() * 7000) + 8000
    }

    const changeRandomPose = () => {
      setCurrentPose((prevPose) => {
        // Create array of poses excluding current pose
        const otherPoses = mericaPoses.filter((pose) => pose !== prevPose)

        // Weighted selection: 50% chance to return to Idle, 50% for other poses
        const shouldReturnToIdle = Math.random() < 0.5
        const idlePose = mericaPoses[0]

        if (shouldReturnToIdle && prevPose !== idlePose) {
          return idlePose
        } else {
          // Select random pose from other poses
          const randomIndex = Math.floor(Math.random() * otherPoses.length)
          return otherPoses[randomIndex]
        }
      })

      // Schedule next change with new random interval
      const nextInterval = getRandomInterval()
      timeoutId = setTimeout(changeRandomPose, nextInterval)
    }

    // Initial timeout
    let timeoutId = setTimeout(changeRandomPose, getRandomInterval())

    // Cleanup on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Carousel auto-rotation logic
  useEffect(() => {
    if (isCarouselPaused) return

    const intervalId = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(intervalId)
  }, [isCarouselPaused, carouselImages.length])

  // Carousel navigation functions
  const nextSlide = () => {
    setIsCarouselPaused(true)
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    setTimeout(() => setIsCarouselPaused(false), 10000) // Resume after 10 seconds
  }

  const prevSlide = () => {
    setIsCarouselPaused(true)
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsCarouselPaused(false), 10000) // Resume after 10 seconds
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="perspective-grid"></div>

        {/* Shape 1 - Dog Bone (Cyan) */}
        <img src="/Images/landing page/dog bone.png" alt="" className="floating-shape shape-1" />

        {/* Shape 2 - Paw Print (Pink) */}
        <img src="/Images/landing page/paw.png" alt="" className="floating-shape shape-2" />

        {/* Shape 3 - Dog Tag (Purple) */}
        <img src="/Images/landing page/dog tags.png" alt="" className="floating-shape shape-3" />

        {/* Shape 4 - Dog Bone (Blue) */}
        <img src="/Images/landing page/dog bone.png" alt="" className="floating-shape shape-4" />

        {/* Shape 5 - Paw Print (Cyan) */}
        <img src="/Images/landing page/paw.png" alt="" className="floating-shape shape-5" />
      </div>

      <header className="header">
        <h1 className="site-title">BoneYard Tees</h1>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <img src={currentPose} alt="Merica" className="merica-character" />
          <h2>Welcome to BoneYard Tees</h2>
          <p className="tagline">T-shirts with more personality than your ex.</p>
          <p className="subtext">Premium quality, bold designs, and zero regrets. Shop now, look awesome later.</p>
        </div>

        {/* Dog Chain Divider */}
        <div className="dog-chain-divider">
          <img src="/Images/landing page/dog chain.png" alt="Decorative dog chain divider" />
        </div>

        {/* NEW Section 2: Featured Designs */}
        <section className="featured-section">
          {/* Left Column: Customer Designs Carousel */}
          <div className="featured-column">
            <h3 className="featured-title featured-title-customer">Featured Customer Designs</h3>
            <div className="carousel-container">
              <div className="carousel-cards">
                {carouselImages.map((image, index) => {
                  // Calculate position relative to current index
                  let position = index - currentCarouselIndex
                  if (position < 0) position += carouselImages.length

                  return (
                    <div
                      key={index}
                      className={`carousel-card ${position === 0 ? 'active' : ''}`}
                      style={{
                        zIndex: carouselImages.length - position,
                        transform: `translateX(${position * 10}px) translateY(${position * 5}px) scale(${1 - position * 0.05})`,
                        opacity: position === 0 ? 1 : 0.3
                      }}
                    >
                      {image.isPlaceholder ? (
                        <div className="placeholder-box">
                          <span className="placeholder-text">{image.alt}</span>
                        </div>
                      ) : (
                        <img src={image.src} alt={image.alt} className="carousel-image" />
                      )}
                    </div>
                  )
                })}
              </div>
              <button className="carousel-nav carousel-nav-prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="carousel-nav carousel-nav-next" onClick={nextSlide}>
                ›
              </button>
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-indicator ${index === currentCarouselIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Shop Designs Placeholder */}
          <div className="featured-column">
            <h3 className="featured-title featured-title-shop">Featured Shop Designs</h3>
            <div className="shop-placeholder">
              <p className="placeholder-text">Coming Soon</p>
            </div>
          </div>
        </section>

        {/* Section 3: CTA (moved from original Section 2) */}
        <section className="cta-section">
          <img src="/Images/customer images/customer hoody 1.jpg" alt="Customer wearing BoneYard hoodie" className="customer-image" />
          <h3 className="cta-headline">Blank tees or custom designs. Your call.</h3>
          <button className="cta-button">Get Fitted</button>
        </section>
      </main>
    </div>
  )
}

export default App
