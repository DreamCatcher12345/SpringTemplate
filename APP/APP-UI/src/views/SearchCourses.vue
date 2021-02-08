<template>
    <div class="container-fluid float-left">
        <div class="row mt-3">
            <h3 class="mr-4 pl-3">
                <font-awesome-icon icon="university" class="mr-2"></font-awesome-icon>
                Courses
            </h3>
        </div>
        <div class="row dropdown-divider">
        </div>
        <form class="form-group" v-on:submit.prevent>
            <div class="row mt-3">
                <div class="col col-lg-3 col-12">
                    <label for="CourseName" class="float-left">Course name:</label>
                    <input type="text" id="CourseName" placeholder="Enter course name..." class="form-control"
                           v-model="CourseSearchDto.title">
                </div>
                <div class="col col-lg-3 col-12">
                    <label for="CourseIsActive">Active:</label>
                    <select v-model="CourseSearchDto.active" id="CourseIsActive" class="form-control">
                        <option selected value="">Do not filter by active</option>
                        <option value="true">Active</option>
                        <option value="false">Not active</option>
                    </select>
                </div>
                <div class="col col-lg-3 col-12">
                    <label for="CourseTags" class="float-left">Tags:</label>
                    <input type="text" id="CourseTags" placeholder="Tags (separate by comma)..." class="form-control"
                           v-model="courseTagsAsString">
                </div>
                <div class="col col-lg-3 col-12">
                    <label for="CourseTopics" class="float-left">Tags:</label>
                    <input type="text" id="CourseTopics" placeholder="Topics (separate by comma)..."
                           class="form-control"
                           v-model="courseTopicsAsString">
                </div>
            </div>
            <div class="row my-3">
                <div class="col">
                    <button type="submit" class="btn btn-primary mr-2 px-2 py-1" @click="submitForm">Apply filter</button>
                    <button class="btn btn-danger px-2 py-1" @click="resetFilter">Reset filter</button>
                </div>
            </div>
        </form>
        <div class="row">
            <courses-search-table :CourseDto="CourseDto"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import CoursesSearchTable from "../components/course/CoursesSearchTable";

    export default {
        name: "SearchCourses",
        components: {
            CoursesSearchTable
        },
        data() {
            return {
                message: '',
                courseTagsAsString: '',
                courseTopicsAsString: '',
                CourseSearchDto: {
                    title: "",
                    active: "",
                    tags: [],
                    topics: []
                },
                CourseDto: {
                    active: false,
                    id: '',
                    modules: [
                        {
                            title: '',
                            courseId: '',
                            CourseDto: null,
                            programPDF: File
                        }
                    ],
                    published: false,
                    tags: [
                        {
                            id: '',
                            name: ''
                        }
                    ],
                    tagsList: [],
                    title: '',
                    topic: [
                        {
                            id:'',
                            name: ''
                        }
                        ],
                    topicsList: []
                }
            }
        },
        methods: {
            resetFilter() {
                this.CourseSearchDto.title = '';
                this.CourseSearchDto.active = '';
                this.CourseSearchDto.tags = [];
                this.CourseSearchDto.topics = [];
                this.courseTagsAsString = '';
                this.courseTopicsAsString = '';
            },
            submitForm() {

                if (this.courseTagsAsString.trim().length > 0) {
                    this.CourseSearchDto.tags = this.courseTagsAsString.split(",")
                }

                if (this.courseTopicsAsString.trim().length > 0) {
                    this.CourseSearchDto.topics = this.courseTopicsAsString.split(",")
                }

                axios.post("http://localhost:8080/rest/course/search", this.CourseSearchDto)
                    .then(resp => (this.CourseDto = resp.data.data))
                    .then(err => console.error(err))
            }
        },
        mounted() {
            this.submitForm()
        }
    }
</script>

<style scoped>

</style>