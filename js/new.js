const buttonCreate = document.querySelector('#buttonCreate')
buttonCreate.addEventListener('click', () => {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/order'

	const clientNameElement = document.querySelector('[data-clientName]')
	console.log(clientNameElement.value)
	const priceElement = document.querySelector('[data-price]')
	// const priceArray = priceString.split('.')
	// const price = parseInt(priceArray[0].concat(priceArray[1]))
	console.log(priceElement.value)
	const goodElement = document.querySelector('[data-good]')
	const goodIndex = goodElement.options.selectedIndex
	const goodText = goodElement.options[goodIndex].text;
	console.log(goodText)

	const newOrder = JSON.stringify({
		good: goodText,
		price: parseInt(priceElement.value),
		clientName: clientNameElement.value,
		paymentStatus: '0',
		requestStatus: '0'
	})

	fetch(url + address + key, {
		method: 'POST',
		body: newOrder
	}).then( () => {
		location.href = 'index.html'
		// console.log('обновилось')
		// const rootDir = document.querySelector('[data-header]')
		// const notify = document.createElement('div')
		// notify.textContent = "Заказ создан"
		// notify.classList.add("notify-save")
		// rootDir.insertBefore(notify, rootDir.firstChild)
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