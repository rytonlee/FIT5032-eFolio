<template>
  <div class="container mt-5">
    <div class="text-center">
      <p v-if="user">Logged user email: {{ user.email }}, 
       user role is: {{user.role}}
      </p>
      <p v-else>No user is currently logged in</p>
  
      <p v-if="user"><button class="btn btn-primary me-2" @click="logout">Log out</button></p>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  
  const auth = getAuth();
  const router = useRouter();
  const db = getFirestore();
  const user = ref(null);

  const fetchUserRole = async () => {
  if (auth.currentUser) {
    const userAuth = auth.currentUser;
    console.log("Current user:", userAuth.uid);
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userDocdetail = await getDoc(userDocRef);

    if (userDocdetail.exists()) {
      user.value = {
        email: userAuth.email,
        role: userDocdetail.data().role || 'No role found'
      };
    } else {
      console.log("No such document!");
    }
  } else {
    console.log("No user is currently logged in");
  }
};

onMounted(() => {
  fetchUserRole();
});
  
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User has been logged out");
        user.value = null;
        router.push("/FireLogin");
      })
      .catch((error) => {
        console.log("Error during sign out:", error);
      });
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