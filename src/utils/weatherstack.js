const request = require('postman-request')

const weatherstack = (lati, long, callback) => {
    const weatherURL = 'https://api.weatherstack.com/current?access_key=8a9e326a59f4fe189101d234dfc6b58f&query=' + lati + ',' + long 

    request({ url: weatherURL, json:true }, (error, response, body)=>{
        if(error){
            callback("Internet Baglanti Hatasi", undefined)
        }else if (body.error){
            callback("URL Hatasi", undefined)
        }else{
            callback(undefined, {
                sicaklik: body.current.temperature,
                hissedilen: body.current.feelslike,
                hava: body.current.weather_descriptions[0],
                yagis: body.current.precip
            })
        }
    })

}
module.exports = weatherstack