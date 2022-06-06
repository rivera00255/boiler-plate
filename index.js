const express = require('express')
const app = express()
const port = 3000 // 3000번 port로 서버와 연결

// MongoDB에 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://river:1234@boilerplate.oth2l.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})