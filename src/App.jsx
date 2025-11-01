import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import './App.css'
import {
  IMAGE_PATHS,
  MERICA_POSE_MIN_INTERVAL,
  MERICA_POSE_MAX_INTERVAL,
  MERICA_POSE_IDLE_WEIGHT,
  CAROUSEL_AUTO_ROTATE_INTERVAL,
  CAROUSEL_PAUSE_DURATION,
  CARD_HORIZONTAL_OFFSET,
  CARD_SCALE_REDUCTION,
  CARD_ROTATION_DEGREES,
  CARD_VERTICAL_OFFSET,
  CAROUSEL_INACTIVE_OPACITY,
} from './constants'

// Lazy load ChatWidget for better initial page load performance
const ChatWidget = lazy(() => import('./components/ChatWidget'))

function App() {
  // Array of Merica character poses
  const mericaPoses = [
    IMAGE_PATHS.MERICA.IDLE,
    IMAGE_PATHS.MERICA.HEAD_SLIGHTLY_LEFT,
    IMAGE_PATHS.MERICA.HEAD_RIGHT,
    IMAGE_PATHS.MERICA.HEAD_SLIGHTLY_LEFT_BLINK
  ]

  // State to track current pose
  const [currentPose, setCurrentPose] = useState(mericaPoses[0])

  // Ref to track timeout ID for Merica animation
  const poseTimeoutRef = useRef(null)

  // State to track chat open/close
  const [isChatOpen, setIsChatOpen] = useState(false)

  // State to track broken images (by index)
  const [brokenCustomerImages, setBrokenCustomerImages] = useState(new Set())
  const [brokenShopImages, setBrokenShopImages] = useState(new Set())

  // Array of customer images for carousel (3 real + 2 placeholders)
  const carouselImages = [
    { src: IMAGE_PATHS.CUSTOMER_DESIGNS.BARBER_BURNOUT, alt: 'Barber & Burnout custom design', isPlaceholder: false },
    { src: IMAGE_PATHS.CUSTOMER_DESIGNS.DORMAN_PICNIC, alt: "Customer design at Dorman '25 picnic", isPlaceholder: false },
    { src: IMAGE_PATHS.CUSTOMER_DESIGNS.STRONGSIDE_KETTLEBELL, alt: 'Strongside kettlebell custom design', isPlaceholder: false },
    { src: '', alt: 'Placeholder 4', isPlaceholder: true },
    { src: '', alt: 'Placeholder 5', isPlaceholder: true }
  ]

  // State to track current carousel index
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  // Array of shop images for carousel (all placeholders for now)
  const shopCarouselImages = [
    { src: '', alt: 'Shop Placeholder 1', isPlaceholder: true },
    { src: '', alt: 'Shop Placeholder 2', isPlaceholder: true },
    { src: '', alt: 'Shop Placeholder 3', isPlaceholder: true },
    { src: '', alt: 'Shop Placeholder 4', isPlaceholder: true },
    { src: '', alt: 'Shop Placeholder 5', isPlaceholder: true }
  ]

  // State to track current shop carousel index
  const [currentShopCarouselIndex, setCurrentShopCarouselIndex] = useState(0)
  const [isShopCarouselPaused, setIsShopCarouselPaused] = useState(false)

  // How It Works section - Blanks process cards
  const blanksCards = [
    {
      image: '',
      title: 'Step 1: Browse Blank Apparel',
      description: 'Choose from our selection of quality blank tees, hoodies, and more.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 2: Select Size & Color',
      description: 'Pick your preferred size and color options.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 3: Checkout & Ship',
      description: 'Complete your order and we\'ll ship it fast.',
      isPlaceholder: true
    }
  ]

  // How It Works section - BoneYard Designs process cards
  const boneyardCards = [
    {
      image: '',
      title: 'Step 1: Browse Our Designs',
      description: 'Check out BoneYard Tees\' exclusive pre-made designs.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 2: Choose Your Product',
      description: 'Select which apparel item you want the design on.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 3: We Print & Ship',
      description: 'We print your order and ship it to you.',
      isPlaceholder: true
    }
  ]

  // How It Works section - Custom Orders process cards
  const customCards = [
    {
      image: '',
      title: 'Step 1: Upload Your Design',
      description: 'Submit your artwork or design file.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 2: We Review & Mockup',
      description: 'Our team creates a preview for your approval.',
      isPlaceholder: true
    },
    {
      image: '',
      title: 'Step 3: Approve & We Print',
      description: 'Once approved, we print and ship your custom order.',
      isPlaceholder: true
    }
  ]

  // State to track How It Works carousel indices
  const [currentBlanksIndex, setCurrentBlanksIndex] = useState(0)
  const [currentBoneyardIndex, setCurrentBoneyardIndex] = useState(0)
  const [currentCustomIndex, setCurrentCustomIndex] = useState(0)

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
      // Random interval between min and max intervals
      const range = MERICA_POSE_MAX_INTERVAL - MERICA_POSE_MIN_INTERVAL
      return Math.floor(Math.random() * range) + MERICA_POSE_MIN_INTERVAL
    }

    const changeRandomPose = () => {
      setCurrentPose((prevPose) => {
        // Create array of poses excluding current pose
        const otherPoses = mericaPoses.filter((pose) => pose !== prevPose)

        // Weighted selection based on MERICA_POSE_IDLE_WEIGHT constant
        const shouldReturnToIdle = Math.random() < MERICA_POSE_IDLE_WEIGHT
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
      poseTimeoutRef.current = setTimeout(changeRandomPose, nextInterval)
    }

    // Initial timeout
    poseTimeoutRef.current = setTimeout(changeRandomPose, getRandomInterval())

    // Cleanup on unmount
    return () => {
      if (poseTimeoutRef.current) {
        clearTimeout(poseTimeoutRef.current)
      }
    }
  }, [mericaPoses])

  // Carousel auto-rotation logic
  useEffect(() => {
    if (isCarouselPaused) return

    const intervalId = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, CAROUSEL_AUTO_ROTATE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isCarouselPaused, carouselImages.length])

  // Shop carousel auto-rotation logic
  useEffect(() => {
    if (isShopCarouselPaused) return

    const intervalId = setInterval(() => {
      setCurrentShopCarouselIndex((prevIndex) => (prevIndex + 1) % shopCarouselImages.length)
    }, CAROUSEL_AUTO_ROTATE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isShopCarouselPaused, shopCarouselImages.length])

  // Carousel navigation functions
  const nextSlide = () => {
    setIsCarouselPaused(true)
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    setTimeout(() => setIsCarouselPaused(false), CAROUSEL_PAUSE_DURATION)
  }

  const prevSlide = () => {
    setIsCarouselPaused(true)
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsCarouselPaused(false), CAROUSEL_PAUSE_DURATION)
  }

  // Shop carousel navigation functions
  const nextShopSlide = () => {
    setIsShopCarouselPaused(true)
    setCurrentShopCarouselIndex((prevIndex) => (prevIndex + 1) % shopCarouselImages.length)
    setTimeout(() => setIsShopCarouselPaused(false), CAROUSEL_PAUSE_DURATION)
  }

  const prevShopSlide = () => {
    setIsShopCarouselPaused(true)
    setCurrentShopCarouselIndex((prevIndex) =>
      prevIndex === 0 ? shopCarouselImages.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsShopCarouselPaused(false), CAROUSEL_PAUSE_DURATION)
  }

  // How It Works - Blanks navigation functions
  const nextBlanksSlide = () => {
    setCurrentBlanksIndex((prevIndex) => (prevIndex + 1) % blanksCards.length)
  }

  const prevBlanksSlide = () => {
    setCurrentBlanksIndex((prevIndex) =>
      prevIndex === 0 ? blanksCards.length - 1 : prevIndex - 1
    )
  }

  // How It Works - BoneYard navigation functions
  const nextBoneyardSlide = () => {
    setCurrentBoneyardIndex((prevIndex) => (prevIndex + 1) % boneyardCards.length)
  }

  const prevBoneyardSlide = () => {
    setCurrentBoneyardIndex((prevIndex) =>
      prevIndex === 0 ? boneyardCards.length - 1 : prevIndex - 1
    )
  }

  // How It Works - Custom navigation functions
  const nextCustomSlide = () => {
    setCurrentCustomIndex((prevIndex) => (prevIndex + 1) % customCards.length)
  }

  const prevCustomSlide = () => {
    setCurrentCustomIndex((prevIndex) =>
      prevIndex === 0 ? customCards.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="perspective-grid"></div>

        {/* Shape 1 - Dog Bone (Cyan) */}
        <img src="/Images/landing page/dog bone.png" alt="" aria-hidden="true" className="floating-shape shape-1" loading="lazy" onError={(e) => e.target.style.display = 'none'} />

        {/* Shape 2 - Paw Print (Pink) */}
        <img src="/Images/landing page/paw.png" alt="" aria-hidden="true" className="floating-shape shape-2" loading="lazy" onError={(e) => e.target.style.display = 'none'} />

        {/* Shape 3 - Dog Tag (Purple) */}
        <img src="/Images/landing page/dog tags.png" alt="" aria-hidden="true" className="floating-shape shape-3" loading="lazy" onError={(e) => e.target.style.display = 'none'} />

        {/* Shape 4 - Dog Bone (Blue) */}
        <img src="/Images/landing page/dog bone.png" alt="" aria-hidden="true" className="floating-shape shape-4" loading="lazy" onError={(e) => e.target.style.display = 'none'} />

        {/* Shape 5 - Paw Print (Cyan) */}
        <img src="/Images/landing page/paw.png" alt="" aria-hidden="true" className="floating-shape shape-5" loading="lazy" onError={(e) => e.target.style.display = 'none'} />
      </div>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="header">
        <h1 className="site-title">BoneYard Tees</h1>
      </header>

      <main id="main-content" className="main-content">
        <div className="hero-section">
          <div
            className="merica-character-wrapper"
            onClick={() => setIsChatOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsChatOpen(true);
              }
            }}
            aria-label="Chat with Merica"
          >
            <img
              src={currentPose}
              alt="Merica"
              className="merica-character"
              onError={(e) => {
                // Fallback to Idle pose if image fails to load
                if (e.target.src !== IMAGE_PATHS.MERICA.IDLE) {
                  e.target.src = IMAGE_PATHS.MERICA.IDLE;
                }
              }}
            />
          </div>
          <h2>Welcome to BoneYard Tees</h2>
          <p className="tagline">T-shirts with more personality than your ex.</p>
          <p className="subtext">Premium quality, bold designs, and zero regrets. Shop now, look awesome later.</p>
        </div>

        {/* Dog Chain Divider */}
        <div className="dog-chain-divider">
          <img src="/Images/landing page/dog chain.png" alt="Decorative dog chain divider" loading="lazy" onError={(e) => e.target.parentElement.style.display = 'none'} />
        </div>

        {/* NEW Section 2: Featured Designs */}
        <section className="featured-section">
          {/* Customer Designs Carousel */}
          <div className="featured-column customer-carousel-column">
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
                        transform: `translateX(${position * CARD_HORIZONTAL_OFFSET}px) translateY(${position * CARD_VERTICAL_OFFSET}px) scale(${1 - position * CARD_SCALE_REDUCTION}) rotate(${position * CARD_ROTATION_DEGREES}deg)`,
                        opacity: position === 0 ? 1 : CAROUSEL_INACTIVE_OPACITY
                      }}
                    >
                      {image.isPlaceholder || brokenCustomerImages.has(index) ? (
                        <div className="placeholder-box">
                          <span className="placeholder-text">
                            {brokenCustomerImages.has(index) ? 'Image not available' : image.alt}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="carousel-image"
                          loading="lazy"
                          onError={() => {
                            // Mark this image as broken using React state
                            setBrokenCustomerImages(prev => new Set([...prev, index]));
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <button
                className="carousel-nav carousel-nav-prev"
                onClick={prevSlide}
                aria-label="Previous customer design"
              >
                ‹
              </button>
              <button
                className="carousel-nav carousel-nav-next"
                onClick={nextSlide}
                aria-label="Next customer design"
              >
                ›
              </button>
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === currentCarouselIndex ? 'active' : ''}`}
                    onClick={() => setCurrentCarouselIndex(index)}
                    aria-label={`Go to customer design ${index + 1}`}
                    aria-current={index === currentCarouselIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Shop Designs Carousel */}
          <div className="featured-column shop-carousel-column">
            <h3 className="featured-title featured-title-shop">Featured Shop Designs</h3>
            <div className="carousel-container">
              <div className="carousel-cards">
                {shopCarouselImages.map((image, index) => {
                  // Calculate position relative to current index
                  let position = index - currentShopCarouselIndex
                  if (position < 0) position += shopCarouselImages.length

                  return (
                    <div
                      key={index}
                      className={`carousel-card ${position === 0 ? 'active' : ''}`}
                      style={{
                        zIndex: shopCarouselImages.length - position,
                        transform: `translateX(${position * -CARD_HORIZONTAL_OFFSET}px) translateY(${position * CARD_VERTICAL_OFFSET}px) scale(${1 - position * CARD_SCALE_REDUCTION}) rotate(${position * -CARD_ROTATION_DEGREES}deg)`,
                        opacity: position === 0 ? 1 : CAROUSEL_INACTIVE_OPACITY
                      }}
                    >
                      {image.isPlaceholder || brokenShopImages.has(index) ? (
                        <div className="placeholder-box">
                          <span className="placeholder-text">
                            {brokenShopImages.has(index) ? 'Image not available' : image.alt}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="carousel-image"
                          loading="lazy"
                          onError={() => {
                            // Mark this image as broken using React state
                            setBrokenShopImages(prev => new Set([...prev, index]));
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <button
                className="carousel-nav carousel-nav-prev shop-theme"
                onClick={prevShopSlide}
                aria-label="Previous shop design"
              >
                ‹
              </button>
              <button
                className="carousel-nav carousel-nav-next shop-theme"
                onClick={nextShopSlide}
                aria-label="Next shop design"
              >
                ›
              </button>
              <div className="carousel-indicators">
                {shopCarouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator shop-theme ${index === currentShopCarouselIndex ? 'active' : ''}`}
                    onClick={() => setCurrentShopCarouselIndex(index)}
                    aria-label={`Go to shop design ${index + 1}`}
                    aria-current={index === currentShopCarouselIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dog Chain Divider */}
        <div className="dog-chain-divider">
          <img src="/Images/landing page/dog chain.png" alt="Decorative dog chain divider" loading="lazy" onError={(e) => e.target.parentElement.style.display = 'none'} />
        </div>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <h2 className="section-title">How It Works</h2>

          <div className="how-it-works-columns">
            {/* LEFT COLUMN - Blanks */}
            <div className="how-it-works-column">
              <h3 className="how-it-works-title blanks-theme">Blanks</h3>
              <div className="carousel-container how-it-works-carousel">
                <div className="carousel-cards">
                  {blanksCards.map((card, index) => (
                    <div
                      key={index}
                      className={`carousel-card ${index === currentBlanksIndex ? 'active' : ''}`}
                      style={{
                        display: index === currentBlanksIndex ? 'block' : 'none'
                      }}
                    >
                      <div className="placeholder-box">
                        <span className="placeholder-text">Step {index + 1} Image</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-nav carousel-nav-prev blanks-theme"
                  onClick={prevBlanksSlide}
                  aria-label="Previous blanks step"
                >
                  ‹
                </button>
                <button
                  className="carousel-nav carousel-nav-next blanks-theme"
                  onClick={nextBlanksSlide}
                  aria-label="Next blanks step"
                >
                  ›
                </button>
                <div className="carousel-indicators">
                  {blanksCards.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator blanks-theme ${index === currentBlanksIndex ? 'active' : ''}`}
                      onClick={() => setCurrentBlanksIndex(index)}
                      aria-label={`Go to blanks step ${index + 1}`}
                      aria-current={index === currentBlanksIndex ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>
              <div className="how-it-works-text">
                <h4>{blanksCards[currentBlanksIndex].title}</h4>
                <p>{blanksCards[currentBlanksIndex].description}</p>
              </div>
            </div>

            {/* MIDDLE COLUMN - BoneYard Designs */}
            <div className="how-it-works-column">
              <h3 className="how-it-works-title boneyard-theme">BoneYard Designs</h3>
              <div className="carousel-container how-it-works-carousel">
                <div className="carousel-cards">
                  {boneyardCards.map((card, index) => (
                    <div
                      key={index}
                      className={`carousel-card ${index === currentBoneyardIndex ? 'active' : ''}`}
                      style={{
                        display: index === currentBoneyardIndex ? 'block' : 'none'
                      }}
                    >
                      <div className="placeholder-box">
                        <span className="placeholder-text">Step {index + 1} Image</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-nav carousel-nav-prev boneyard-theme"
                  onClick={prevBoneyardSlide}
                  aria-label="Previous BoneYard step"
                >
                  ‹
                </button>
                <button
                  className="carousel-nav carousel-nav-next boneyard-theme"
                  onClick={nextBoneyardSlide}
                  aria-label="Next BoneYard step"
                >
                  ›
                </button>
                <div className="carousel-indicators">
                  {boneyardCards.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator boneyard-theme ${index === currentBoneyardIndex ? 'active' : ''}`}
                      onClick={() => setCurrentBoneyardIndex(index)}
                      aria-label={`Go to BoneYard step ${index + 1}`}
                      aria-current={index === currentBoneyardIndex ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>
              <div className="how-it-works-text">
                <h4>{boneyardCards[currentBoneyardIndex].title}</h4>
                <p>{boneyardCards[currentBoneyardIndex].description}</p>
              </div>
            </div>

            {/* RIGHT COLUMN - Custom Orders */}
            <div className="how-it-works-column">
              <h3 className="how-it-works-title custom-theme">Custom Orders</h3>
              <div className="carousel-container how-it-works-carousel">
                <div className="carousel-cards">
                  {customCards.map((card, index) => (
                    <div
                      key={index}
                      className={`carousel-card ${index === currentCustomIndex ? 'active' : ''}`}
                      style={{
                        display: index === currentCustomIndex ? 'block' : 'none'
                      }}
                    >
                      <div className="placeholder-box">
                        <span className="placeholder-text">Step {index + 1} Image</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-nav carousel-nav-prev custom-theme"
                  onClick={prevCustomSlide}
                  aria-label="Previous custom step"
                >
                  ‹
                </button>
                <button
                  className="carousel-nav carousel-nav-next custom-theme"
                  onClick={nextCustomSlide}
                  aria-label="Next custom step"
                >
                  ›
                </button>
                <div className="carousel-indicators">
                  {customCards.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator custom-theme ${index === currentCustomIndex ? 'active' : ''}`}
                      onClick={() => setCurrentCustomIndex(index)}
                      aria-label={`Go to custom step ${index + 1}`}
                      aria-current={index === currentCustomIndex ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>
              <div className="how-it-works-text">
                <h4>{customCards[currentCustomIndex].title}</h4>
                <p>{customCards[currentCustomIndex].description}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Merica AI Chatbot - Lazy loaded for performance */}
      <Suspense fallback={null}>
        <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </Suspense>
    </div>
  )
}

export default App
