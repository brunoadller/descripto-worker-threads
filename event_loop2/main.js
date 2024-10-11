const express = require("express")
const app = express()

app.get('./infinity', () => {
    let i = 0;
    while(true){
        console.log(i++)
    }
})
app.get('/date', () => {
    console.log(new Date())
})

app.listen(3000)