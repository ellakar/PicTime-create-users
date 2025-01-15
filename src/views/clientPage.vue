<template>
    <div class ="clientPage">
      
      <input v-model="description" type="text" placeholder="Enter Description" />
      <button @click="updateDescription() ; next()">Submit</button>
      <button @click="correctDescription(); next()">Correct</button>
      <img :src= "photopath" width="400"/>
      <button @click="next()">Next</button>
      <p>{{ message }}</p>
      <div id="description"> </div>
     
 
    </div>
</template>
  
  <script>
  import axios from 'axios';
import { onMounted } from 'vue';


  export default {
    data() {
      return {
        photopath:"http://localhost:3000/photo",
        photoInfo:[],
        //id: '', // ID to be updated
        description: '', // Description to be updated
        message: '', // Feedback message
        pictures:[],// dynamic array of images from the server 
        picCounter:0,
        
      };
    },

    methods: {

      async updateDescription() {
         try{ 
      await  axios.put('http://localhost:3000/update',{
      newDescription: this.description,
      ischeacked:"true"
        })
      }
        catch (error) {
          console.error('Error calling backend function:', error);
        }
      },


      async correctDescription() {
        try{
      await  axios.put('http://localhost:3000/correct', {   
        isOk: "true",
        ischeacked: "true"  
          })
      }
      catch (error) {
        console.error('Error calling backend function:', error);
      }
    },
      
      async next() {
        try
        {
          const response=await axios.post('http://localhost:3000/next')
          if (response.data === 'next') {
               console.log('Next photo'); 
            }
          }
          catch (error) {
            console.error('Error calling backend function:', error);
        }
        window.location.reload();
      },



    //   async fetchDescription() {
    // const response = await axios.get("http://localhost:3000/searchPhrase");
    // this.searchPhrase = response.data;
    //   }
    
  }
}



//to print the current sershprase
try{
  const res=axios.get('http://localhost:3000/searchPhrase')
  .then((res)=>{
   
      console.log('Next photo');

      if(document.getElementById('description')!=null){
    
document.getElementById('description').innerHTML=res.data;
      
    }
  })
}
catch (error) {
  console.error('Error calling backend function:', error);
}

  </script>
  