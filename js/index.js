;(function () {
	'use strict'

	const trElementTemplate = `
	<tr class="bid-row" data-order-row>
		<td scope="row">
			<a href="view-and-edit.html?id=%ID%">Заявка №%ID%</a>
		</td>
		<td>%CLIENT_NAME%</td>
		<td>
			<span class="badge badge-light badge-lg">%GOOD%</span>
		</td>
		<td>%PRICE%</td>
		<td>%REQUEST_STATUS%</td>
		<td>%PAYMENT_STATUS%</td>
	</tr>`

	const filterRequestElement = document.querySelector('[data-filter-request-status]')
	const filterPaymentElement = document.querySelector('[data-filter-payment-status]')
	const filterGoodsElement = document.querySelector('[data-filter-good]')
	const buttonGenerateElement = document.querySelector('[data-generate]')

	filterRequestElement.addEventListener('change', event => {
		event.stopPropagation()
		main()
	})
	filterPaymentElement.addEventListener('change', event => {
		event.stopPropagation()
		main()
	})
	filterGoodsElement.addEventListener('change', event => {
		event.stopPropagation()
		main()
	})

	// Генерация заказов
	document
		.querySelector('[data-generate]')
		.addEventListener('click', function (event) {
			event.stopPropagation()
			dbRequest.generateOrder(5, data => {
				main()
				createFilterGoodsList()
			})
		})

	main()
	createFilterGoodsList()

	//Вывод списка заказов согласно фильтру
	function main() {
		dbRequest.getList(data => {

			//Очистка списка заказов
			const rootDir = document.getElementById('listViewer')
			rootDir.innerHTML = ''

			//Выбор фильтра для заказов
			const filterRequestIndex = filterRequestElement.options.selectedIndex
			const filterPaymentIndex = filterPaymentElement.options.selectedIndex
			const filterGoodIndex = filterGoodsElement.options.selectedIndex

			for (const item of data) {
				const isRequestStatusCoincide = filterRequestIndex === 0 || item.requestStatus === filterRequestIndex
				const isPaymentStatusCoincide = filterPaymentIndex === 0 || item.paymentStatus === filterPaymentIndex
				const isGoodCoincide = filterGoodIndex === -1 || filterGoodIndex === 0 || item.good === filterGoodsElement.value
				if (isRequestStatusCoincide && isPaymentStatusCoincide && isGoodCoincide) {

					const tbodyElement = document.createElement('tbody')
					const requestStatusSpanElement = getElementByRequestStatusNumber(item.requestStatus)
					const paymentStatusSpanElement = getElementByPaymentStatusNumber(item.paymentStatus)

					tbodyElement.innerHTML = trElementTemplate
						.replace('%ID%', item.id)
						.replace('%ID%', item.id)
						.replace('%GOOD%', item.good)
						.replace('%PRICE%', getPriceNormalize(item.price))
						.replace('%CLIENT_NAME%', item.clientName)
						.replace('%REQUEST_STATUS%', requestStatusSpanElement.outerHTML || '')
						.replace('%PAYMENT_STATUS%', paymentStatusSpanElement.outerHTML || '')

					rootDir.append(tbodyElement.firstElementChild)
				}
			}
		})
	}	

	// Создание списка фильтрации по товарам
	function createFilterGoodsList(){
		dbRequest.getList(data => {
		
			filterGoodsElement.innerHTML = ''

			const goodsList = []
			for (let i = 0; i < data.length; i++) {
				goodsList.push(data[i].good)
			}
			// Создание списка с оригинальными названиями товаров
			const goodsListOriginals = ['Выберите...', ...new Set(goodsList)]

			for (let i = 0; i < goodsListOriginals.length; i++) {
				const optionElement = document.createElement('option')
				optionElement.textContent = goodsListOriginals[i]
				filterGoodsElement.append(optionElement)
			}
		})
	}

	// Нормализация цены для отображения на странице
	function getPriceNormalize (price) {
		const fractional = (price % 100).toString().padStart(2, '0')
		const integer = parseInt(price / 100)

		return `${integer} руб. ${fractional} коп.`
	}

	// Генерация спан элемента статуса заказа
	function getElementByRequestStatusNumber (number) {
		const spanElement = document.createElement('span')

		if (number === 1) {
			spanElement.className = "badge badge-primary"
			spanElement.textContent = 'Новая'
		}
		else if (number === 2) {
			spanElement.className = "badge badge-light"
			spanElement.textContent = 'В работе'
		}
		else if (number === 3) {
			spanElement.className = "badge badge-warning"
			spanElement.textContent = 'Ожидается оплата'
		}
		else if (number === 4) {
			spanElement.className = "badge badge-light"
			spanElement.textContent = 'Завершена'
		}
		else if (number === 5) {
			spanElement.className = "badge badge-secondary"
			spanElement.textContent = 'Отказ'
		}
		else {
			spanElement.className = "badge"
			spanElement.textContent = 'ERROR'
		}
		return spanElement
	}

	// Генерация спан элемента статуса оплаты
	function getElementByPaymentStatusNumber (number) {
		const spanElement = document.createElement('span')
		if (number === 1) {
			spanElement.className = "badge badge-secondary"
			spanElement.textContent = 'Нет оплаты'
		}
		else if (number === 2) {
			spanElement.className = "badge badge-warning"
			spanElement.textContent = 'Частично'
		}
		else if (number === 3) {
			spanElement.className = "badge badge-success"
			spanElement.textContent = 'Оплачено'
		}
		else if (number === 4) {
			spanElement.className = "badge badge-dark"
			spanElement.textContent = 'Возврат'
		}
		else {
			spanElement.className = "badge"
			spanElement.textContent = 'ERROR'
		}
		return spanElement
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