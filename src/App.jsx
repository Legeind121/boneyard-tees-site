import { useState, useEffect } from 'react'
import './App.css'
import ChatWidget from './components/ChatWidget'

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

  // State to track chat open/close
  const [isChatOpen, setIsChatOpen] = useState(false)

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

  // Shop carousel auto-rotation logic
  useEffect(() => {
    if (isShopCarouselPaused) return

    const intervalId = setInterval(() => {
      setCurrentShopCarouselIndex((prevIndex) => (prevIndex + 1) % shopCarouselImages.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(intervalId)
  }, [isShopCarouselPaused, shopCarouselImages.length])

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

  // Shop carousel navigation functions
  const nextShopSlide = () => {
    setIsShopCarouselPaused(true)
    setCurrentShopCarouselIndex((prevIndex) => (prevIndex + 1) % shopCarouselImages.length)
    setTimeout(() => setIsShopCarouselPaused(false), 10000) // Resume after 10 seconds
  }

  const prevShopSlide = () => {
    setIsShopCarouselPaused(true)
    setCurrentShopCarouselIndex((prevIndex) =>
      prevIndex === 0 ? shopCarouselImages.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsShopCarouselPaused(false), 10000) // Resume after 10 seconds
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
          <div
            className="merica-character-wrapper"
            onClick={() => setIsChatOpen(true)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setIsChatOpen(true)}
            aria-label="Chat with Merica"
          >
            <img src={currentPose} alt="Merica" className="merica-character" />
          </div>
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
                        transform: `translateX(${position * 250}px) translateY(${position * 5}px) scale(${1 - position * 0.08}) rotate(${position * 3}deg)`,
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
                        transform: `translateX(${position * -250}px) translateY(${position * 5}px) scale(${1 - position * 0.08}) rotate(${position * -3}deg)`,
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
              <button className="carousel-nav carousel-nav-prev shop-theme" onClick={prevShopSlide}>
                ‹
              </button>
              <button className="carousel-nav carousel-nav-next shop-theme" onClick={nextShopSlide}>
                ›
              </button>
              <div className="carousel-indicators">
                {shopCarouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-indicator shop-theme ${index === currentShopCarouselIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dog Chain Divider */}
        <div className="dog-chain-divider">
          <img src="/Images/landing page/dog chain.png" alt="Decorative dog chain divider" />
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
                <button className="carousel-nav carousel-nav-prev blanks-theme" onClick={prevBlanksSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone prev-bone" />
                </button>
                <button className="carousel-nav carousel-nav-next blanks-theme" onClick={nextBlanksSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone next-bone" />
                </button>
                <div className="carousel-indicators">
                  {blanksCards.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-indicator blanks-theme ${index === currentBlanksIndex ? 'active' : ''}`}
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
                <button className="carousel-nav carousel-nav-prev boneyard-theme" onClick={prevBoneyardSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone prev-bone" />
                </button>
                <button className="carousel-nav carousel-nav-next boneyard-theme" onClick={nextBoneyardSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone next-bone" />
                </button>
                <div className="carousel-indicators">
                  {boneyardCards.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-indicator boneyard-theme ${index === currentBoneyardIndex ? 'active' : ''}`}
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
                <button className="carousel-nav carousel-nav-prev custom-theme" onClick={prevCustomSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone prev-bone" />
                </button>
                <button className="carousel-nav carousel-nav-next custom-theme" onClick={nextCustomSlide}>
                  <img src="/Images/landing page/dog bone.png" alt="" className="nav-bone next-bone" />
                </button>
                <div className="carousel-indicators">
                  {customCards.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-indicator custom-theme ${index === currentCustomIndex ? 'active' : ''}`}
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

      {/* Merica AI Chatbot */}
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  )
}

export default App
