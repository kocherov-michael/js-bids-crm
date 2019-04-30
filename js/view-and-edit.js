;(function () {
	const searchParams = location.search
		.replace('?', '')
		.split('&')
		.reduce((acc, item) => {
			const [key, value] = item.split('=')
			acc[key] = value
			return acc
		}, {})
	console.log('id =', searchParams.id)

	dbRequest.getOrderById (searchParams.id, data => {
		console.log(data)
			document.querySelector('[data-order-id]').textContent = data.id
			document.querySelector('[data-order-good]').value = data.good
			document.querySelector('[data-order-client-name]').value = data.clientName
			document.querySelector('[data-new-order-price]').value = data.price

			const requestStatusElement = document.querySelector('[data-order-requestStatus]')
			requestStatusElement.options[data.requestStatus].setAttribute('selected', 'selected')

			const paymentStatusElement = document.querySelector('[data-order-paymentStatus]')
			paymentStatusElement.options[data.paymentStatus].setAttribute('selected', 'selected')

			main()
		})

	function main () {
		const buttonSave = document.querySelector('[data-order-save]')
		const buttonDelete = document.querySelector('[data-order-delete]')

		buttonSave.addEventListener('click', buttonSaveClickHandler)
		buttonDelete.addEventListener('click', buttonDeleteClickHandler)
	}

	function buttonDeleteClickHandler (event) {
		event.stopPropagation()

		dbRequest.deleteOrderById (searchParams.id, () => location.replace('index.html'))
	}

	function buttonSaveClickHandler (event) {
		event.stopPropagation()
		const orderData = getOrderData()
		// console.log('save')
		dbRequest.editOrderById(searchParams.id, orderData, () => location.replace('index.html'))
	}

	function getOrderData () {
		const orderData = {
			clientName: document.querySelector('[data-order-client-name]').value || 'NotName',
			good: document.querySelector('[data-order-good]').value || 'NotGood',
			price: parseInt(document.querySelector('[data-new-order-price]').value) || 0,
			requestStatus: parseInt(document.querySelector('[data-order-requestStatus]').value) || 0,
			paymentStatus: parseInt(document.querySelector('[data-order-paymentStatus]').value) || 0
		}

		return orderData
	}
})()