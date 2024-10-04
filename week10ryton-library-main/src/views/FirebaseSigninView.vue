<template>
   <div class="container mt-5">
    <h1 class="text-center">Sign in</h1>
    <p class="text-center"><input class="form-control" type="text" placeholder="Email" v-model="email" /></p>
    <p class="text-center"><input class="form-control" type="password" placeholder="Password" v-model="password" /></p>
    <p class="text-center"><button class="btn btn-primary me-2" @click="login">Sign in via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const db = getFirestore();
const auth = getAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const role = ref("");

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid);
    const userDocdetail = await getDoc(userDocRef);

    if (userDocdetail.exists()) {
      const userData = userDocdetail.data();
      role.value = userData.role;

      if (role.value === 'user') {
        alert("Hello User!");
      } else if (role.value === 'admin') {
        alert("Hello Admin!");
      }
      router.push("/");
    } else {
      console.error("No such user document!");
    }
  } catch (error) {
    console.error('Error logging in: ', error);
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