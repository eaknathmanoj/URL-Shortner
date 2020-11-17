import React, { useState} from 'react';
import '../Styles/InputCard.css';
import '../Styles/button.scss';
import {makePOSTCall } from '../Utils/Functions';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function InputCard() {
    const [inputUrl, setInputUrl] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);

    const inputPlaceholder = "Paste an URL to make it smool..";
    const postURL = ()=>{
        if(!!!inputUrl){
            console.log("empty");
            return;
        }
        const postData = {
            "longUrl" : inputUrl
        }
        setLoader(true);
        makePOSTCall('/api/url/shorten', postData).then(response => {
            if(response.status === 200){
                const reponseObj = {
                    longUrl : response.data.longUrl,
                    shortUrl: response.data.shortUrl
                }
                setResponseData(reponseObj);
                setLoader(false);
            }  
        })
    }

    const copyToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = responseData.shortUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setOpen(true);
    }

    const createAnother = () => {
        setInputUrl("");
        setResponseData(null);
    }

    const openURL = () => {
        window.open(responseData.shortUrl);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const inputCard = () =>{
        return (
                <div className="InputCardContainer">
                        <h2 className="titleHeader">
                            No matter what you may have heard, size matters.
                        </h2>
                        <div className="inputContainer">
                            <input className="inputBox" type="text" placeholder={inputPlaceholder} value={inputUrl} onChange = {(e)=>{
                                setInputUrl(e.target.value);
                            }}/>
                            <div className="sendButton" onClick={postURL}>
                                <p>Smool it!</p>
                            </div>
                        </div>
                        {loader && (
                            <div className="container">
                                <div className="circleloader"></div>
                            </div>
                        )}
                </div>
        )
    }

    const responseCard = () =>{
        return (
            <div className="responseCard">
                <h2 className="created">
                    SmoolURL was created!
                </h2>
                <div className="inputContainer">
                        <input className="shortUrlBox" type="text"  value={responseData.shortUrl} readonly/>  
                        <div className="actionButtons">
                            <div className="sendButton" onClick={copyToClipboard}>
                                <p>Copy</p>
                            </div> 
                            <div className="sendButton" onClick={openURL}>
                                <p>Open</p>
                            </div>  
                        </div>    
                </div>
                <div className="textContainer">
                    <p>
                        The given URL:
                    </p>
                    <input className="inputBox longUrlBox" type="text"  value={responseData.longUrl} readonly/>  
                    <p>
                        {`is ${responseData.longUrl.length} characters long and resulted in the SmoolUrl which is ${responseData.shortUrl.length} characters long.`}
                    </p>
                </div>
                <div className="btn btn--stripe" onClick={createAnother}>
                    Create another
                </div>
            </div>
        )
    }

    return (
        <div className="InputCard">
            <div className="cardContent">
                {!responseData ? inputCard() : responseCard()}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="SmoolURL copied to clipboard."
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

export default InputCard
