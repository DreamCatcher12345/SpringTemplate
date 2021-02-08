<template>
    <div class="col-lg-3 ml-lg-auto mr-lg-auto mt-2" v-if="editEmployee">
        <h3><font-awesome-icon icon="university" />
            Edit Employee</h3>
        <hr />
        <label class="font-weight-bold" for="firstName">First Name</label>
        <click-to-edit id="firstName" v-model="editEmployee.firstName"></click-to-edit>
        <hr />
        <label class="font-weight-bold" for="lastName">Last Name</label>
        <click-to-edit id="lastName" v-model="editEmployee.lastName"></click-to-edit>
        <hr />
        <label class="font-weight-bold" for="email">Email</label>
        <click-to-edit id="email" v-model="editEmployee.email"></click-to-edit>
        <hr />
        <label class="font-weight-bold" for="username">Username</label>
        <click-to-edit id="username" v-model="editEmployee.username"></click-to-edit>
        <hr />
        <label class="font-weight-bold">Roles</label>
        <multiselect v-model="editEmployee.roles" :options="roleOptions" :multiple="true"></multiselect>
        <hr/>
        <button data-toggle="modal" data-target="#myModal" type="submit" class="btn btn-primary" v-on:click="updateEmployee()">Update</button>
        <submit-pop-up id="myModal" :errors=errors :message=message></submit-pop-up>
    </div>
</template>

<script>
    import ClickToEdit from "../components/employee/ClickToEdit";
    import Multiselect from 'vue-multiselect'
    import axios from 'axios'
    import SubmitPopUp from "../components/submitPopUp";
    import {BASE_URL} from "../store/constants";


    export default {
        name: "EditEmployee",
        components: {SubmitPopUp, ClickToEdit, Multiselect},
        props: {
            employee: Object
        },
        data: function () {
            return {
                editEmployee: this.employee,
                roleOptions: ['TeamLead', 'Admin', 'User'],
                errors: [],
                formValid: false,
                message: ""
            }
        },
        methods: {
            validateForm: function() {
                this.errors = [];

                if (!this.editEmployee.firstName) {
                    this.errors.push(this.getRequiredFieldErrorMessage("first name"));
                }

                if (!this.editEmployee.lastName) {
                    this.errors.push(this.getRequiredFieldErrorMessage("last name"));
                }

                if (!this.editEmployee.email) {
                    this.errors.push(this.getRequiredFieldErrorMessage("email"));
                } else if (!this.validateEmail(this.editEmployee.email)) {
                    this.errors.push("Email is not correct");
                }

                if (!this.editEmployee.username) {
                    this.errors.push(this.getRequiredFieldErrorMessage("username"));
                }

                if (!this.editEmployee.roles.length) {
                    this.errors.push("Select atleast 1 role")
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
            updateEmployee: function() {
                this.validateForm();
                if (this.formValid) {
                    axios
                        .post(BASE_URL + "rest/employee/edit", this.editEmployee)
                        .catch(error => (this.errors.push(error)))
                        .then(() => {
                            this.message = "Employee updated"
                        });
                } else {
                    this.message = "Failed to update employee"
                }
            },
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>