<template>
    <div>
        <h4>
            <font-awesome-icon icon="angle-double-right" class="mr-2"/>
            Add new lecture
        </h4>
        <hr/>
        <form id="formAddCourse" v-on:submit.prevent>
            <div class="form-group">
                <label for="inputCourseTitle">Lecture title</label>
                <input type="text" v-model.trim="lectureDto.title" class="form-control" id="inputCourseTitle" placeholder="Lecture title...">
            </div>
            <div class="form-group">
                <label for="inputCourseTitle">Lecture content</label>
                <input type="text" v-model.trim="lectureDto.content" class="form-control" id="inputTopicTitle" placeholder="Lecture content...">
            </div>
            <hr />
            <button type="submit" data-toggle="modal" data-target="#myModal" class="btn btn-primary" v-on:click="addLecture()">Add lecture</button>
            <button class="btn btn-danger float-right" v-on:click="clearForm()">Clear</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddLectureForm",
        props: {
          lectureDto: {
              title: "",
              content: ""
          }
        },
        data () {
            return {
                errors: [],
                formValid: false,
                errorMessage: "",
            }
        },
        methods: {
            addLecture() {
                this.$parent.addLecture();
            },
            clearForm() {
                this.$parent.clearForm();
            }
        }
    }
</script>

<style scoped>

</style>