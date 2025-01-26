<template>
  <div class="signup">
    <div class="form-container">
      <h1>Sign Up</h1>
      <label>Enter Name</label>
      <input type="text" v-model="userName" class="input-field">
      <label>Enter Pin Code</label>
      <br>
      <input type="password" v-model="pas1" class="input-field">
      <label>Enter Pin Code Again</label>
      <br>
      <input type="password" v-model="pas2" class="input-field">
      <button @click="validateuser()" class="primary-button">Create</button>
      <p class="message">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      pas1: '',
      pas2: '',
      msg: '',
      isValid: false,
    };
  },
  methods: {
    validateuser() {
      if (this.pas1 !== this.pas2) {
        this.msg = 'Passwords do not match';
        return;
      }
      if (this.pas1.length < 3) {
        this.msg = 'Password must have more than 3 characters';
        return;
      } else this.sendUserData();
    },
    async sendUserData() {
      try {
        const response = await axios.post('http://localhost:3000/signUp', {
          name: this.userName,
          password: this.pas1,
        });
        this.isValid = true;
        this.msg = 'New user created';
        this.$router.push('/');
      } catch (error) {
        this.msg = 'Error creating user: ' + error.message;
      }
    },
  },
};
</script>

<style scoped>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e3f2fd;
}

.form-container {
  background: white;
  padding: 100px;
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
  background-color: #1e88e5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
}
@media screen and (max-width: 600px) {
  .description-container input {
    width: 90%;
  }
}
.primary-button:hover {
  background-color: #1565c0;
}

.message {
  margin-top: 15px;
  color: red;
}
</style>
