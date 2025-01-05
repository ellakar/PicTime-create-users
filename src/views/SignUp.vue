<template>
  
  <div class="backdrop" @click.self="closeSignup">
    <div class="SignUp">
    <h1>This is a Sign Up page</h1>

    <lable> Enter Name</lable>
    <input type="text" v-model="name">

    <lable> Enter Password</lable>
    <input type="Password" v-model="pas1">

    <lable> Enter Password Again</lable>
    <input type="Password" v-model="pas2">
     </div>
   </div>
   <button @click ="validateuser"> Create</button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      

      name: '',
      pas1: '',
      pas2: '',
      msg: '',
      isValid: false
    }
  },
  methods: {
    validateuser() {
      if (this.pas1 !== this.pas2) {
        this.msg = "Passwords do not match";
        return;
      }
      if (this.pas1.length < 3) {
        this.msg = "Password must have more than 3 characters";
        return;
     
     }

     else
      this.sendUserData();
    },
    async sendUserData() {
      try {
        const response = await axios.post('http://localhost:3000/users', {
          name: this.name,
          password: this.pas1
        });
        this.isValid = true;
        this.msg = "New user created";
      } catch (error) {
        this.msg = "Error creating user: " + error.message;
      }
    },
    closeSignup() {
      this.$emit('close');
    }
  }
}
</script>
