const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const https = require('https')
const { url } = require('inspector')
const { error } = require('console')

app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))

app.post('/', (req,res) =>{
    console.log(req.body.firstname);
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var mailChimpData = {
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
            }
        ]
    }
    var mailchmipJson = JSON.stringify(mailChimpData)

const url = 'https://us8.api.mailchimp.com/3.0/lists/f653eaf5ec'
const options = {
    method:'POST',
    auth: 'starc:59a18bf499aaac04fb2e0bd5d491bc4c-us8'
}
   const request =  https.request(url, options, (response)=>{

    response.statusCode === 200 ? res.sendFile(__dirname + '/success.html') : res.sendFile(__dirname + '/failure.html')
        response.on('data', (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(mailchmipJson)
    request.end()
})
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/sign-up.html')
})

app.post('/failure', (req, res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server  up and running');
})

//Audience ID
//f653eaf5ec

// Api Keys
//59a18bf499aaac04fb2e0bd5d491bc4c-us8
