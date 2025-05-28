import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimiter from 'express-rate-limit'
import RouteTrackActivity from './Routes/RouteTrackActivity.js'
const server = express()
// change a line for .env update

server.use(helmet())

server.use(cors({
    origin: 'https://solo-project-dev-tools.vercel.app', // Or whatever your frontend URL is
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


server.use('/activity', RouteTrackActivity)

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('The Server Is Running!')
})