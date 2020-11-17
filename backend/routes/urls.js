const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

//@route POST: /api/url/shorten
//@desc  Create short URL
router.post('/shorten', async (req,res)=>{
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl');

    //check base url is valid
    if(!validUrl.isUri(baseUrl)){
        return res.status(400).json('Invalid base URL');
    }

    //Create URL code
    const urlCode = shortid.generate();
    

    //check long url if it is valid
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Server error');
        }
    }
    else{
        res.status(400).json('Invalid URL');
    }
})

module.exports = router;