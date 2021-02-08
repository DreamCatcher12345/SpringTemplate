<template>
<div>
    <div class="col-lg-5 ml-lg-auto mr-lg-auto">
        <div>
            <hr/>
            <h1>Add module to an existing course</h1>
            <hr/>
        </div>
    <form class="col-lg-6 ml-auto mr-auto" v-on:submit.prevent>
        <div class="form-group">
            <label for="inputCourseId" class="mt-lg-2">Enter course name:</label>
            <input type="text" v-model="courseTitle" v-on:change="searchCourse()" class="form-control" id="inputCourseId" placeholder="Course name...">
        </div>
        <transition name="slide">
            <div v-if="courseFound" class="mt-lg-3">
                <h3>Course: {{ module.course.title }}</h3>
                <div class="form-group">
                    <label for="inputFirstName" class="mt-lg-2">Module title</label>
                    <input type="text" v-model="module.title" class="form-control" id="inputModuleTitle" placeholder="Module title...">
                </div>
                <hr/>
                <div class="form-group">
                    <label for="inputProgramPdf">Module program (PDF)</label>
                    <div class="row">
                        <input type="file" v-on:change="handleFileInput" class="form-control-file col-9" id="inputProgramPdf" disabled>
                        <button class="btn btn-danger disabled" v-on:click="clearFileInput()">X</button>
                    </div>
                </div>
                <hr/>
                <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#saveModuleModal" v-on:click="saveModule()">Add</button>
            </div>
        </transition>
        <h3>{{ message }}</h3>
    </form>
    </div>
    <Modal v-bind:modalId="'saveModuleModal'" v-bind:modalContent="errorListComponent" v-bind:modalBodyProps="{message: modalMessage, errors: errors}"/>
</div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue'
import ErrorList from '../components/ErrorList.vue'

export default {
    data: function() {
        return {
            courseTitle: "",
            courseFound: false,
            formValid: false,
            message: "",
            modalMessage: "",
            module: {
                title: "",
                courseId: undefined,
                course: undefined
            },
            errors: [],
            errorListComponent: ErrorList
        }
    },
    methods: {
        searchCourse() {
            this.courseFound = false;
            this.message = "";
            axios
                .post('http://localhost:8080/rest/course/search', {
                    title: this.courseTitle
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response.data.data.length && this.courseTitle) {
                        this.courseFound = true;
                        this.module.course = response.data.data[0];
                        this.module.courseId = this.module.course.id;
                    } else {
                        this.message = this.courseTitle ? "Course not found" : "";
                    }
                });
                
        },
        handleFileInput(e) {
            this.module.programPdf = e.target.files[0];
        },
        clearFileInput() {
            document.getElementById("inputProgramPdf").value = "";
        },
        validateForm() {
            this.errors = [];

            if (!this.module.title) {
                this.errors.push("Please fill module name field")
            }

            this.formValid = this.errors.length ? false : true;
        },
        saveModule() {
            /*let formData = new FormData()
            formData.append("file", this.module.programPdf);
            formData.append("module", JSON.stringify(this.module));*/
            this.validateForm();
            let unableToCreateMessage = "Unable to add module:"
            if (this.formValid) {
                axios
                    .post('http://localhost:8080/rest/module/save', this.module, {
                    })
                    .catch(error => {
                        this.modalMessage = unableToCreateMessage;
                        this.errors.push(error);
                    })
                    .then(response => {
                        if (response.data.ok) {
                            this.modalMessage = "Module added";
                            this.module.title = "";
                        } else {
                            this.modalMessage = unableToCreateMessage;
                        }
                    });
            } else {
                this.modalMessage = unableToCreateMessage;
            }
        }
    },
    components: {
        Modal,
        ErrorList
    }
}
</script>
    
<style>
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 1s;
    }
    .fade-leave {
        opacity: 1;
    }
    .fade-leave-active{
        transition: opacity 1s;
        opacity: 0;
    }

    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>