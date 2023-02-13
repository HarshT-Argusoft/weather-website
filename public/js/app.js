// const { response } = require("express");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
            response.json().then((data) => {
                if(data.error){
                    // console.log(data.error)
                    messageOne.textContent = data.error
                }else{
                    // console.log(data.location)
                    messageOne.textContent = 'Location: ' + data.location
                    // console.log(data.temperature)
                    messageTwo.textContent = 'Temperature: ' + data.temperature
                    // console.log(data.feelslike)
                    messageThree.textContent = 'Feelslike: ' + data.feelslike
                }
            })
        }
    )
})
