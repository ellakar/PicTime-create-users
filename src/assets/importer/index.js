import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import axios from 'axios'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:8080', // Only allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
}));

const filepath= path.resolve('./src/assets/importer/photoInfo.json')

//read the file to show the firs image
let img=0// index of the image
let imgfile=[]// array of the images
let userLoggedIn="ella"
console.log(userLoggedIn)

fs.readdir("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    else{
        imgfile=files
    }
})


app.get('/photo', (req, res) => {
    const photoPath = path.join("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures", imgfile[img] );
    res.sendFile(photoPath);
  });

  //show the searchPhrase of the image 
  app.get('/searchPhrase', (req, res) => {
    fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
        const file = JSON.parse(data)
        console.log("searchPhrase")
         const priviosDecrip= file.photoInfo[img].searchPhrase
         console.log(priviosDecrip)
         res.send( priviosDecrip)
    })
  });
 
  // add 1 to the count to get the next photo 
app.post('/next', (req, res) => {

  console.log('Next Photo ');
  if (img  >7) {
    img = 1;
  }
 else{
    img=img+1
  res.send("next")
  console.log(imgfile[img]) 
 }
 fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
    const file = JSON.parse(data)
    for (let i = 0; i < file.users.length; i++) {
        if(userLoggedIn === file.users[i].name ){
            console.log(file.users);      // Check the `user` array
            parseInt( file.users[i].numberOfPhotos )
            file.users[i].numberOfPhotos ++
            console.log(file.users[i].numberOfPhotos )
        }
    } 
    fs.writeFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", JSON.stringify(file,null,2), (err) => {  
        if (err) {
            console.error(err)
            return
        }
     })
})
})


//loging page, check the user and the password
app.post('/users',(req, res) => {
    const {currentUser, currentPssword} = req.body
    const validuser = false
    console.log(currentUser, currentPssword)
    console.log(req.body)
    fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
        const file = JSON.parse(data)
        for (let i = 0; i < file.users.length; i++) {
            if(currentUser === file.users[i].name ){
                if(currentPssword === file.users[i].password){
                    res.send("login success")
                    userLoggedIn=currentUser
                    console.log(userLoggedIn)                                   
                    return
                }
                else{                                     
                   res.send( "incorrect password")
                    return
                }
            }
        }
        if(!validuser) {
            res.send( "incorrect  username")
              
            }
    })
        }
    )
console.log("users")


        
//if the sershPhrase is correct
app.put('/correct',(req, res) => { 
console.log(req.body)
 fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
const file = JSON.parse(data)

file.photoInfo[img].ischeacked =req.body.ischeacked
file.photoInfo[img].isOk = req.body.isOk
file.photoInfo[img].newDescription = file.photoInfo[img].searchPhrase
console.log(file.photoInfo[img])
fs.writeFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", JSON.stringify(file,null,2), (err) => {
   
    if (err) {
        console.error(err)
        return
    }
 })
})
})
//if the searchPhrase is incorrect update the desciption
app.put('/update',(req, res) => { 
 console.log(req.body)
 fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
const file = JSON.parse(data)

file.photoInfo[img].ischeacked =req.body.ischeacked
file.photoInfo[img].newDescription = req.body.newDescription
fs.writeFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", JSON.stringify(file,null,2), (err) => {
    if (err) {
        console.error(err)
        return   
  }
} )
    })
})


app.listen(3000, () => console.log("Server is running on port 3000"))

