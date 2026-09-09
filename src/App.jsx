import './App.css'
import { useState } from 'react'
import HouseOwnerRegistration from './components/house-owner-registration'
import TenantSelection from './components/tenant-selection'

function App() {
  const [userType, setUserType] = useState(null)

  return (
    <>
     <header>
      <h1>Welcome to Broto house hunting</h1>
      <h2>we help tenants as well as house owners search for homes to rent and live.</h2>

     </header>  
     <main>
        {userType === null && (
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

        {userType === 'owner' && (
          <>
            <HouseOwnerRegistration />
            <button className="change-role" type="button" onClick={() => setUserType(null)}>
              Change role
            </button>
          </>
        )}

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
