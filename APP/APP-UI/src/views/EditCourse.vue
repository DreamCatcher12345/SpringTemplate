<template>
  <div>
        <div class="col-lg-3 ml-lg-auto mr-lg-auto">
            <div>
                <hr/>
                <h1>Edit Course</h1>
                <hr/>
            </div>
            <form id="formAddCourse" v-on:submit.prevent>
                <div class="form-group">
                    <label for="inputCourseTitle">Course title</label>
                    <input type="text" v-model.trim="courseDto.title" class="form-control" id="inputCourseTitle" placeholder="Course title...">
                </div>
                <br>
                Active
                <input class="" type="checkbox" v-model="courseDto.active"><br>
                Published
                <input class="" type="checkbox" v-model="courseDto.published">
                <hr />
                <div class="form-group">
                    <label for="inputCourseTitle">Topic title</label>
                    <input type="text" v-model.trim="topicDto.name" class="form-control" id="inputTopicTitle" placeholder="Topic title...">
                </div>
                <button type="submit" class="btn btn-secondary" v-on:click="addTopic()">Add Topic</button>
                <hr v-if="courseDto.topic.length"/>
                <span class="p-1 m-2 bg-light" v-for="(topic, index) in courseDto.topic" v-bind:key="'topic' + index">
                    {{topic.name}}
                    <button class="btn mb-1" v-on:click="removeTopic(courseDto.topic.indexOf(topic))"><font-awesome-icon icon="times"></font-awesome-icon></button>
                </span>
                <hr />
                <div class="form-group">
                    <label for="inputTagTitle">Tag title</label>
                    <input type="text" v-model.trim="tagDto.name" class="form-control" id="inputTagTitle" placeholder="Tag title...">
                </div>
                <button type="submit" class="btn btn-secondary" v-on:click="addTag()">Add Tag</button>
                <hr v-if="courseDto.tags.length"/>
                <span class="p-1 m-2 bg-light" v-for="(tag, index) in courseDto.tags" v-bind:key="'tag' + index">
                    {{tag.name}}
                    <button class="btn mb-1" v-on:click="removeTag(courseDto.tags.indexOf(tag))"><font-awesome-icon icon="times"></font-awesome-icon></button>
                </span>
                <hr />
                <button type="submit"  data-toggle="modal" data-target="#updateCourseModal" class="btn btn-primary" v-on:click="updateCourse()">Update</button>
            </form>
        </div>
        <Modal v-bind:modalId="'updateCourseModal'" v-bind:modalContent="errorListComponent" v-bind:modalBodyProps="{message: message, errors: errors}"/>
    </div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue'
import ErrorList from '../components/ErrorList.vue'

export default {
    props: {
        courseDto: Object
    },
    data() {
        return {
            topicDto: {
                name: ""
            },
            tagDto: {
                name: ""
            },
            errors: [],
            message: "",
            validCourse: false,
            errorListComponent: ErrorList
        }
    },
    methods: {
        validateCourse() {
            this.errors = [];

            if (!this.courseDto.title) {
                this.errors.push("Course name shouldn't be empty");
            }

            this.validCourse = !this.errors.length ? true : false;
        },
        updateCourse() {
            this.validateCourse();
            console.log(this.courseDto);
            let unableToUpdateMessage = "Unable to update course"

            if (this.validCourse) {
                axios
                    .post('http://localhost:8080/rest/course/save', this.courseDto)
                    .catch(error => {
                        this.errors.push(error);
                        this.message = unableToUpdateMessage
                    })
                    .then(response => {
                        console.log(response);
                        if (response.data.ok) {
                            this.message = "Course updated";
                        } else {
                            this.message = unableToUpdateMessage;
                            this.errors.push(response.data.message);
                        }
                    })
            } else {
                this.message = unableToUpdateMessage;
            }
        
        },
        addTopic() {
                if (this.topicDto.name !== "" && !this.courseDto.topic.includes(this.topicDto.name)) {
                    this.courseDto.topic.push(JSON.parse(JSON.stringify(this.topicDto)));
                }
                this.topicDto.name = "";

        },
        removeTopic(topic) {
            this.courseDto.topic.splice(topic, 1);
        },
        addTag() {
            if (this.tagDto.name !== "" && !this.courseDto.tags.includes(this.tagDto.name)) {
                this.courseDto.tags.push(JSON.parse(JSON.stringify(this.tagDto)));
            }
            this.tagDto.name = "";

        },
        removeTag(tag) {
            this.courseDto.tags.splice(tag, 1);
        }
    },
    components: {
        Modal,
        ErrorList
    }
}
</script>

<style>

</style>