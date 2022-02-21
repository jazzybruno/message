const express = require("express");
const nodemailer = require("nodemailer")
const req = require("express/lib/request");
const { json } = require("express/lib/response");
const { text } = require("express");
const app = express();
const PORT = process.env.PORT || 7000;



app.use(express.static('public'))
app.use(express.json())
app.get('/user' , (req , res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/' , (req , res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'jazzybruno45@gmail.com',
            pass : 'jazzybruno1980',
        }

      
    })
    const mailOptions = {
        from : req.body.email,
        to : 'jazzybruno45@gmail.com',
        subject :`Message from ${req.body.email}: ${req.body.phone}`,
        text : req.body.message   
    }

    transporter.sendMail(mailOptions, (error , info)=>{
          if (error) {
              console.log(error);
              res.send('error');
          }else
          console.log('Email sent: ' + info.response);  
          res.send( 'success' )   
    })
})
app.listen(PORT , (error)=>{
    console.log("Server connected");
})