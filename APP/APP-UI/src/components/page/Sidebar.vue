<template>
    <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading bg-dark text-light pl-4 py-1">
            <div class="row font-weight-bold logo-font">
                TMS
            </div>
            <div class="row text-secondary smaller-font">
                TALENT MANAGEMENT SYSTEM
            </div>
        </div>
        <div class="list-group list-group-flush">
            <div class="list-group-item menu-header">COURSES</div>
            <router-link to="/course/add" class="list-group-item list-group-item-action bg-light">Create Course</router-link>
            <router-link to="/courses" class="list-group-item list-group-item-action bg-light">Courses</router-link>
            <router-link to="/module/add" class="list-group-item list-group-item-action bg-light">New Module</router-link>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">Modules</router-link>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">New Edition</router-link>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">Editions</router-link>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">New Lecture</router-link>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">Lectures</router-link>
            <div class="list-group-item menu-header">SCHEDULES</div>
            <router-link to="/about" class="list-group-item list-group-item-action bg-light">Schedules</router-link>
            <div class="list-group-item menu-header">EMPLOYEES</div>
            <router-link to="/employee/add" class="list-group-item list-group-item-action bg-light">New Employee</router-link>
            <router-link to="/employee/search" class="list-group-item list-group-item-action bg-light">Search Employees</router-link>
            <div class="list-group-item menu-header">TRAINERS</div>
            <router-link to="/trainer/add" class="list-group-item list-group-item-action bg-light">Create Trainer</router-link>
            <router-link to="/trainer/search" class="list-group-item list-group-item-action bg-light">Search Trainers</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>
    .logo-font {
        font-size: 22px;
    }

    .smaller-font {
        font-size: 10px;
    }

    .menu-header {
        background: #ced9d7;
        color: #8f9493;
        font-weight: bolder;
    }
</style>