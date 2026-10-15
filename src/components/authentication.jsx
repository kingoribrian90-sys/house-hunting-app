import { useEffect, useState } from 'react'
import { api } from '../api'

// This modal lets a user either log in or create an account before they continue.
function Authentication({ onAuthenticated, initialMode = 'login' }) {
    // Track which auth mode is active and what the user typed in the form.
    const [mode, setMode] = useState(initialMode)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let active = true

        api.get('/auth/me')
            .then((user) => {
                if (active && user) {
                    onAuthenticated(user)
                }
            })
            .catch((error) => {
                if (active && error.status !== 401) {
                    setErrorMessage(error.message)
                }
            })

        return () => {
            active = false
        }
    }, [onAuthenticated])

    // Send credentials to the selected auth endpoint before continuing.
    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        setErrorMessage('')

        try {
            const user = await api.post(
                mode === 'login' ? '/auth/login' : '/auth/register',
                mode === 'login'
                    ? { email, password }
                    : { username, email, password },
            )
            onAuthenticated(user.user || user)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    // Switch between login and sign-up screens while clearing the password field.
    function switchMode(nextMode) {
        setMode(nextMode)
        setPassword('')
    }

    return (
        <div className="auth-backdrop" role="presentation">
            <section className="auth-window" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                <p className="recommendation-kicker">Broto house hunting</p>
                <h2 id="auth-title">Find your next home</h2>
                <p className="auth-description">Sign in to continue, or create an account to get started.</p>
                {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}

                <div className="auth-tabs" role="tablist" aria-label="Account access">
                    <button
                        className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
                        type="button"
                        role="tab"
                        aria-selected={mode === 'login'}
                        onClick={() => switchMode('login')}
                    >
                        Log in
                    </button>
                    <button
                        className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
                        type="button"
                        role="tab"
                        aria-selected={mode === 'signup'}
                        onClick={() => switchMode('signup')}
                    >
                        Sign up
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="form-field">
                            <label htmlFor="auth-username">Username</label>
                            <input
                                id="auth-username"
                                name="username"
                                type="text"
                                placeholder="e.g. jane_wanjiku"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                    )}
                    <div className="form-field">
                        <label htmlFor="auth-email">Email address</label>
                        <input
                            id="auth-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="auth-password">Password</label>
                        <input
                            id="auth-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            minLength="6"
                            required
                        />
                    </div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
                    </button>
                </form>
            </section>
        </div>
    )
}

export default Authentication