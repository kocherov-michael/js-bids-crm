const trElementTemplate = `
<tr class="bid-row" data-order-row>
	<td scope="row">
		<a href="view-and-edit.html?id=%ID%">Заявка №%ID%</a>
	</td>
	<td>%CLIENT_NAME%</td>
	<td>
		<span class="badge badge-light badge-lg">
			<span class="icon">🛴</span> %GOOD%
		</span>
	</td>
	<td>%PRICE%</td>
	<td>%REQUEST_STATUS%</td>
	<td>%PAYMENT_STATUS%</td>
</tr>`

main()

// function main () {
// 	dbRequest.getList(data => {
// 		// console.log(data)
// 		const rootDir = document.getElementById('listViewer')

// 		for (const item of data) {
// 			const tbodyElement = document.createElement('tbody')
// 			const requestStatusSpanElement = getElementByRequestStatusNumber(item.requestStatus)
// 			const paymentStatusSpanElement = getElementByPaymentStatusNumber(item.paymentStatus)

// 			tbodyElement.innerHTML = trElementTemplate
// 				.replace('%ID%', item.id)
// 				.replace('%ID%', item.id)
// 				.replace('%GOOD%', item.good)
// 				.replace('%PRICE%', getPriceNormalize(item.price))
// 				.replace('%CLIENT_NAME%', item.clientName)
// 				.replace('%REQUEST_STATUS%', requestStatusSpanElement.outerHTML || '')
// 				.replace('%PAYMENT_STATUS%', paymentStatusSpanElement.outerHTML || '')

// 			rootDir.append(tbodyElement.firstElementChild)
// 		}
// 		// console.log(data)
// 	})
// }

const filterRequestElement = document.querySelector('[data-filter-request-status]')
const filterPaymentElement = document.querySelector('[data-filter-payment-status]')

filterRequestElement.addEventListener('change', main)
filterPaymentElement.addEventListener('change', main)

function main() {
	dbRequest.getList(data => {
		const rootDir = document.getElementById('listViewer')

		const filterRequestIndex = filterRequestElement.options.selectedIndex
		const filterPaymentIndex = filterPaymentElement.options.selectedIndex
		console.log('filterRequestIndex=', filterRequestIndex)
		console.log('filterPaymentIndex=', filterPaymentIndex)

		const orderRowElement = document.querySelectorAll('[data-order-row]')
		for (const item of orderRowElement){
			item.parentElement.removeChild(item)
		}

		for (const item of data) {
			if (( filterRequestIndex === 0 || item.requestStatus === filterRequestIndex) && (filterPaymentIndex === 0 || item.paymentStatus === filterPaymentIndex)) {

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

function getPriceNormalize (price) {
	const fractional = (price % 100).toString().padStart(2, '0')
	const integer = parseInt(price / 100)

	return `${integer}.${fractional} руб.`
}

function getElementByRequestStatusNumber (number) {
	const spanElement = document.createElement('span')

	if (number === 1) {
		spanElement.className = "badge badge-primary"
		spanElement.textContent = 'Новая'

		return spanElement
	}
	if (number === 2) {
		spanElement.className = "badge badge-light"
		spanElement.textContent = 'В работе'

		return spanElement
	}
	if (number === 3) {
		spanElement.className = "badge badge-warning"
		spanElement.textContent = 'Ожидается оплата'

		return spanElement
	}
	if (number === 4) {
		spanElement.className = "badge badge-light"
		spanElement.textContent = 'Завершена'

		return spanElement
	}
	if (number === 5) {
		spanElement.className = "badge badge-secondary"
		spanElement.textContent = 'Отказ'

		return spanElement
	}

	spanElement.className = "badge"
	spanElement.textContent = 'ERROR'

	return spanElement
}
function getElementByPaymentStatusNumber (number) {
	const spanElement = document.createElement('span')
	if (number === 1) {
		spanElement.className = "badge badge-secondary"
		spanElement.textContent = 'Нет оплаты'

		return spanElement
	}
	if (number === 2) {
		spanElement.className = "badge badge-warning"
		spanElement.textContent = 'Частично'

		return spanElement
	}
	if (number === 3) {
		spanElement.className = "badge badge-success"
		spanElement.textContent = 'Оплачено'

		return spanElement
	}
	if (number === 4) {
		spanElement.className = "badge badge-dark"
		spanElement.textContent = 'Возврат'

		return spanElement
	}

	spanElement.className = "badge"
	spanElement.textContent = 'ERROR'

	return spanElement
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