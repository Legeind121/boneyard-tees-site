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
