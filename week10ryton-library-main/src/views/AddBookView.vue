<template>
  <div class="container mt-5">
    <div class="text-center">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input class="form-control" type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" class="form-control" v-model="name" id="name" required />
        </div>
        <button class="btn btn-primary me-2" type="submit">Add Book</button>
      </form>

      <h2>Book List</h2>
      <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-item">
          <span>{{ book.isbn }} - {{ book.name }}</span>
          <div class="button-group">
          <button class="btn btn-primary me-2" @click="editBook(book)">Edit</button>
          <button class="btn btn-danger" @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>

      <div v-if="isEditing" class="mt-5">
        <h1>Edit Book</h1>
        <form @submit.prevent="updateBook">
          <div>
            <label for="editIsbn">Edit ISBN:</label>
            <input class="form-control" type="text" v-model="editIsbn" id="editIsbn" required />
          </div>
          <div>
            <label for="editName">Edit Name:</label>
            <input type="text" class="form-control" v-model="editName" id="editName" required />
          </div>
          <button class="btn btn-primary me-2" type="submit">Update Book</button>
          <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
        </form>
      </div>
      <h2>Books Containing "happy"</h2>
      <button class="btn btn-primary mb-3" @click="searchBooksContainingHappy">Search for "happy"</button>
      <ul>
        <li v-for="book in booksContainingHappy" :key="book.id">
          {{ book.isbn }} - {{ book.name }}
        </li>
      </ul>
    </div>
  </div>
  
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, where, orderBy, limit, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/init.js';

const isbn = ref('');
const name = ref('');
const books = ref([]);
const isEditing = ref(false);
const currentBookId = ref(null);
const editIsbn = ref('');
const editName = ref('');
const booksContainingHappy = ref([]);

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
    });
    alert('Book added successfully!');
    resetForm();
    loadBooks();
  } catch (error) {
    console.error('Error adding book: ', error);
  }
};

const loadBooks = async () => {
  try {
    const queryDetail = await getDocs(collection(db, 'books'));
    books.value = queryDetail.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error loading books: ', error);
  }
};

const editBook = (book) => {
  editIsbn.value = book.isbn;
  editName.value = book.name;
  currentBookId.value = book.id;
  isEditing.value = true;
};

const updateBook = async () => {
  try {
    const isbnNumber = Number(editIsbn.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }

    const bookRef = doc(db, 'books', currentBookId.value);
    await updateDoc(bookRef, {
      isbn: isbnNumber,
      name: editName.value,
    });
    alert('Book updated successfully!');
    resetForm();
    loadBooks();
  } catch (error) {
    console.error('Error updating book: ', error);
  }
};

const deleteBook = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId);
    await deleteDoc(bookRef);
    alert('Book deleted successfully!');
    loadBooks();
  } catch (error) {
    console.error('Error deleting book: ', error);
  }
};

const resetForm = () => {
  isbn.value = '';
  name.value = '';
  editIsbn.value = '';
  editName.value = '';
  currentBookId.value = null;
  isEditing.value = false;
};

const cancelEdit = () => {
  resetForm();
};

onMounted(() => {
  loadBooks();
});

const searchBooksContainingHappy = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('name', '>=', ''),
      orderBy('name', 'asc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const allBooks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    booksContainingHappy.value = allBooks.filter(book => 
      book.name.toLowerCase().includes('happy')
    );

  } catch (error) {
    console.error('Error retrieving books:', error);
  }
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