<template>
    <div class="container-fluid" v-if="module !== null">
        <div class="row mt-3">
            <div class="col col-lg-auto">
                <h3>
                    <font-awesome-icon icon="university" class="mr-2"/>
                    {{module.title}}
                </h3>
            </div>
            <hr />
        </div>
        <hr />
        <div class="row">
            <div class="col-lg-6">
                <h4>
                    <font-awesome-icon icon="angle-double-right"/>
                    Lectures
                </h4>
                <div v-if="module.lectures.length > 0" >
                    <lecture-row v-for="lecture in module.lectures"
                                 v-bind:key="lecture.id"
                                 v-bind:lecture="lecture"
                    />
                </div>
                <div v-else class="m4">
                    <hr />
                    <h5> This Module has no lectures</h5>
                </div>
            </div>
            <div class="col-lg-6 border-left">
                <add-lecture-form v-bind:lecture-dto="lectureDto"></add-lecture-form>
                <submit-pop-up id="myModal" :errors=errors :message=errorMessage></submit-pop-up>
            </div>
        </div>
    </div>
    <div v-else>
        <h2>{{msg}}</h2>
    </div>
</template>

<script>
    import axios from 'axios'
    import {BASE_URL} from "../store/constants";
    import SubmitPopUp from "../components/submitPopUp";
    import AddLectureForm from "../components/lecture/AddLectureForm";
    import LectureRow from "../components/lecture/LectureRow";

    export default {
        name: "ModuleDetailView",
        components: {LectureRow, AddLectureForm, SubmitPopUp},
        props: ['id'],
        data: function() {
            return {
                module: null,
                msg: "",
                moduleId: this.id,
                lectureDto: {
                    title: "",
                    content: "",
                    moduleId: this.id
                },
                errors: [],
                formValid: false,
                errorMessage: "",
            }
        },
        mounted() {
            console.log("ID + " + this.id);
            axios.get(BASE_URL + "rest/module/" + this.id).then(response => {
                console.log(response);
                if (response.data.ok) {
                    this.module = response.data.data;
                } else {
                    this.msg = response.data.message;
                }
            })
        },
        methods: {
            validateForm: function() {
                this.errors = [];

                if (!this.lectureDto.title) {
                    this.errors.push(this.getRequiredFieldErrorMessage("Lecture title"));
                }
                if (this.lectureDto.title.length > 50) {
                    this.errors.push("Lecture title is too long!")
                }
                if (!this.lectureDto.content) {
                    this.errors.push(this.getRequiredFieldErrorMessage("Lecture content"))
                }
                this.formValid = !this.errors.length ? true : false;
            },
            getRequiredFieldErrorMessage: function(fieldName) {
                return "Please fill " + fieldName + " field"
            },
            addLecture: function() {
                this.validateForm();
                if (this.formValid) {
                    axios
                        .post(BASE_URL + 'rest/lecture/save', this.lectureDto)
                        .catch(error => (this.errors.push(error)))
                        .then(response => {
                                if (response.data.ok) {
                                    this.errorMessage = "Lecture added";
                                    this.module.lectures.push(JSON.parse(JSON.stringify(this.lectureDto)));
                                    this.lectureDto.title = "";
                                    this.lectureDto.content = "";
                                } else {
                                    this.errorMessage = response.data.message;
                                }
                            });
                    } else {
                        this.errorMessage = "Failed to add lecture"
                    }
            },
            clearForm() {
                this.lectureDto.title = "";
                this.lectureDto.content = "";
            }
        }
    }
</script>

<style scoped>

</style>