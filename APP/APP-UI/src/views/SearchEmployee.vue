<template>
    <div>
        <div class="search-employee mt-3">
            <h3><font-awesome-icon icon="university" />
                Search employees</h3>
            <hr />
            <form @submit.prevent="makeQuery">
                <div class="row">
                    <div class="col-lg-2">
                        <label for="firstName">First Name</label>
                        <input id="firstName" class="form-control" type="text" v-model="employeeSearchDto.firstName" placeholder="Enter first name"/>
                    </div>
                    <div class="col-lg-2">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" class="form-control" type="text" v-model="employeeSearchDto.lastName" placeholder="Enter last name"/>
                    </div>
                    <div class="col-lg-2">
                        <label for="username">UserName</label>
                        <input id="username" class="form-control" type="text" v-model="employeeSearchDto.username" placeholder="Enter username"/>
                    </div>
                    <div class="col-lg-2">
                        <label for="email">Email</label>
                        <input id="email" class="form-control" type="email" v-model="employeeSearchDto.email" placeholder="Enter email"/>
                    </div>
                    <div class="col-lg-2 col-sm-4 form-group">
                        <label for="roleSelect">Select role</label>
                        <select v-model="employeeSearchDto.role" class="form-control" id="roleSelect">
                            <option value="">All roles</option>
                            <option>Admin</option>
                            <option>TeamLead</option>
                            <option>User</option>
                        </select>
                    </div>
                    <div class="col-lg-2 col-sm-3">
                        <input type="submit" class="btn btn-primary search-button mb-3" name="submitPlan" value="Search employees"/>
                    </div>
                </div>
            </form>
        </div>
        <EmployeeSearchResult  :employees=employeesFound :message=searchMessage />
    </div>
</template>

<script>
    import axios from "axios";
    import {BASE_URL} from "../store/constants";
    import EmployeeSearchResult from "../components/employee/EmployeeSearchResult";

    export default {
        name: "SearchEmployee",
        components: {EmployeeSearchResult},
        data: function() {
            return {
                employeeSearchDto: {
                    firstName: "",
                    email: "",
                    lastName: "",
                    username: "",
                    role: ""
                },
                employeesFound: [],
                searchMessage: "",

            }
        },
        methods: {
            makeQuery: function () {
                axios
                    .post(BASE_URL + 'rest/employee/filtered', this.employeeSearchDto)
                    .then(response =>  {
                            console.log(response);
                            if (response.data.ok === true) {
                                console.log("DATA: " + response.data.data);
                                this.employeesFound = response.data.data;
                                if (this.employeesFound.length === 0) {
                                    this.searchMessage = "No employees found";
                                } else {
                                    this.searchMessage = "";
                                    this.employeesFound.forEach(employee => {
                                        employee.roles = employee.roles.join();
                                    })
                                }
                            } else {
                                this.employeesFound = [];
                            }
                        }
                    );

            }
        },
        mounted() {
            this.makeQuery();
        }
    }
</script>

<style scoped>

    .search-button {
        position: absolute;
        bottom: 0;
    }

</style>