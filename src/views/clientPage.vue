<template>
  <div class="clientPage">
    <div class="description-container">
      <div> </div>
      <input v-model="description" type="text" placeholder="Enter Description" />
      <button class="submit-btn" @click="updateDescription();">Submit</button>
    </div>

    <div class="button-container">
      <button class="correct-btn" @click="correctDescription(); next()">Correct</button>
      <!-- <button class="next-btn" @click="next()">Next</button> -->
    </div>

    <div > 
      <p id="priviosDescrip">{{ priviosDescrip }}</p>
    </div>
    
    <div class="image-container">
      <p id="description">{{ message }}</p>
      <img :src="photopath" width="300" alt="Photo" />
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { onMounted } from "vue";

export default {
  data() {
    return {
      photopath: "http://localhost:3000/photo",
      description: "",
      message: "",
      priviosDescrip:" "
    };
  },
  methods: {
    async fetchPreviousDescription() {  
try{
  const res=axios.get('http://localhost:3000/searchPhrase')
  .then((res)=>{
      if(document.getElementById('priviosDescrip')!=null){
   
document.getElementById('priviosDescrip').innerHTML=res.data;    
    }
  })
}
catch (error) {
  console.error('Error calling backend function:', error);
}
},

    async next() {
      try {
        const response = await axios.post("http://localhost:3000/next");
        if (response.data === "next") {
          console.log("Next photo");
        }
      } catch (error) {
        console.error("Error calling backend function:", error);
      }
      window.location.reload();
    },
    async updateDescription() {
      try {
        if (!this.description || this.description.trim() === "") {
          console.log("Enter description");
          this.message = "Enter description";
          return;
        }
        await this.next();
        await axios.put("http://localhost:3000/update", {
          newDescription: this.description,
          ischeacked: "true",
        });
      } catch (error) {
        console.error("Error calling backend function:", error);
      }
    },
    async correctDescription() {
      try {
        await axios.put("http://localhost:3000/correct", {
          isOk: "true",
          ischeacked: "true",
        });
      } catch (error) {
        console.error("Error calling backend function:", error);
      }
    },
    //to print the current serchprase
 
  },
  mounted() {
    // Fetch the previous description when the page is mounted
    this.fetchPreviousDescription();
  },
};


</script>

<style scoped>
/* General Styles */
.clientPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Description Container */
.description-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.description-container input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
  max-width: 90%;
  margin-bottom: 10px;
}

.description-container .submit-btn {
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #e6e9e6;
  color: rgb(83, 80, 80);
  border: none;
  border-radius: 4px;
}

/* Image Container */
.image-container {
  text-align: center;
  margin-bottom: 20px;
  color: rgb(245, 8, 8);
}

.image-container img {
  max-width: 100%;
  height: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Button Container */
.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.button-container .correct-btn {
  padding: 5px 10px; /* Small button size */
  font-size: 14px;
  background-color: #81a5e7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-container .next-btn {
  padding: 8px 20px;
  font-size: 16px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsive Design */
@media screen and (max-width: 600px) {
  .description-container input {
    width: 90%;
  }

  .button-container {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
