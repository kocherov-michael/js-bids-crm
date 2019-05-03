;(function () {
	'use strict'

	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'

	const dbRequest = {
		editOrderById: (id, data, callback) => localFetch(`/order/${id}`, {method: 'PUT', body: JSON.stringify(data)}, callback),
		createOrder: (data, callback) => localFetch(`/order`, {method: 'POST', body: JSON.stringify(data)}, callback),
		generateOrder: (number, callback) => localFetch(`/generate/${number}`, { method: 'POST' }, callback),
		deleteOrderById: (id, callback) => localFetch(`/order/${id}`, { method: 'DELETE' }, callback),
		getOrderById: (id, callback) => localFetch(`/order/${id}`, { method: 'GET' }, callback),
		reinit: callback => localFetch(`/reinit`, { method: 'POST' }, callback),
		getList: callback => localFetch(`/orders`, { method: 'GET' }, callback)
	}

	window.dbRequest = dbRequest
	
	function localFetch (path, params, callback) {
		fetch(`${url}${path}${key}`, params)
			.then(answer => answer.json())
			.then(data => callback(data))
	}
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

// Генерация
// POST /generate/:number