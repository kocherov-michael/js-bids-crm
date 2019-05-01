;(function () {
	const orderId = new URLSearchParams(window.location.search).get('id')

	dbRequest.getOrderById (orderId, data => {
			document.querySelector('[data-order-id]').textContent = data.id
			document.querySelector('[data-order-good]').value = data.good
			document.querySelector('[data-order-client-name]').value = data.clientName
			document.querySelector('[data-new-order-price]').value = data.price

			document
				.querySelector('[data-order-requestStatus]')
				.options[data.requestStatus]
				.setAttribute('selected', 'selected')

			document
				.querySelector('[data-order-paymentStatus]')
				.options[data.paymentStatus]
				.setAttribute('selected', 'selected')

			main()
		})

	function main () {
		document
			.querySelector('[data-order-save]')
			.addEventListener('click', buttonSaveClickHandler)
		document
			.querySelector('[data-order-delete]')
			.addEventListener('click', buttonDeleteClickHandler)
	}

	function buttonDeleteClickHandler (event) {
		event.stopPropagation()

		dbRequest.deleteOrderById (orderId, () => location.replace('index.html'))
	}

	function buttonSaveClickHandler (event) {
		event.stopPropagation()
		const orderData = getOrderData()
		dbRequest.editOrderById(orderId, orderData, () => location.replace('index.html'))
	}

	function getOrderData () {
		const orderData = {
			requestStatus: parseInt(document.querySelector('[data-order-requestStatus]').value) || 0,
			paymentStatus: parseInt(document.querySelector('[data-order-paymentStatus]').value) || 0,
			clientName: document.querySelector('[data-order-client-name]').value || 'NotName',
			price: parseInt(document.querySelector('[data-new-order-price]').value) || 0,
			good: document.querySelector('[data-order-good]').value || 'NotGood'
		}

		return orderData
	}
})()