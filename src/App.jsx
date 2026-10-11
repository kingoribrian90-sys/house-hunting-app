import './App.css'
import { useState } from 'react'
import Authentication from './components/authentication'
import HouseOwnerDashboard from './components/house-owner-dashboard'
import HouseOwnerRegistration from './components/house-owner-registration'
import TenantSelection from './components/tenant-selection'

function LandingPage({ onOpenAuth }) {
  const featureList = [
    {
      title: 'Discover homes faster',
      text: 'Browse homes with filters for budget, location, neighborhood vibe, and move-in readiness.',
    },
    {
      title: 'Stay transparent',
      text: 'Compare rent, listing fees, and essential details before you commit to a property.',
    },
    {
      title: 'Built for both sides',
      text: 'Tenants find their next place while property owners list and manage homes with confidence.',
    },
  ]

  const steps = [
    'Create your free account and pick your role.',
    'Search homes, compare costs, and review vetted details.',
    'Connect with owners or move forward to secure your next home.',
  ]

  return (
    <div className="landing-page">
      <header className="site-header" aria-label="Main header">
        <div className="brand-wrap">
          <div className="brand-badge">B</div>
          <div>
            <p className="brand-name">Broto</p>
            <span className="brand-tag">House hunting</span>
          </div>
        </div>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="secondary-button" onClick={() => onOpenAuth('login')}>
            Log in
          </button>
          <button type="button" className="primary-button" onClick={() => onOpenAuth('signup')}>
            Sign up
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="section-kicker">Smarter renting starts here</p>
            <h1>Find a home that fits your life, budget, and goals.</h1>
            <p className="hero-text">
              Broto helps tenants discover homes with confidence and gives property owners a simple
              way to showcase listings, track enquiries, and manage their rentals.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => onOpenAuth('signup')}>
                Get started
              </button>
              <button type="button" className="secondary-button" onClick={() => onOpenAuth('login')}>
                Explore the app
              </button>
            </div>
            <ul className="hero-trust" aria-label="Key app benefits">
              <li>2,000+ homes discovered</li>
              <li>Transparent costs</li>
              <li>Easy owner listing tools</li>
            </ul>
          </div>

          <aside className="hero-panel" aria-label="Home overview preview">
            <div className="mini-card highlight-card">
              <span className="mini-label">Average rental match</span>
              <strong>92%</strong>
              <small>Based on budget and lifestyle fit</small>
            </div>
            <div className="mini-card">
              <span className="mini-label">Featured listing</span>
              <h2>2-bedroom apartment</h2>
              <p>Westlands • KES 55,000/mo</p>
            </div>
            <div className="mini-card stats-row">
              <div>
                <span>Verified</span>
                <strong>120</strong>
              </div>
              <div>
                <span>New today</span>
                <strong>18</strong>
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="info-section split-section">
          <div>
            <p className="section-kicker">About Broto</p>
            <h2>House hunting made clear, fast, and less stressful.</h2>
          </div>
          <div>
            <p>
              Whether you're a renter searching for a comfortable place to live or a homeowner
              presenting a property to the market, Broto brings both journeys into one easy-to-use
              platform. We help people compare homes, understand pricing, and make confident moves.
            </p>
          </div>
        </section>

        <section id="features" className="info-section">
          <div className="section-heading">
            <p className="section-kicker">What the app does</p>
            <h2>Everything you need to search, compare, and decide.</h2>
          </div>

          <div className="feature-grid">
            {featureList.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">✓</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="info-section">
          <div className="section-heading">
            <p className="section-kicker">How it works</p>
            <h2>Simple steps for a smoother property journey.</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step} className="step-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-strip">
          <div>
            <p className="section-kicker">Ready to begin?</p>
            <h2>Sign in or create an account to continue to the app.</h2>
          </div>
          <div className="cta-actions">
            <button type="button" className="primary-button" onClick={() => onOpenAuth('signup')}>
              Create account
            </button>
            <button type="button" className="secondary-button" onClick={() => onOpenAuth('login')}>
              Log in
            </button>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div>
          <p className="section-kicker">Contact</p>
          <h3>Talk to the Broto team</h3>
        </div>
        <div className="contact-list" aria-label="Contact information">
          <a href="mailto:hello@broto.africa">hello@broto.africa</a>
          <a href="tel:+254712345678">+254 712 345 678</a>
          <span>123 Westlands Road, Nairobi</span>
        </div>
      </footer>
    </div>
  )
}

function App() {
  // Track login status and the user's selected journey.
  const [authenticated, setAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null)
  const [ownerDashboardOpen, setOwnerDashboardOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  const handleAuthenticated = () => {
    setAuthenticated(true)
    setShowAuth(false)
  }

  return (
    <>
      {!authenticated && !showAuth && <LandingPage onOpenAuth={handleOpenAuth} />}
      {!authenticated && showAuth && (
        <Authentication initialMode={authMode} onAuthenticated={handleAuthenticated} />
      )}

      {authenticated && userType === null && (
        <div className="role-backdrop" role="presentation">
          <section className="role-window" role="dialog" aria-modal="true" aria-labelledby="role-title">
            <p className="recommendation-kicker">Welcome</p>
            <h2 id="role-title">How will you use Broto?</h2>
            <p className="role-description">Choose the option that best describes you to get started.</p>
            <div className="role-options">
              <button type="button" onClick={() => setUserType('owner')}>
                <strong>House owner</strong>
                <span>List and manage a home</span>
              </button>
              <button type="button" onClick={() => setUserType('tenant')}>
                <strong>Tenant</strong>
                <span>Find a home to rent</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {authenticated && userType === 'owner' && !ownerDashboardOpen && (
        <>
          <HouseOwnerRegistration onListingSubmitted={() => setOwnerDashboardOpen(true)} />
          <button className="change-role" type="button" onClick={() => setUserType(null)}>
            Change role
          </button>
        </>
      )}

      {authenticated && userType === 'owner' && ownerDashboardOpen && (
        <>
          <HouseOwnerDashboard onBackToSearch={() => setOwnerDashboardOpen(false)} />
          <button className="change-role" type="button" onClick={() => setUserType(null)}>
            Change role
          </button>
        </>
      )}

      {authenticated && userType === 'tenant' && (
        <>
          <TenantSelection />
          <button className="change-role" type="button" onClick={() => setUserType(null)}>
            Change role
          </button>
        </>
      )}
    </>
  )
}

export default App
