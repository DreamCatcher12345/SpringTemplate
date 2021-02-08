<template>
    <h5 v-if="lecture !== undefined" style="width: 100%">
        <hr />
        {{lecture.title}}
        <div class="float-right ml-5">
            <router-link :to="{name: 'moduleDetailView', params: {id: lecture.id}}"><font-awesome-icon icon="eye" class="mr-2"/></router-link>
            <a href="#"><font-awesome-icon icon="trash" class="ml-3"/></a>
        </div>
    </h5>
</template>

<script>
    export default {
        name: "LectureRow",
        props: {
            lecture:{
                title: String,
                id: Number
            }
        }
    }
</script>

<style scoped>

</style>