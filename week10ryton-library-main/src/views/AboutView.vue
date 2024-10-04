<template>
    <div class="about">
      <h1>About Our Library</h1>
      <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
    </div>
    <div class="text-center mt-4">
        <button @click="logout" class="btn btn-primary me-2">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { isAuthenticated } from '../auth'

  const router = useRouter()
  const logout = () => {
    isAuthenticated.value = false
    router.push('/login')
  }
  </script>
  
  <style>
  .about {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center;     /* Center horizontally */
  height: 100vh;           /* Make the container take up the full viewport height */
  text-align: center;      /* Center the text inside the elements */
}
  </style>