// Show a utility estimate for the selected area so the tenant can understand moving costs.
export function UtilityPaymentBreakdown({ location, utilities }) {
	const utilityTotal = utilities.reduce((sum, utility) => sum + utility.amount, 0)

	return (
		<section className="utility-estimates" aria-labelledby="utility-breakdown-title">
			<h4 id="utility-breakdown-title">Estimated monthly utilities</h4>
			<p className="utility-estimate-note">Market-based estimates for {location}; confirm billing modes and provider rates with the owner.</p>
			{utilities.map((utility) => (
				<div className="utility-estimate-row" key={utility.label}>
					<span><strong>{utility.label}</strong><small>{utility.detail}</small></span>
					<strong>KSh {utility.amount.toLocaleString()}</strong>
				</div>
			))}
			<div className="utility-estimate-total"><span>Estimated monthly total</span><strong>KSh {utilityTotal.toLocaleString()}</strong></div>
			<p className="utility-estimate-note">Optional services are included in this estimate; actual usage and inclusions may vary.</p>
		</section>
	)
}
