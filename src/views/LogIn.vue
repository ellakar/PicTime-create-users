<template>
  <div class="LogIn">
    <form @submit.prevent class="form-container">
       <!-- <router-link to="/signup">Create New User</router-link>
      <br>
      <router-link to="/clientPage">Client Page</router-link>  -->
      <img src="@/assets/pic-time.png"  />
      <h1>Welcome</h1>
      <label>Enter User Name</label>
      <input type="text" v-model="userName" placeholder="User Name" class="input-field">
      <br>
      <label>Enter Pin Code</label>
      <input type="password" v-model="password" placeholder="Pin Code" class="input-field">
      <button @click="handleSubmit" class="primary-button">Submit</button>
      <p class="message">{{ msg }}</p>
    </form>
 
  </div>
</template>

<script>
import axios from 'axios';
import SignUp from './SignUp.vue';

export default {
  name: 'LogIn',
  components: { SignUp },
  data() {
    return {
      showSignup: false,
      userName: '',
      password: '',
      users: [],
      msg: '',
      userExist: false,
    };
  },
  methods: {

   async handleSubmit() {   
    const currentUser =this.userName
    const currentPssword=this.password
    
    
    try{
      const response= await axios.post('http://localhost:3000/logIn',{
        currentUser,
        currentPssword
         })
         //console.log(response.data)
         .then((response)=>{            
         if (response.data==="login success"){
           this.$router.push('/clientPage');
           this.msg = response.data;
         }
         else{
          console.log(response.data)     
          this.msg = response.data;    
         }
          })

       } catch (error) {
      console.error('Error calling backend function:', error);
    } 
  },


  },
};
</script>

<style scoped>
.LogIn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.form-container {
  background: white;
  padding: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;

}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.label {
  display: block;
  margin: 10px 0 5px;
  text-align: left;
}

.input-field {
  width: 80%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.primary-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
}

.primary-button:hover {
  background-color: #45a049;
}
@media screen and (max-width: 600px) {
  .description-container input {
    width: 90%;
  }
}

.message {
  margin-top: 15px;
  color: red;
}
</style>
