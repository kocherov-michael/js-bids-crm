const goodAddress = document.location.href
// console.log(goodAddress)
const goodIdIndex = goodAddress.indexOf('?id=')
const goodId = goodAddress.substr(goodIdIndex+4)
// console.log(goodId)

// const itemTemplate = `
// <div class="card-body">

// 	<div class="row mb-3">
// 		<div class="col-md-2"><strong>ID:</strong></div>
// 		<div class="col" data-id="id"> Заявка №%ID% </div>
// 	</div>

// 	<div class="row mb-3">
// 		<div class="col-md-2"><strong>Имя:</strong></div>
// 		<div class="col">
// 			<input id="clientName" type="text" class="form-control" value="%CLIENT_NAME%">
// 		</div>
// 	</div>

// 	<div class="row mb-3">
// 		<div class="col-md-2"><strong>Продукт:</strong></div>
// 		<div class="col">
// 			<span class="badge badge-light badge-lg">%GOOD%</span>
// 		</div>
// 	</div>

// 	<div class="row mb-3">
// 		<div class="col-md-2"><strong>Стоимость:</strong></div>
// 		<div class="col">
// 			<div class="input-group">
// 			  <input id="price" type="text" class="form-control" value="%PRICE%">
// 			  <div class="input-group-append">
// 			    <span class="input-group-text">рублей</span>
// 			  </div>
// 			</div>
// 		</div>
// 	</div>

// 	<div class="row mb-3">
// 		<div class="col-md-2">
// 			<strong>Статус заявки:</strong> 
// 		</div>
// 		<div class="col">
// 			<select class="custom-select" id="paymentStatus">
// 				<option selected="">Выберите...</option>
// 				<option value="1">Новая</option>
// 				<option value="2">В работе</option>
// 				<option value="3">Ожидается оплата</option>
// 				<option value="4">Завершена</option>
// 				<option value="5">Отказ</option>
// 			</select>
// 		</div>
// 	</div>
// 	<div class="row mb-3">
// 		<div class="col-md-2">
// 			<strong>Статус оплаты:</strong> 
// 		</div>
// 		<div class="col">
// 			<select class="custom-select" id="requestStatus">
// 				<option selected="">Выберите...</option>
// 				<option value="1">Не оплачено</option>
// 				<option value="3">Частичная оплата</option>
// 				<option value="4">Полная оплата</option>
// 				<option value="5">Возврат</option>
// 			</select>
// 		</div>
// 	</div>

// 	<div class="row mb-3">
// 		<div class="col-md-2"><strong>Дата создания:</strong></div>
// 		<div class="col"> 2019-04-23 13:52:13 </div>
// 	</div>

// </div>`

updateView()

const buttonSave = document.querySelector('#buttonSave')
buttonSave.addEventListener('click', () => {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/order/' + goodId

	const goodElement = document.querySelector('[data-good]')

	const clientNameElement = document.querySelector('[data-clientName]')
	// console.log(clientName)
	const priceElement = document.querySelector('[data-price]')
	// const priceArray = priceString.split('.')
	// const price = parseInt(priceArray[0].concat(priceArray[1]))
	// console.log(price)

	const editOrder = JSON.stringify({
		id: goodId,
		good: goodElement.value,
		price: parseInt(priceElement.value),
		clientName: clientNameElement.value,
		// paymentStatus: 0,
		// requestStatus: 0
	})

	fetch(url + address + key, {
		method: 'PUT',
		body: editOrder
	}).then( () => {
		// console.log('обновилось')
		const rootDir = document.getElementById('card')
		const notify = document.createElement('div')
		notify.textContent = "Изменения сохранены"
		notify.classList.add("notify-save")
		rootDir.insertBefore(notify, rootDir.firstChild)
	})
})
// .then(console.log('обновилось'))
// console.log()


function updateView() {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/order/' + goodId

	fetch(url + address + key, {
		method: 'GET',
		// body: newOrder
	})
		.then(answer => answer.json())
		.then(data => {
			console.log(data)
			const rootDir = document.getElementById('card')

			const itemCard = document.createElement('tbody')
			// const price = data.price.toString().substr(0, data.price.toString().length - 2) + '.' + data.price.toString().substr(-2)

			let goodName
			switch(data.good) {
				case '1':  goodName = 'Автомобиль'
					break
				case '2':  goodName = 'Автобус'
					break
				case '3':  goodName = 'Трактор'
					break
				case '4':  goodName = 'Самолет'
					break
				case '5':  goodName = 'Парусник'
					break
				case '6':  goodName = 'Поезд'
					break
				case '7':  goodName = 'Самокат'
					break
				default:  goodName = data.good
					break
			}

			// itemCard.innerHTML = itemTemplate
			// 	.replace('%ID%', data.id)
			// 	.replace('%GOOD%', goodName)
			// 	.replace('%PRICE%', price)
			// 	.replace('%CLIENT_NAME%', data.clientName)
			// rootDir.append(itemCard.firstElementChild)

			const idElement = document.querySelector('[data-id]')
			idElement.textContent = `Заявка №${data.id}`
			console.log(idElement.textContent)

			const clientNameElement = document.querySelector('[data-clientName]')
			clientNameElement.value = data.clientName

			const goodElement = document.querySelector('[data-good]')
			goodElement.value = goodName

			const priceElement = document.querySelector('[data-price]')
			priceElement.value = data.price
		})
}

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