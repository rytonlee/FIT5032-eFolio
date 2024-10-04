<template>
    <div class="container mt-5">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Login</h1>
        
        <form v-if="!isAuthenticated" @submit.prevent="handleLogin">
          <div class="mb-3">
            <input v-model="username" class="form-control" placeholder="username" />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="password" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
          <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { isAuthenticated } from '../auth'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const hardcodedUsername = 'admin'
  const hardcodedPassword = 'password123'
  
  const handleLogin = () => {
  console.log("Attempting login with", username.value, password.value);
  if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
    isAuthenticated.value = true;
    errorMessage.value = '';
    console.log("Login successful");
    router.push('/about');
  } else {
    isAuthenticated.value = false;
    errorMessage.value = 'Username or password is incorrect';
    console.log("Login failed");
  }
}
  </script>
  
  <style scoped>
  .text-danger {
    color: red;
  }
  
  .text-success {
    color: green;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  