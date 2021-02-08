<template>
    <div v-if="message || employees.length">
        <hr />
        <div v-if="message">
            <h4>{{message}}</h4>
        </div>
        <table v-if="employees.length" class="table table-striped table-light table-bordered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Roles</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" v-bind:key="employee.id">
                    <td>{{employee.firstName}}</td>
                    <td>{{employee.lastName}}</td>
                    <td>{{employee.username}}</td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.roles}}</td>
                    <td>
                        <button v-on:click="openEditEmployee(employee)" class="btn"><font-awesome-icon icon="edit"></font-awesome-icon></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "EmployeeSearchResult",
        data() {
            return {

            }
        },
        props: {
            employees: Array,
            message: String
        },
        methods: {
            openEditEmployee(employee) {
                employee.roles = employee.roles.split(",");
                this.$router.push({name: 'editEmployee', params: {employee: employee}});
            }
        }
    }
</script>

<style scoped>

</style>