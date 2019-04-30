;(function () {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/orders'

	const dbRequest = {
		getList (callback) {
			const path = url + '/orders' + key
			const params = { method: 'GET' }

			fetch(path, params)
				.then(answer => answer.json())
				.then(data => callback(data))
		},

		getOrderById (id, callback) {
			const path = url + '/order/' + id + key
			const params = { method: 'GET' }

			fetch(path, params)
				.then(answer => answer.json())
				.then(data => callback(data))
		},

		editOrderById (id, orderData, callback) {
			const path = url + '/order/' + id + key
			const params = {
			method: 'PUT',
			body: JSON.stringify(orderData)
		}
			
			fetch(path, params)
				.then(answer => answer.json())
				.then(data => callback(data))
		},

		createOrder (orderData, callback) {
			const path = url + '/order' + key
			const params = {
				method: 'POST',
				body: JSON.stringify(orderData)
			}

			fetch(path, params)
				.then(answer => answer.json())
				.then(data => callback(data))
		},

		deleteOrderById (id, callback) {
			const path = url + '/order/' + id + key
			const params = {
				method: 'DELETE'
			}
		
			fetch(path, params)
				.then(answer => answer.json())
				.then(() => callback())
		},

		reinit (callback) {
			const path = url + '/reinit' + key
			const params = {
				method: 'POST'
			}
		
			fetch(path, params)
				.then(answer => answer.json())
				.then(() => callback())
		}
	}

	window.dbRequest = dbRequest
})()

// Получить все заказы
// GET /orders

// Получить заказ по ID
// GET /order/:id

// Создать новый заказ
// POST /order body

// Изменить заказ
// PUT /order/:id body

// Удалить заказ
// DELETE /order/:id

// Сброс базы данных
// POST /reinit