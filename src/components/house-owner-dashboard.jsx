// After a successful listing payment, this panel confirms the owner is done and can return to searching.
function HouseOwnerDashboard({ onBackToSearch }) {
	return (
		<div className="dashboard-backdrop" role="presentation">
			<section className="dashboard-window" role="dialog" aria-modal="true" aria-labelledby="owner-dashboard-title">
				<button className="close-payment" type="button" onClick={onBackToSearch} aria-label="Return to owner search">x</button>
				<p className="recommendation-kicker">House owner</p>
				<h3 id="owner-dashboard-title">Listing dashboard</h3>
				<div className="dashboard-status-card" role="status">
					<span className="status-label">Payment status</span>
					<strong>Payment request pending</strong>
					<p>Your M-Pesa request was recorded and is awaiting provider confirmation.</p>
				</div>
				<button className="location-done" type="button" onClick={onBackToSearch}>Return to owner search</button>
			</section>
		</div>
	)
}

export default HouseOwnerDashboard