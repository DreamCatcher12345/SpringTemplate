<template>
    <div>
        <div class="col-lg-3 ml-lg-auto mr-lg-auto">
            <div>
                <h1>New Course</h1>
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
                <button type="submit" data-toggle="modal" data-target="#myModal" class="btn btn-primary" v-on:click="saveCourse()">Add Course</button>
                <button class="btn btn-danger float-right" v-on:click="clearForm()">Clear</button>
            </form>
        </div>

        <submit-pop-up id="myModal" :errors=errors :message=message></submit-pop-up>
    </div>
</template>

<script>
    import axios from 'axios';
    import SubmitPopUp from "../components/submitPopUp";

    export default {
        components: {SubmitPopUp},
        data: function() {
            return {
                courseDto: {
                    title: "",
                    topic: [],
                    tags: [],
                    active: true,
                    published: true
                },
                topicDto: {
                    name: ""
                },
                tagDto: {
                    name: ""
                },
                errors: [],
                formValid: false,
                message: "",
                usedTags: [],
                usedTopics: [],
            }
        },
        name: "AddCourse",
        methods: {
            validateForm: function() {
                this.errors = [];

                if (!this.courseDto.title) {
                    this.errors.push(this.getRequiredFieldErrorMessage("Course title"));
                }
                this.formValid = !this.errors.length ? true : false;
            },
            getRequiredFieldErrorMessage: function(fieldName) {
                return "Please fill " + fieldName + " field"
            },
            saveCourse: function() {
                this.validateForm();
                console.log("PUBLISHED: " + this.courseDto.published + " ACTIVE: " + this.courseDto.active);
                if (this.formValid) {
                    axios
                        .post('http://localhost:8080/rest/course/save', this.courseDto)
                        .catch(error => (this.errors.push(error)))
                        .then(() => {
                            this.clearForm();
                            this.message = "Course saved"
                        });
                } else {
                    this.message = "Failed to save course"
                }
            },
            clearForm() {
                this.courseDto.title = this.topicDto.name = this.tagDto.name = "";
                this.courseDto.tags = [];
                this.courseDto.topic = [];
                this.courseDto.active = this.courseDto.published = true;
                this.usedTags = [];
                this.usedTopics = [];
            },
            addTopic() {
                if (this.topicDto.name !== "" && !this.usedTopics.includes(this.topicDto.name)) {
                    this.courseDto.topic.push(JSON.parse(JSON.stringify(this.topicDto)));
                    this.usedTopics.push(this.topicDto.name);
                }
                this.topicDto.name = "";

            },
            removeTopic(topic) {
                this.usedTopics.splice(topic, 1);
                this.courseDto.topic.splice(topic, 1);
            },
            addTag() {
                if (this.tagDto.name !== "" && !this.usedTags.includes(this.tagDto.name)) {
                    this.courseDto.tags.push(JSON.parse(JSON.stringify(this.tagDto)));
                    this.usedTags.push(this.tagDto.name);
                }
                this.tagDto.name = "";

            },
            removeTag(tag) {
                this.usedTags.splice(tag.name, 1);
                this.courseDto.tags.splice(tag, 1);
            }
        }
    }
</script>

<style scoped>

</style>