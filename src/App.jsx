import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="site-title">BoneYard Tees</h1>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <img src="/Images/Merica/Merica Idle.png" alt="Merica" className="merica-character" />
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
