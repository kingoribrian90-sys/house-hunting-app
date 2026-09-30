import { useState } from 'react'

function HouseOwnerPayListingFee({ onClose, onPaymentSuccess }) {
	const [paid, setPaid] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('mpesa')

	function handlePayment(event) {
		event.preventDefault()
		setPaid(true)
        if (typeof onPaymentSuccess === 'function') {
            onPaymentSuccess()
        }
	}

	return (
		<div className="payment-backdrop" role="presentation" onClick={onClose}>
			<section
				className="payment-window"
				role="dialog"
				aria-modal="true"
				aria-labelledby="listing-fee-title"
				onClick={(event) => event.stopPropagation()}
			>
                <button className="close-payment" type="button" onClick={onClose} aria-label="Close listing fee payment window">x</button>
				<p className="recommendation-kicker">House owner listing</p>
				<h3 id="listing-fee-title">Pay listing fee</h3>

				{paid ? (
                    <p className="form-success" role="status">Payment received. Your listing is now live on the map and available for tenants to view.</p>
				) : (
					<form className="payment-form" onSubmit={handlePayment}>
                        <p>Listing fee: <strong>KSh 500</strong></p>

						<fieldset className="subscription-options">
                            <legend>Choose payment method</legend>
                            <label className={`subscription-option${paymentMethod === 'mpesa' ? ' selected' : ''}`}>
									<input
										type="radio"
                                    name="listing-payment-method"
                                    value="mpesa"
                                    checked={paymentMethod === 'mpesa'}
                                    onChange={(event) => setPaymentMethod(event.target.value)}
									/>
									<span>
                                    <strong>M-Pesa</strong>
                                    <small>Pay through your Safaricom number</small>
									</span>
								</label>
                            <label className={`subscription-option${paymentMethod === 'card' ? ' selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="listing-payment-method"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(event) => setPaymentMethod(event.target.value)}
                                />
                                <span>
                                    <strong>Card</strong>
                                    <small>Visa, Mastercard, or AMEX</small>
                                </span>
                            </label>
						</fieldset>

                        {paymentMethod === 'mpesa' ? (
                            <input type="tel" placeholder="e.g. 0712 345 678" required />
                        ) : (
                            <input type="text" placeholder="Card number" required />
                        )}
                        <input type="email" placeholder="you@example.com" required />
                        <button type="submit">Pay KSh 500</button>
					</form>
				)}
			</section>
		</div>
	)
}

export default HouseOwnerPayListingFee
