const express = require('express')
const app = express()
const port = 3000 // 3000번 port로 연결

const config = require('./config/key');
const {User} = require('./models/User');

// MongoDB에 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
