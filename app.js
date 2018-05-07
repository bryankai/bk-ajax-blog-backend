const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development')
app.use(morgan('dev'))
app.use(bodyParser.json())


// Posts Routes
const postsRoutes = require('./src/routes/posts')
app.use('/posts', postsRoutes)



app.use(function(req, res, next){
  next({status: 404, message: 'Route not found' })
})

app.use(function(err, req, res, next){
  const errorMessage = {}

  if(process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})

module.exports = app
