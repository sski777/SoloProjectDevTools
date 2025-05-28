import express from 'express'
import dotenv from 'dotenv'
import pool from '../db.js'
import { checkJwt } from '../auth.js'

const route = express.Router()

dotenv.config();

route.use(express.json())


route.post('/', checkJwt, async (req, res) => {
  try{
     console.log('route hit', req.body)
    const addentry = await pool.query('INSERT INTO activity (tool_name,user_id) VALUES ($1,$2) RETURNING *',
    [req.body.task,req.body.userid])
    res.status(201).send('Activity Sucessfully Logged!') 
  } 
  catch(error){
    res.status(400).json({error:error.message})
  } 
})


route.get('/', checkJwt, async (req, res) => {
  try{
    console.log('hey')
    const gettable = await pool.query('SELECT * FROM activity')
    res.status(200).json(gettable.rows)
  }  
  catch(error){
    res.status(400).json({error:error.message})
  } 
})



export default route