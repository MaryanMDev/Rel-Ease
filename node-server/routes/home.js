const express = require('express');
const router = express.Router();

router.get('/about' , (req , res) => {
    res.send('hello from the about route');
})


router.get('/' , (req , res) => {
    res.send('hello from the index');
})


module.exports = router;