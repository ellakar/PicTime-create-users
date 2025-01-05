<template>

  <div class="home">
    <form  @submit.prevent class="form-container">

      <div v-if="showSignup">
        <SignUp @close="createNewUser"> </signUp>
     
      </div>

      <h1> Welcome</h1>
    <label> Enter User name</label>
    <input type= "text" v-model="userName"  class ="input-field" >
    <label> Enter Password</label>
    <input type= "password" v-model="password"  class ="input-field">
    <button @click="handleSubmit" class="primary-button" > Submit</button>

    <div class="secondary-button">
      <button @click ="CreateNewUser" id="creatUser"> Creat new user</button>  
    </div>
  
    </form>

  </div>

  <p> {{ userName }} {{ password }}</p>
</template>


<script>
import SignUp from './SignUp.vue';

export default {
  name: 'LogIn',
  components:{SignUp},

  data(){
    return{
      showSignup:false,
      userName:'',
      password:'',
      users:[],
      userExsist:false
     
    }
  },
  methods:{
    
    handleSubmit(){
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => this.users=data) 
      .catch(err => console.log(err.message))
        console.log(this.users)
        
        for (let i=0;i<this.users.length;i++){
          if(this.userName===this.users[i].name){
            if(this.password===this.users[i].password){
              console.log('login succesful') 
              this.userExsist=true                 
            }   
            else
             console.log('wrong password')
           }  
        }
       if(!this.userExsist) 
          console.log('there is no user in that name')
  
    },
    
    CreateNewUser(){
    this.showSignup=!this.showSignup
    console.log(this.showSignup)
  
    },

    function(){
console.log('hello')
    }

  },

 
}

</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 2.5rem;
  color: #34495e;
  margin-bottom: 30px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* Space between input fields and button */
}

.input-field {
  width: 80%;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #3498db; /* Blue border on focus */
}
primary-button {
  width: 80%;
  max-width: 400px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #2980b9; /* Darker blue on hover */
}

.create-user {
  margin-top: 20px;
}

.secondary-button {
  padding: 10px 20px;
  background-color: #2ecc71; /* Green background */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.secondary-button:hover {
  background-color: #27ae60; /* Darker green on hover */
}


</style>