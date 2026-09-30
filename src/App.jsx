import './App.css'
import { useState } from 'react'
import Authentication from './components/authentication'
import HouseOwnerDashboard from './components/house-owner-dashboard'
import HouseOwnerRegistration from './components/house-owner-registration'

import TenantSelection from './components/tenant-selection'

function App() {
  // Track login status and the user's selected journey.
  const [authenticated, setAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null)
  const [ownerDashboardOpen, setOwnerDashboardOpen] = useState(false)

  return (
    <>
     <header>
      <h1>Welcome to Broto house hunting</h1>
      <h2>we help tenants as well as house owners search for homes to rent and live.</h2>

      </header>
     <main>
        {/* Require authentication before showing the role selector. */}
        {!authenticated && <Authentication onAuthenticated={() => setAuthenticated(true)} />}

        {/* Let the authenticated user choose between owner and tenant tools. */}
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

        {/* Render the owner workflow after the owner role is selected. */}
        {userType === 'owner' && !ownerDashboardOpen && (
          <>
            <HouseOwnerRegistration onListingSubmitted={() => setOwnerDashboardOpen(true)} />
            <button className="change-role" type="button" onClick={() => setUserType(null)}>
              Change role
            </button>
          </>
        )}

        {userType === 'owner' && ownerDashboardOpen && (
          <>
            <HouseOwnerDashboard onBackToSearch={() => setOwnerDashboardOpen(false)} />
            <button className="change-role" type="button" onClick={() => setUserType(null)}>
              Change role
            </button>
          </>
        )}

        {/* Render the tenant workflow after the tenant role is selected. */}
        {userType === 'tenant' && (
          <>
            <TenantSelection />
            <button className="change-role" type="button" onClick={() => setUserType(null)}>
              Change role
            </button>
          </>
        )}
      </main>

      <footer>

      </footer>

     

    </>
  )
}

export default App
