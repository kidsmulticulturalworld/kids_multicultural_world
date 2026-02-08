import React from 'react'

const FedexApi = () => {
    var data = JSON.stringify(input);
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        // console.log(this.responseText);
        }
    });
    
    xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-locale", "en_US");
    xhr.setRequestHeader("Authorization", "Bearer ");
    
    xhr.send(data);
    
  return (
    <div>FedexApi</div>
  )
}

export default FedexApi