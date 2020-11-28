const express = require('express');
const config = require('config');
const Url = require('../models/url');
const nodemailer = require("nodemailer"); 

const deleteJob = async() =>{
    try {
        let deleteDate = new Date();
        deleteDate.setDate(deleteDate.getDate()-14);
        const deleteLength = await Url.find({lastOpened : {$lt : deleteDate}}, (err,docs)=>{
            if(err){
                console.log(err);
            }
        });
        if(deleteLength.length > 0){
            await Url.remove({lastOpened : {$lt : deleteDate}}, (err, docs)=>{
                if (err) {
                    console.err(err);
                } else {
                    console.log(`Deleted ${deleteLength.length} records.`);
                }
            });
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {deleteJob};