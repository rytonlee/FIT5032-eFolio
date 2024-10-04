<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from 'axios';



export default {
  data() {
    return {
      count: null,
      error: null,
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-5q3vfxmb3q-uc.a.run.app');
        this.count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error;
        this.count = null;
      }
    },
  },
};
</script>


<style scoped>

.book-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.button-group {
  display: flex;
  gap: 10px;
}

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