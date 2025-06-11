fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data.puzzle)
    })
})
/*
fetch('http://localhost:3000/weather?address=Bursa').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.sicaklik)
        }
    })
})
*/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
/*
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log("Sıcaklık: " + data.sicaklik + " derece")
            }
        })
    })
*/
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = "Sıcaklık " + data.sicaklik + " derecedir. Hissedilen sıcaklık " + data.hissedilen + " derecedir."
                messageThree.textContent = "Yağış " + data.yagis + " mm"
            }
        })
    })


    console.log(location)
})