<template>
    <div class="add-trainer mt-3 col-md-4">
        <h3><font-awesome-icon icon="university" />
            Add Trainer</h3>
        <hr />
        <form class="formAddTrainer" v-on:submit.prevent>
            <div class="form-group">
                <label for="firstName">First Name:*</label>
                <input v-model="trainerDto.firstName" type="text" class="form-control" id="firstName" placeholder="">
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:*</label>
                <input v-model="trainerDto.lastName" type="text" class="form-control" id="lastName" placeholder="">
            </div>
            <div class="form-group">
                <label for="email">Email address:*</label>
                <input v-model="trainerDto.email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="idCode">ID code:*</label>
                <input v-model="trainerDto.idCode" type="number" class="form-control" id="idCode" placeholder="">
            </div>
            <div class="form-group">
                <label for="internal">Internal:*</label>
                <input v-model="trainerDto.internal" type="text" class="form-control" id="internal" placeholder="">
            </div>
            <div class="form-group">
                <label for="addressRoad">Address road:*</label>
                <input v-model="trainerDto.addressRoad" type="text" class="form-control" id="addressRoad" placeholder="">
            </div>
            <div class="form-group">
                <label for="city">City:*</label>
                <input v-model="trainerDto.city" type="text" class="form-control" id="city" placeholder="">
            </div>
            <div class="form-group">
                <label for="zipCode">ZIP code:*</label>
                <input v-model="trainerDto.zipCode" type="text" class="form-control" id="zipCode" placeholder="">
            </div>
            <div class="form-group">
                <label for="telephone">Telephone:*</label>
                <input v-model="trainerDto.telephone" type="text" class="form-control" id="telephone" aria-describedby="telephoneHelp" placeholder="">
                <small id="telephoneHelp" class="form-text text-muted">We'll never share your telephone with anyone else.</small>
            </div>
            <button type="submit" data-toggle="modal" data-target="#myModal" class="btn btn-primary" v-on:click="saveTrainer()">Submit</button>
            <button class="btn btn-danger float-right" v-on:click="clearForm()">Clear</button>
        </form>

        <!-- The Modal from AddEmployee -->
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
                errors: [],
                formValid: false,
                message: "",
                trainerDto: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    idCode: null,
                    internal: null,
                    addressRoad: null,
                    city: null,
                    zipCode: null,
                    telephone: null
                },
            }
        },
        methods: {
            validateForm: function () {
                this.errors = [];
                if (!this.trainerDto.firstName) {
                    this.errors.push(this.getRequiredFieldErrorMessage("first name"));
                }
                if (!this.trainerDto.lastName) {
                    this.errors.push(this.getRequiredFieldErrorMessage("last name"));
                }
                if (!this.trainerDto.email) {
                    this.errors.push(this.getRequiredFieldErrorMessage("email"));
                } else if (!this.validEmail(this.trainerDto.email)) {
                    this.errors.push('Valid email required');
                }
                if (!this.trainerDto.idCode) {
                    this.errors.push(this.getRequiredFieldErrorMessage("id code"));
                } else if (!this.validIdCodeLength(this.trainerDto.idCode)) {
                    this.errors.push('ID code must be exactly 11 numbers');
                }
                if (!this.trainerDto.internal) {
                    this.errors.push(this.getRequiredFieldErrorMessage("internal"));
                }
                if (!this.trainerDto.addressRoad) {
                    this.errors.push(this.getRequiredFieldErrorMessage("address road"));
                }
                if (!this.trainerDto.city) {
                    this.errors.push(this.getRequiredFieldErrorMessage("city"));
                }
                if (!this.trainerDto.zipCode) {
                    this.errors.push(this.getRequiredFieldErrorMessage("zip code"));
                }
                if (!this.trainerDto.telephone) {
                    this.errors.push(this.getRequiredFieldErrorMessage("telephone"));
                }
                this.formValid = !this.errors.length;
            },
            validEmail: function (email) {
                // eslint-disable-next-line no-useless-escape
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validIdCodeLength: function (idCode) {
                return idCode.toString().length === 11;
            },
            getRequiredFieldErrorMessage: function(fieldName) {
                return "Please fill " + fieldName + " field"
            },
            saveTrainer: function() {
                console.log("Inside postNow");
                this.validateForm();
                if (this.formValid) {
                    axios
                        .post('http://localhost:8080/rest/trainer/save', this.trainerDto)
                        .catch(error => (this.errors.push(error)))
                        .then(() => {
                            this.clearForm();
                            this.message = "Trainer saved"
                        });
                } else {
                    this.message = "Failed to save trainer"
                }
                console.log("After post");
            },
            clearForm() {
                for (let property in this.trainerDto) {
                    this.trainerDto[property] = "";
                }
            }
        }
    }
</script>

<style>
    .form-group {
        text-align: left;
    }
</style>
