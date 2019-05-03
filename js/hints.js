;(function () {
	const buttonReinit = document.querySelector('[data-reinit]')
	buttonReinit.addEventListener('click', buttonReinitClickHandler)

	function buttonReinitClickHandler (event) {
		event.stopPropagation()
		
		dbRequest.reinit (() => location.replace('index.html'))
	}
})()
