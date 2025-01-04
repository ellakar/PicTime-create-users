<template>
  <div class="backdrop" @click.self="CreateNewUser">
    <div class="SignUp"> 
    </div>
 </div>

  <div class="home">
    <form @submit.prevent="handleSubmit">
      <h1> Welcom</h1>
    <label> Enter User name</label>
    <input type= "text" v-model="userName"  >
    <label> Enter Password</label>
    <input type= "password" v-model="password" >
    <button @click=" handleSubmit"> Submit</button>
    <!-- <button @click ="CreateNewUser"> Creat new user</button> -->
    
    </form> 
  </div>
  <p> {{ userName }} {{ password }}</p>
</template>


<script>
export default {
  name: 'LogIn',
  data(){
    return{
      signup:false,
      userName:'',
      password:'',
      users:[],
     
    }
  },
  methods:{
    
    handleSubmit(e){
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => this.users=data) 
      .catch(err => console.log(err.message))
        console.log(this.users)
        
        for (let i=0;i<this.users.length;i++){
          if(this.userName===this.users[i].name){
            if(this.password===this.users[i].password){
           console.log('login succesful')       
           }
          else
           console.log('wrong password')
          }
          else 
          console.log('there is no user in taht name')
        }
  
    }
  },
  CreateNewUser(){
    this.signup=!this.signup
  },
  components: {}
  
}

</script>
