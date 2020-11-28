const express = require('express');
const router = express.Router();
const config = require('config');
const Url = require('../models/url');

//@route    GET /:code
//@desc     Redirect to Original URL
router.get('/:code', async(req,res)=>{
    try {
        const query = {urlCode : req.params.code};
        const url = await Url.findOneAndUpdate(
            query,
            {$set: {lastOpened: new Date()}},
        );
        if(url){
            return res.redirect(url.longUrl);
        }else{
            const webUrl = config.get('webUrl');
            return res.redirect(`${webUrl}/404`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
})

module.exports = router;