<template>
  <div class="home">
    <form @submit.prevent class="form-container">
      <img src="@/assets/pic-time.png"  />
      <h1>Welcome</h1>
      <label>Enter User Name</label>
      <input type="text" v-model="userName" placeholder="User Name" class="input-field">
      <label>Enter Password</label>
      <input type="password" v-model="password" placeholder="Password" class="input-field">
      <button @click="handleSubmit" class="primary-button">Submit</button>
      <p class="message">{{ msg }}</p>
    </form>
    <!-- <p>{{ userName }} {{ password }}</p> -->
  </div>
</template>

<script>
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
    handleSubmit() {
      fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .then((data) => (this.users = data))
        .catch((err) => console.log(err.message));
      for (let i = 0; i < this.users.length; i++) {
        if (this.userName === this.users[i].name) {
          if (this.password === this.users[i].password) {
            this.msg = 'Login successful';
            this.userExist = true;
          } else {
            this.msg = 'Wrong password';
            this.userExist = true;
          }
        } if (!this.userExist) this.msg = 'There is no user with that name';
      }
     
    },
    CreateNewUser() {
      this.showSignup = !this.showSignup;
    },
  },
};
</script>

<style scoped>
.home {
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  width: 100%;
}

.primary-button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 15px;
  color: red;
}
</style>
