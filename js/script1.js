class Product {
	constructor() {
		this.id = 1,
		this.arrayProducts = [],
		this.editId = null
	}

	saveProduct() {
		let product = this.readData()		

		if(this.validateFields(product) == true) {
			if (this.editId == null) {
				this.addProduct(product)
			} else {
				this.updateProduct(this.editId, product)
			}
			
		}

		this.productTable()
		this.clearData()
	}

	productTable() {
		let tbody = document.getElementById("tbody")
		tbody.innerText = ''

		for(let i = 0; i < this.arrayProducts.length; i++) {
			let tr = tbody.insertRow()

			let td_id = tr.insertCell()
			let td_productName = tr.insertCell()
			let td_price = tr.insertCell()
			let td_actions = tr.insertCell()

			td_id.innerText = this.arrayProducts[i].id
			td_productName.innerText = this.arrayProducts[i].productName
			td_price.innerText = this.arrayProducts[i].price

			td_id.classList.add('center')

			let imgEdit = document.createElement('img')
			imgEdit.src = "assets/pencil-thin.svg"
			imgEdit.setAttribute("onclick", "product.prepareEdit(" + JSON.stringify(this.arrayProducts[i]) +")")

			let imgDelete = document.createElement('img')
			imgDelete.src = "assets/trash-thin.svg"
			imgDelete.setAttribute("onclick", "product.deleteProducts(" + this.arrayProducts[i].id +")")		

			td_actions.appendChild(imgEdit)
			td_actions.appendChild(imgDelete)
		}
	}

	addProduct(product) {
		product.price = parseFloat(product.price)
		this.arrayProducts.push(product)
		this.id++

	}

	readData() {
		let product = {}

		product.id = this.id
		product.productName = document.getElementById('product').value
		product.price = document.getElementById('price').value

		return product
	}

	validateFields(product) {
		let message = ""
		let regexPrice = /^\d+$/g
		let regexProductName = /^\w|\d+.+/g

		if(regexProductName.test(product.productName) == false) {
			message += "Este campo deve iniciar com um caractere ou numero, verifique o nome do produto \n"
		}
		if(regexPrice.test(product.price) == false) {
			message += "Este campo só pode ser preenchido com numeros, verifique o preço do produto"
		}
		if (message != '') {
			alert(message)
			return false
		}

		return true
	}

	clearData() {
		document.getElementById('product').value = ""
		document.getElementById('price').value = ""
		document.getElementById('btn1').innerText = "Salvar"
		document.getElementById('titleAction').innerText = "Adicionar produto"
		this.editId = null
	}

	prepareEdit(data) {
		this.editId = data.id

		document.getElementById('product').value = data.productName
		document.getElementById('price').value = data.price
		document.getElementById('btn1').innerText = "Atualizar"
		document.getElementById('titleAction').innerText = "Editar produto"
	}

	updateProduct(id, product) {
		for (var i = 0; i < this.arrayProducts.length; i++) {
			if (this.arrayProducts[i].id == id) {
				this.arrayProducts[i].productName = product.productName
				this.arrayProducts[i].price = product.price
			}
		}
	}

	deleteProducts(id) {
		let tbody = document.getElementById("tbody")

		if(confirm('Deseja deletar o produto com o ID ' + id + '?')) {
			for (var i = 0; i < this.arrayProducts.length; i++) {
				if (this.arrayProducts[i].id === id) {
					this.arrayProducts.splice(i, 1)
					this.arrayProducts.splice()
					tbody.deleteRow(i)
				}
			}
		}
	}
}

var product = new Product()