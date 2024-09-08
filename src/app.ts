import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'
import bookRoutes from './routes/bookRoutes'

dotenv.config()
import express from 'express';

const app = express()

app.use(express.json())

//routes
app.use('/auth', authRoutes) 
//Auth
//Books
app.use('/books', bookRoutes)



export default app