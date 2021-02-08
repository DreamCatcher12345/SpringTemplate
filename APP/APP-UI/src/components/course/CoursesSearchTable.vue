<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <table style="table-layout: fixed" v-if="CourseDto.length > 0" class="table table-striped table-light table-bordered">
                    <thead>
                    <tr class="selectable selected">
                        <th style="width: 50%" class="center">Name</th>
                        <th class="center">Active</th>
                        <th class="center">Published</th>
                        <th class="center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="course in CourseDto">
                        <td>{{course.title}}</td>
                        <td>{{course.active}}</td>
                        <td>{{course.published}}</td>
                        <td class="align-content-center">
                            <router-link :to="{ name: 'courseDetailView', params: { Course: course} }">
                                <font-awesome-icon icon="eye" class="mx-5"></font-awesome-icon>
                            </router-link>
                            <router-link :to="{ name: 'editCourse', params: { courseDto: course} }">
                                <font-awesome-icon icon="edit" class="mr-5"></font-awesome-icon>
                            </router-link>
                            <a href="#">
                                <font-awesome-icon icon="trash" class="mr-5"></font-awesome-icon>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CoursesSearchTable",
        props: {
            CourseDto: Array[Object]
        }
    }
</script>

<style scoped>

</style>