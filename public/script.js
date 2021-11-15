const socket = io.connect()
const form = document.querySelector('#messForm')
const input = document.querySelector('#message')
const nameInput = document.querySelector('#name')
const allMess = document.querySelector('#all_mess')
const btn = document.querySelector('.btn.btn-danger')

let min = 1
let max = 6
let random = Math.floor(Math.random() * (max - min)) + min

let alertClass = ''

switch (random) {
	case 1:
		alertClass = 'primary'
		break
	case 2:
		alertClass = 'success'
		break
	case 3:
		alertClass = 'danger'
		break
	case 4:
		alertClass = 'warning'
		break
	case 5:
		alertClass = 'info'
		break
	case 6:
		alertClass = 'dark'
		break
}

input.addEventListener('input', () => {
	if (input.value.length) {
		if (btn.classList.contains('disabled')) btn.classList.remove('disabled')
	} else {
		if (!input.classList.contains('disabled')) btn.classList.add('disabled')
	}
})

form.addEventListener('submit', e => {
	e.preventDefault()
	socket.emit('sending', {
		name: nameInput.value,
		message: input.value,
		className: alertClass,
	})
	input.value = ''
})

socket.on('adding', data => {
	allMess.innerHTML += `
		<div class="alert alert-${data.className}">
			<b>${data.name}: </b>
			${data.message}
		</div>
	`
})
