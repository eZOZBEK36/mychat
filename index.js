import chalk from 'chalk'
import express from 'express'
import { resolve } from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'

const PORT = process.env.PORT ?? 3000
const app = express()
const __dirname = resolve()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
	res.sendFile(resolve(__dirname, 'static', 'index.html'))
})

let users = []
let connections = []

io.sockets.on('connection', socket => {
	const successConnect = chalk.blue(
		`Success disconnect on: ${chalk.yellowBright('{')}
    ${chalk.yellowBright('ip:')} ${chalk.underline(
			socket.request.connection.remoteAddress,
		)},
    ${chalk.yellowBright('user-agent:')} ${chalk.underline(
			socket.request.headers['user-agent'],
		)}
${chalk.yellowBright('}')}`,
	)
	console.log(successConnect)
	connections.push(socket)

	socket.on('disconnect', data => {
		const successDisconnect = chalk.red(
			`Success disconnect on: ${chalk.yellowBright('{')}
    ${chalk.yellowBright('ip:')} ${chalk.underline(
				socket.request.connection.remoteAddress,
			)},
    ${chalk.yellowBright('user-agent:')} ${chalk.underline(
				socket.request.headers['user-agent'],
			)}
${chalk.yellowBright('}')}`,
		)
		connections.splice(connections.indexOf(socket), 1)
		console.log(successDisconnect)
	})
	socket.on('sending', data => {
		console.log(data)
		io.sockets.emit('adding', {
			name: data.name,
			message: data.message,
			className: data.className,
		})
	})
})
//\
server.listen(PORT, () =>
	console.log(chalk.bold.blue('Listening on port: ', PORT)),
)
