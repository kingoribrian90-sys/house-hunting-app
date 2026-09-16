import { useState } from 'react'

function TenantsPaymentWindow({ location, budget, onClose }) {
	const [paid, setPaid] = useState(false)
	const [subscription, setSubscription] = useState('monthly')
	const subscriptionOptions = [
		{ value: 'daily', label: 'Daily pass', description: 'Search for 24 hours', divisor: 30 },
		{ value: 'weekly', label: 'Weekly pass', description: 'Search for 7 days', divisor: 4 },
		{ value: 'monthly', label: 'Monthly pass', description: 'Search for 30 days', divisor: 1 },
	]
	const selectedSubscription = subscriptionOptions.find((option) => option.value === subscription)
	const passAmount = budget / selectedSubscription.divisor
	const formattedPassAmount = passAmount.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	function handlePayment(event) {
		event.preventDefault()
		setPaid(true)
	}

	return (
		<div className="payment-backdrop" role="presentation">
			<section className="payment-window" role="dialog" aria-modal="true" aria-labelledby="payment-title">
				<button className="close-payment" type="button" onClick={onClose} aria-label="Close payment window">x</button>
				<p className="recommendation-kicker">Tenant search</p>
				<h3 id="payment-title">Complete your house search</h3>
				{paid ? (
					<p className="form-success" role="status">Your {subscription} pass payment of KSh {formattedPassAmount} was received. We will send matching homes in {location} shortly.</p>
				) : (
					<form className="payment-form" onSubmit={handlePayment}>
						<p>Search area: <strong>{location}</strong></p>
						<p>Monthly budget: <strong>KSh {budget.toLocaleString()}</strong></p>
						<p>Pass amount: <strong>KSh {formattedPassAmount}</strong></p>
						<fieldset className="subscription-options">
							<legend>Choose your subscription pass</legend>
							{subscriptionOptions.map((option) => (
								<label className={`subscription-option${subscription === option.value ? ' selected' : ''}`} key={option.value}>
									<input
										type="radio"
										name="subscription"
										value={option.value}
										checked={subscription === option.value}
										onChange={(event) => setSubscription(event.target.value)}
									/>
									<span>
										<strong>{option.label}</strong>
										<small>{option.description}</small>
									</span>
								</label>
							))}
						</fieldset>
						<label htmlFor="payment-email">Payment email</label>
						<input id="payment-email" type="email" placeholder="you@example.com" required />
						<button type="submit">Pay KSh {formattedPassAmount}</button>
					</form>
				)}
			</section>
		</div>
	)
}

export default TenantsPaymentWindow
