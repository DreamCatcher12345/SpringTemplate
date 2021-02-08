<template>
    <div class="container-fluid float-left">
        <div class="row mt-3">
            <h3 class="mr-4 pl-3">
                <font-awesome-icon icon="university" class="mr-2"></font-awesome-icon>
                Search Trainer
            </h3>
        </div>
        <div class="row dropdown-divider">
            <hr> <!--TODO: ADD HR-->
        </div>
        <form v-on:submit.prevent>
            <div class="row my-3">
                <!--The first column of data-->
                <div class="col col-md-4 col-12">
                    <div class="form-group">
                        <label for="TrainerId" class="float-left">ID code</label>
                        <input type="number" class="form-control" id="TrainerId" placeholder="Enter id code..."
                               v-model="TrainerSearchDto.idCode">
                    </div>
                    <div class="form-group">
                        <label for="TrainerFirstName" class="float-left">First name</label>
                        <input type="text" class="form-control" id="TrainerFirstName" placeholder="Enter first name..."
                               v-model="TrainerSearchDto.firstName">
                    </div>
                    <div class="form-group">
                        <label for="TrainerLastName" class="float-left">Last name</label>
                        <input type="text" class="form-control" id="TrainerLastName" placeholder="Enter last name..."
                               v-model="TrainerSearchDto.lastName">
                    </div>
                </div>
                <!--The second column of data-->
                <div class="col col-md-4 col-12">
                    <div class="form-group">
                        <label for="TrainerEmail" class="float-left">Email</label>
                        <input type="email" class="form-control" id="TrainerEmail" placeholder="Enter email..."
                               v-model="TrainerSearchDto.email">
                    </div>
                    <div class="form-group">
                        <label for="TrainerInternal" class="float-left">Internal</label>
                        <input type="text" class="form-control" id="TrainerInternal" placeholder="Enter internal..."
                               v-model="TrainerSearchDto.internal">
                    </div>
                    <div class="form-group">
                        <label for="TrainerAddressRoad" class="float-left">Address Road</label>
                        <input type="text" class="form-control" id="TrainerAddressRoad"
                               placeholder="Enter address road..." v-model="TrainerSearchDto.addressRoad">
                    </div>
                </div>
                <!--The third column of data-->
                <div class="col col-md-4 col-12">
                    <div class="form-group">
                        <label for="TrainerCity" class="float-left">City</label>
                        <input type="text" class="form-control" id="TrainerCity" placeholder="Enter city..."
                               v-model="TrainerSearchDto.city">
                    </div>
                    <div class="form-group">
                        <label for="TrainerZipCode" class="float-left">Zip Code</label>
                        <input type="tel" class="form-control" id="TrainerZipCode" placeholder="Enter zip code..."
                               v-model="TrainerSearchDto.zipCode">
                    </div>
                    <div class="form-group">
                        <label for="TrainerTelephone" class="float-left">Telephone</label>
                        <input type="tel" class="form-control" id="TrainerTelephone" placeholder="Enter telephone..."
                               v-model="TrainerSearchDto.telephone">
                    </div>
                </div>
            </div><!--row ends-->
            <div class="row px-3">
                <button type="submit" class="btn btn-primary mr-md-2 " @click="filter">Filter by</button>
                <button  class="btn btn-danger mt-2 mt-md-0 " @click="reset">Cancel</button>
            </div>
        </form>
        <div class="row mt-4">
            <table style="table-layout: fixed"  v-if="Trainers.length > 0" class="table table-striped table-light table-bordered ">
                <thead>
                <tr class="selectable selected">
                    <th class="center">ID</th>
                    <th class="center">ID code</th>
                    <th style="width: 15%" class="center">First Name</th>
                    <th style="width: 15%" class="center">Last Name</th>
                    <th class="center">Email</th>
                    <th class="center">Internal</th>
                    <th class="center">Address road</th>
                    <th class="center">City</th>
                    <th class="center">Zip code</th>
                    <th class="center">Telephone</th>
                    <th class="center">Actions</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(trainer) in Trainers" :key="trainer.id">
                        <td>{{trainer.id}}</td>
                        <td>{{trainer.idCode}}</td>
                        <td>{{trainer.firstName}}</td>
                        <td>{{trainer.lastName}}</td>
                        <td>{{trainer.email}}</td>
                        <td>{{trainer.internal}}</td>
                        <td>{{trainer.addressRoad}}</td>
                        <td>{{trainer.city}}</td>
                        <td>{{trainer.zipCode}}</td>
                        <td>{{trainer.telephone}}</td>
                        <td>
                            <a href="#"><font-awesome-icon icon="edit"></font-awesome-icon></a>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SearchTrainer",
        data: function () {
            return {
                TrainerSearchDto: {
                    idCode: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    internal: '',
                    addressRoad: '',
                    city: '',
                    zipCode: '',
                    telephone: ''
                },
                Trainers: []
            }
        },
        methods: {
            reset() {
                this.TrainerSearchDto.idCode = '';
                this.TrainerSearchDto.firstName = '';
                this.TrainerSearchDto.lastName = '';
                this.TrainerSearchDto.email = '';
                this.TrainerSearchDto.internal = '';
                this.TrainerSearchDto.addressRoad = '';
                this.TrainerSearchDto.city = '';
                this.TrainerSearchDto.zipCode = '';
                this.TrainerSearchDto.telephone = '';
            }
            ,

            filter() {
                axios.post("http://localhost:8080/rest/trainer/search", this.TrainerSearchDto)
                    .then(resp => (this.Trainers = resp.data.data));
            }
            ,
        },
        mounted() {
            this.filter();
        }
    }
</script>

<style scoped>

</style>