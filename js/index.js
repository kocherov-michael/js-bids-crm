const trElementTemplate = `
<tr class="bid-row">
	<td scope="row">
		<a href="view-and-edit.html?id=%ID%">Заявка №%ID%</a>
	</td>
	<td>%CLIENT_NAME%</td>
	<td>
		<span class="badge badge-light badge-lg">%GOOD%</span>
	</td>
	<td>%PRICE%</td>
	<td><span class="badge badge-primary">Новая</span></td>
	<td><span class="badge badge-secondary">Нет оплаты</span></td>
</tr>`

main()

function main () {
	const url = 'http://89.108.64.67:3000'
	const key = '?key=lsadkfjqg9384wfh9a8wehr'
	const address = '/orders'

	fetch(url + address + key, {
		method: 'GET'
	})
		.then(answer => answer.json())
		.then(data => {
			const rootDir = document.getElementById('listViewer')

			for (const item of data) {
				const tbodyElement = document.createElement('tbody')
				const price = item.price.toString().substr(0, item.price.toString().length - 2) + '.' + item.price.toString().substr(-2) + ' руб.'
				console.log(item.good)
				let goodName
				switch(item.good) {
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
					default:  goodName = item.good
						break
				}				
				console.log(goodName)
				tbodyElement.innerHTML = trElementTemplate
					.replace('%ID%', item.id)
					.replace('%ID%', item.id)
					.replace('%GOOD%', goodName)
					.replace('%PRICE%', price)
					.replace('%CLIENT_NAME%', item.clientName)
				rootDir.append(tbodyElement.firstElementChild)
			}

			// console.log(data)
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