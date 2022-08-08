const router = require('express').Router()
const { registerUser } = require('../controllers/userController')

router.get('/signup', (req, res) => {
    res.render('register')
})

router.post('/signup', registerUser)

router.get('/login', (req, res) => {
    res.render('login')
})
module.exports = router;