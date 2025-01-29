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
app.use(express.json())
app.use(cors({
  // Only allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',
}));


let img = 0 // index of the image
let imgArr = []// array of the images
let userLoggedIn = "noBody"// the user that is loged in
let i = 0// index of the photo in the db.json

console.log(userLoggedIn)


readPhotoFolder();
findPhotoInDb();
function readPhotoFolder() {
  //show the first picture after the page is looding
  fs.readdir("src/assets/pictures/notSorted", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    else {
      imgArr = files
      console.log(imgArr)
    }
  })
}
function findPhotoInDb() {
  fs.readFile("data/db.json", (err, data) => {
    const file = JSON.parse(data)

    let photoExist = false
    for (i; i < file.photoInfo.length-1 ; i++) {
      if (file.photoInfo[i].imgName == imgArr[img]) {
       photoExist = true
       
        break
      }
     
    }
if (!photoExist){
  i = 0
  console.log('photo not found in data base')
}
    console.log("count is ", i)
    const priviosDecrip = file.photoInfo[i].searchPhrase

  })
}

app.get('/photo', (req, res) => {
  const photoPath = path.resolve(`src/assets/pictures/notSorted/${imgArr[img]}`);
  res.sendFile(photoPath);
});

//show the searchPhrase of the image 
app.get('/searchPhrase', (req, res) => {
  findPhotoInDb()

 fs.readFile("data/db.json", (err, data) => {
    const file = JSON.parse(data)
    const priviosDecrip = file.photoInfo[i].searchPhrase
    res.send(priviosDecrip)
  })
});



//loging page, check the user and the password
app.post('/logIn', (req, res) => {
  const { currentUser, currentPssword } = req.body

  fs.readFile("data/db.json", async (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send("Server error");
      return;
    }
    try {
      const file = JSON.parse(data)
      let userFound = false

      for (let j = 0; j < file.users.length; j++) {
        if (currentUser === file.users[j].name) {
          userFound = true
          const isValid = await bcrypt.compare(currentPssword, file.users[j].password)
          if (!isValid) {
            res.send("wrong Password")
            return
          }
          else {
            userLoggedIn = currentUser
            res.send("login success")
            console.log(userLoggedIn)
            return
          }
        }
      }

      if (!userFound) {
        res.send("incorrect  username")
      }
    }
    catch (parseError) {
      console.error('Error parsing db.json:', parseError);
      res.status(500).send("Server error");
    }
  })
}
)

app.post('/signUp', async (req, res) => {
  const { name, password } = req.body
  console.log("sing up name - ", name)
  const hash = await bcrypt.hash(password, 10)
  fs.readFile("data/db.json", (err, data) => {
    const file = JSON.parse(data)
    file.users.push({
      name,
      password: hash
    })
    fs.writeFile("data/db.json", JSON.stringify(file, null, 2), (err) => {

      if (err) {
        console.error(err)
        return
      }
    })
    res.send('ok')
  })
})

//if the sershPhrase is correct
app.put('/correct', (req, res) => {
  findPhotoInDb()
  console.log(req.body)
  fs.readFile("data/db.json", (err, data) => {
    const file = JSON.parse(data)
    
    console.log("file name in db.json:",file.photoInfo[i].imgName)
    file.photoInfo[i].ischeacked = req.body.ischeacked
    file.photoInfo[i].isOk = req.body.isOk
    file.photoInfo[i].newDescription = file.photoInfo[i].searchPhrase

    
    fs.writeFile("data/db.json", JSON.stringify(file, null, 2), (err) => {

      if (err) {
        console.error(err)
        return
      }
    })
  }) 
  res.send("ok")
})
//if the searchPhrase is incorrect update the desciption
app.put('/update', (req, res) => {
  findPhotoInDb()
  console.log(req.body)
  fs.readFile("data/db.json", (err, data) => {
    const file = JSON.parse(data)
    console.log("file name in db.json:",file.photoInfo[i].imgName) 
    file.photoInfo[i].ischeacked = req.body.ischeacked
    file.photoInfo[i].newDescription = req.body.newDescription

    fs.writeFile("data/db.json", JSON.stringify(file, null, 2), (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
res.send("ok")
})

//move img between folders 
app.post('/Move-picture', (req, res) => {

  const sourceFolder = path.resolve('src/assets/pictures/notSorted');
  const destinationFolder = path.resolve('src/assets/pictures/sorted/' + req.body.user);
  if (!fs.existsSync(destinationFolder)) {
    console.log("there is no folder for this user, cearing one now")
    fs.mkdirSync(destinationFolder, { recursive: true });
    console.log(`Created destination folder: ${destinationFolder}`);
  }


  const fileToMove = imgArr[img]
  console.log("fileToMove", fileToMove)
 
  if (fileToMove) {
    
  } else {
    console.log(`Photo with name "${imgArr[img]}" not found.`);
  }
  const source = path.join(sourceFolder, fileToMove);
  const destination = path.join(destinationFolder, fileToMove);

  // Move the file
  fs.renameSync(source, destination, (err) => {
    if (err) {
      console.error(`Error moving file ${fileToMove}:`, err)
    } else {
      console.log(`Successfully moved file: ${fileToMove}`)
    }
  });


  
  findPhotoInDb()

  img = img + 1

  console.log(req.body)
  res.send("ok")
})

app.listen(3000, () => console.log("Server is running on port 3000"))

//"10.0.0.10"