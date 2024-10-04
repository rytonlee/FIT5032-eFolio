<template>
  <div class="container mt-5">
    <h1 class="text-center">Create an Account</h1>
    <p class="text-center"><input type="text" class="form-control" placeholder="Email" v-model="email" /></p>
    <p class="text-center"><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>
    <p class="text-center"><button class="btn btn-primary me-2" @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRouter } from "vue-router";

const db = getFirestore();
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    let role = "user";
    if (email.value.endsWith("@admin.com")) {
      role = "admin";
    }

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      role: role
    });

    console.log('Firebase Register Successful!');
    alert('User registration successful with role: ' + role);
    router.push("/FireLogin");
  } catch (error) {
    console.log('Error during registration:', error.code);
  }
};
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