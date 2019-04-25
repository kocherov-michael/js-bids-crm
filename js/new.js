const buttonCreate = document.querySelector('#buttonCreate')
buttonCreate.addEventListener('click', () => {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/order'

	const clientName = document.querySelector('#clientName').value
	console.log(clientName)
	const priceString = document.querySelector('#price').value
	const priceArray = priceString.split('.')
	const price = parseInt(priceArray[0].concat(priceArray[1]))
	console.log(price)
	const goodElement = document.querySelector('#good')
	console.log(goodElement.value)
	const good = goodElement.value
	console.log(good)

	const newOrder = JSON.stringify({
		good: good,
		price: price,
		clientName: clientName,
		managerName: "Анастасия",
		paymentStatus: 0,
		requestStatus: 0
	})

	fetch(url + address + key, {
		method: 'POST',
		body: newOrder
	})
	
})


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