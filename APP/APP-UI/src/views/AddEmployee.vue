<template>
<div>
  <div class="col-lg-3 ml-lg-auto mr-lg-auto">
    <div>
      <hr/>
      <h1>New employee</h1>
      <hr/>
    </div>
    <form id="formAddEmployee" v-on:submit.prevent>
      <div class="form-group">
        <label for="inputFirstName">First name</label>
        <input type="text" v-model="employee.firstName" class="form-control" id="inputFirstName" placeholder="First name...">
      </div>
      <div class="form-group">
        <label for="inputLastName">Last name</label>
        <input type="text" v-model="employee.lastName" class="form-control" id="inputLastName" placeholder="Last name...">
      </div>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input type="email" v-model="employee.email" class="form-control" id="inputEmail" placeholder="Email...">
      </div>
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input type="text" v-model="employee.username" class="form-control" id="inputUserName" placeholder="Username...">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" v-model="employee.password" class="form-control" id="exampleInputPassword1" placeholder="Password...">
      </div>
      <button type="submit" data-toggle="modal" data-target="#myModal" class="btn btn-primary" v-on:click="saveEmployee()">Submit</button>
      <button class="btn btn-danger float-right" v-on:click="clearForm()">Clear</button>
  </form>
  </div>

  <!-- The Modal -->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title"></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <h3>{{message}}</h3>
          <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
          </ul>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      employee: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      },
      errors: [],
      formValid: false,
      message: ""
    }
  },
  methods: {
    validateForm: function() {
      this.errors = [];

      if (!this.employee.firstName) {
        this.errors.push(this.getRequiredFieldErrorMessage("first name"));
      }
      
      if (!this.employee.lastName) {
        this.errors.push(this.getRequiredFieldErrorMessage("last name"));
      }

      if (!this.employee.email) {
        this.errors.push(this.getRequiredFieldErrorMessage("email"));
      } else if (!this.validateEmail(this.employee.email)) {
        this.errors.push("Email is not correct");
      }

      if (!this.employee.username) {
        this.errors.push(this.getRequiredFieldErrorMessage("username"));
      }

      if (!this.employee.password) {
        this.errors.push(this.getRequiredFieldErrorMessage("password"));
      }

      this.formValid = !this.errors.length ? true : false;
    },
    validateEmail: function(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    getRequiredFieldErrorMessage: function(fieldName) {
      return "Please fill " + fieldName + " field"
    },
    saveEmployee: function() {
      this.validateForm();
      if (this.formValid) {
      axios
        .post('http://localhost:8080/rest/employee/save', this.employee)
        .catch(error => (this.errors.push(error)))
        .then(() => {
          this.clearForm();
          this.message = "Employee saved"
        });
      } else {
        this.message = "Failed to save employee"
      }
    },
    clearForm() {
      for (let property in this.employee) {
        this.employee[property] = "";
      }
    }
  }
}
</script>

<style>

</style>