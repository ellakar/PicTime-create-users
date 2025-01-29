<template>
  <div class="clientPage">
    <div>
      <h3>The privios description was:</h3>
      <p id="priviosDescrip">{{ priviosDescrip }}</p>
    </div>

    <div class="description-container">
      <input
        v-model="description"
        type="text"
        placeholder="Enter Description"
      />
      <button
        class="submit-btn"
        @click="
          updateDescription();

        "
      >
        Submit
      </button>
    </div>

    <div class="button-container">
      <button
        class="correct-btn"
        @click="
          correctDescription();
          
        "
      >
        Correct
      </button>
      
    </div>

    <div class="image-container">
      <p id="description">{{ message }}</p>
      <img :src="serverAddress + 'photo'" height="300" alt="Photo" />
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
      priviosDescrip: " ",
      serverAddress: "http://localhost:3000/",
      
    };
  },

  methods: {
    async fetchPreviousDescription() {
      try {
        const res = axios
          .get(this.serverAddress + "searchPhrase")
          .then((res) => {
            if (document.getElementById("priviosDescrip") != null) {
              document.getElementById("priviosDescrip").innerHTML = res.data;
            }
          });
      } catch (error) {
        console.error("Error calling backend function:", error);
      }
    },


    async updateDescription() {
      try {
        if (!this.description || this.description.trim() === "") {
          console.log("Enter description");
          this.message = "Enter description";
          return;
        }

  const res= await axios.put("http://localhost:3000/update", {
          newDescription: this.description,
          ischeacked: "true",
        });
        if(res.data=="ok"){
         this.movePicture();
       }
     
      } catch (error) {
        console.error("Error calling backend function:", error);
      }

    },

    async correctDescription() {
      try {
  const res  =await axios.put("http://localhost:3000/correct", {
          isOk: "true",
          ischeacked: "true",
        });
       if(res.data=="ok"){
        this.movePicture();
      }

      } catch (error) {
        console.error("Error calling backend function:", error);
      }
      
    },
    async movePicture() {
      try {
        let currentUser = this.$route.query.currentUser
       const response= await axios.post(this.serverAddress + "Move-picture", {
          user: currentUser
        });

        if (response.data == "ok"){
          console.log("Success");
          window.location.reload();
        }
       
      } catch (error) {
        console.error("Error from clientPage ", error);
      }
    },
  },

  //to print the current serchprase
  mounted() {
    // Fetch the previous description when the page is mounted
    this.fetchPreviousDescription();
   
  },
};
</script>

<style scoped>
#app {
  max-height: 100vh;
}
nav {
  padding: 0 !important;
}
/* General Styles */
.clientPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* Reduced padding */
  font-family: Arial, sans-serif;
  gap: 3px; /* Space between sections */

  overflow: hidden; /* Prevent scrolling */
  box-sizing: border-box;
}

/* Description Container */
.description-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px; /* Reduced margin */
  gap: 3px; /* Space between input and button */
}

.description-container input {
  padding: 5px; /* Smaller padding */
  font-size: 14px; /* Smaller font size */
  width: 150px;
  height: 12px;
  max-width: 90%;
  margin-bottom: 3px;
}

.description-container .submit-btn {
  padding: 5px 15px; /* Smaller padding */
  font-size: 14px;
  cursor: pointer;
  background-color: #e6e9e6;
  color: rgb(83, 80, 80);
  border: none;
  border-radius: 4px;
}

/* Image Container */
.image-container {
  text-align: center;
  margin-bottom: 3px; /* Reduced margin */
  color: rgb(245, 8, 8);
}

.image-container img {
  /* max-width: min(10rem,90%);  */
  max-height: 250px;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

/* Button Container */
.button-container {
  display: block;
  gap: 3px; /* Reduced gap between buttons */
  justify-content: center;
  flex-wrap: wrap; /* Ensure buttons wrap if necessary */
}

.button-container .correct-btn,
.button-container .submit-btn {
  padding: 5px 10px; /* Smaller button size */
  font-size: 12px; /* Smaller font */
  background-color: #81a5e7;
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
    gap: 5px;
  }

  .image-container img {
    max-width: 100%; /* Use full width for smaller screens */
    max-height: 120px; /* Scale down the height further */
  }
}
</style>
