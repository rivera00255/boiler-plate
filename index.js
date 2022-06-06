const express = require('express')
const app = express()
const port = 3000 // 3000번 port로 연결

const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {User} = require('./models/User');

// MongoDB에 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie parser
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// signUp
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    });
})

//signIn
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message : "존재하지 않는 이메일 정보 입니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message : "비밀번호를 다시 확인해주세요."
                })
            }
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess : true,
                    userId: user._id
                })
            })
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
