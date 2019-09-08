const router = require('express').Router();
const Player = require('../models/Player');


router.post('/register', async (req,res) => {
    const player = new Player({
        fname: req.body.fname,
        lname: req.body.lname,
        nickname: req.body.nickname,
        email:req.body.email,
        isAdmin:false
    });

    try{
        const savedUser = await player.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;