import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import axios from 'axios'
import { readFileSync } from 'fs'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
app.use(bodyParser.json())
app.use (express.json())
app.use(cors({
// Only allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
}));

const filepath= path.resolve('./src/assets/importer/photoInfo.json')

//read the file to show the first image
let img=0// index of the image
let imgInfoArr=[]// array of the images
let userLoggedIn="noBody"
let imgName =""
console.log(userLoggedIn)




//show the first picture after the page is looding
fs.readdir("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures/notSorted", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    else{
        imgInfoArr=files
    }
})
fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", async (err, data) => {
    const file = JSON.parse(data)
    console.log("searchPhrase")
    const priviosDecrip= file.photoInfo[img].searchPhrase
    console.log(priviosDecrip)
})


app.get('/photo', (req, res) => {
    const photoPath = path.join("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures/notSorted", imgInfoArr[img] );
    res.sendFile(photoPath);
  });

  //show the searchPhrase of the image 
  app.get('/searchPhrase', (req, res) => {
    fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
        const file = JSON.parse(data)
         const priviosDecrip= file.photoInfo[img].searchPhrase
        // console.log("The privions description was:" ,priviosDecrip)
         res.send( priviosDecrip)
    })
  });
 
  // add 1 to the count to get the next photo 
app.post('/next', (req, res) => {

  console.log('Next Photo ');
  
  //next photo
    img=img+1
  res.send("next")
  console.log(imgInfoArr[img]) 
 
 //count number of pictures that the user classified (not nessesery)
 fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
    const file = JSON.parse(data)
    for (let i = 0; i < file.users.length; i++) {
        if(userLoggedIn === file.users[i].name ){
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
app.post('/logIn', (req, res) => {
    const {currentUser, currentPssword} = req.body
 
    fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", async (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send("Server error");
      return;
    }
    try{
        const file = JSON.parse(data)
        let userFound= false
  
        for (let i = 0; i < file.users.length; i++) {
            if(currentUser === file.users[i].name ){
                userFound=true
                const isValid = await bcrypt.compare(currentPssword, file.users[i].password)
                if(!isValid){
                  res.send("wrong Password")
                  return
                }
                else{
                    userLoggedIn=currentUser
                    res.send("login success")
                    console.log(userLoggedIn)                                   
                    return
                }        
            }
        }
        
        if(!userFound){
          res.send( "incorrect  username")
        }
        }
        catch (parseError) {
      console.error('Error parsing db.json:', parseError);
      res.status(500).send("Server error");
    }
    })
        }
    )

app.post('/signUp', async(req,res)=>{
  const {name, password}=req.body
  console.log("sing up name - ", name)
  const hash = await bcrypt.hash(password,10)
    fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
      const file = JSON.parse(data)
      file.users.push({
        name,
        password: hash
      })   
      fs.writeFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", JSON.stringify(file,null,2), (err) => {
   
        if (err) {
            console.error(err)
            return
        }   
  })
  res.send('ok')
})
})
        
//if the sershPhrase is correct
app.put('/correct',(req, res) => { 
console.log(req.body)
 fs.readFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", (err, data) => {
const file = JSON.parse(data)

file.photoInfo[img].ischeacked =req.body.ischeacked
file.photoInfo[img].isOk = req.body.isOk
file.photoInfo[img].newDescription = file.photoInfo[img].searchPhrase
imgName=file.photoInfo[img].imgName
console.log(imgName)
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
imgName=file.photoInfo[img].imgName
fs.writeFile("C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/data/db.json", JSON.stringify(file,null,2), (err) => {
    if (err) {
        console.error(err)
        return   
  }
} )
    })
})

//move img between folders 
app.post('/Move-picture', (req,res) => {

        const sourceFolder = path.resolve('C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures/notSorted');
        //change to a spesipic name!!!!!!!
        const destinationFolder = path.resolve('C:/Users/ellak/Documents/pic-Time/veu.js/jsnsrvr/src/assets/pictures/sorted/'+userLoggedIn);

    const files = fs.readdirSync(sourceFolder);
         // Filter for image files (you can adjust the regex for specific formats if needed)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    if (imageFiles.length === 0) {
        return res.status(404).json({ message: 'No image files found to move.' });
      }
      
      //adding match between img and img name
      //const fileToMove = imageFiles[0];
      console.log("name", imgName)
      const  fileToMove = imageFiles.find((element)=>element==imgName )
      console.log("fileToMove", fileToMove)
      if (fileToMove) {
        console.log(`Found photo:`, imgName);
      } else {
        console.log(`Photo with name "${imgName}" not found.`);
      }
        const source = path.join(sourceFolder, fileToMove);
        const destination = path.join(destinationFolder, fileToMove);
        
          // Move the file
          fs.renameSync(source, destination, (err) => {
            if (err) {
              console.error(`Error moving file ${fileToMove}:`, err);
            } else {
              console.log(`Successfully moved file: ${fileToMove}`);
            }
          });
    
   })

app.listen(3000,() => console.log("Server is running on port 3000") )

 //"10.0.0.10"