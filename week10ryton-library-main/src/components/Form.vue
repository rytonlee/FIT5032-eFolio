<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form / Credentials</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-6">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" id="username" class="form-control"
                                   @blur="() => validateName(true)"
                                   @input="() => validateName(false)"
                                   v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" id="password" class="form-control"
                                   @blur="() => validatePassword(true)"
                                   @input="() => validatePassword(false)"
                                   v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-sm-6">
                            <label class="form-label">Australian Resident?</label>
                            <div class="form-check">
                                <input type="radio" id="isAustralianYes" value="yes"
                                       v-model="formData.isAustralian" class="form-check-input">
                                <label for="isAustralianYes" class="form-check-label">Yes</label>
                            </div>
                            <div class="form-check">
                                <input type="radio" id="isAustralianNo" value="no"
                                       v-model="formData.isAustralian" class="form-check-input">
                                <label for="isAustralianNo" class="form-check-label">No</label>
                            </div>
                            <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <label for="gender" class="form-label">Gender:</label>
                            <select id="gender" class="form-select"
                                    @blur="() => validateGender(true)"
                                    @input="() => validateGender(false)"
                                    v-model="formData.gender">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <label for="reason" class="form-label">Reason For Joining:</label>
                            <textarea id="reason" rows="3" class="form-control"
                                      @blur="() => validateReason(true)"
                                      @input="() => validateReason(false)"
                                      v-model="formData.reason"></textarea>
                            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="row mt-5" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <DataTable :value="submittedCards" class="p-datatable-sm p-datatable-gridlines">
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident" :body="booleanTemplate"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
        </div>
    </div>
    <!--
    <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-wrap justify-content-start">
            <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                <div class="card-header">
                    User Information
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Username: {{ card.username }}</li>
                    <li class="list-group-item">Password: {{ card.password }}</li>
                    <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                    <li class="list-group-item">Gender: {{ card.gender }}</li>
                    <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
            </div>
        </div>
    </div>-->
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
  
const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});
  
const submittedCards = ref([]);
  
const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateGender(true);
    validateReason(true);
    validateResident();
    if(!errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.reason){
        submittedCards.value.push({...formData.value});
        clearForm();        
    }
    
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: ''
    };
};

const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
});

const booleanTemplate = (rowData) => {
  return rowData.isAustralian ? 'Yes' : 'No';
};

const validateName = (blur) => {
    if (formData.value.username.length < 3){
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

const validateGender = (blur) => {
    if (!formData.value.gender) {
        errors.value.gender = "Please select a gender";
    } else {
        errors.value.gender = null;
    }
};

const validateReason = (blur) => {
    if (!formData.value.reason || formData.value.reason.length < 5) {
        errors.value.reason = "Reason must be at least 5 characters long";
    } else {
        errors.value.reason = null;
    }
};

const validateResident = () => {
    if (!formData.value.isAustralian) {
        errors.value.isAustralian = "Please select if you are an Australian resident";
    } else {
        errors.value.isAustralian = null;
    }
};
</script>

<style scoped>
.p-datatable {
    margin: auto;
    width: 90%;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
    border-top: none;
    border-bottom: none ;
    border-left: none;
    border-right: none;
    padding: 12px 16px;
    background-color: #ffffff;
    font-weight: bold;
    color: #333;
    font-size: 16px;
}

::v-deep .p-datatable .p-datatable-tbody > tr > td {
    border-top: none;
    border-bottom: 1px solid #dee2e6;
    border-left: none;
    border-right: none;
    padding: 12px 16px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
}

.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}
.list-group-item {
    padding: 10px;
}

@media (max-width: 575.98px) {
  .col-12.col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 576px) {
  .col-12.col-sm-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

</style>