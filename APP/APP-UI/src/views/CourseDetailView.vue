<template>
    <div class="container-fluid">
        <div class="row mt-3">
            <div class="col col-lg-auto">
                <h3>
                    <font-awesome-icon icon="university" class="mr-2"/>
                    {{Course.title}}
                </h3>
            </div>
            <div class="col">
                <p class="small mb-0 pt-1 mt-2">#{{Course.id}}</p>
            </div>
            <div class="col col-lg-auto">
                <h5>
                    <font-awesome-icon v-if="Course.active === true" icon="toggle-on" class="mr-2 pt-1 mt-1 ml-3"/>
                    <font-awesome-icon v-else icon="toggle-off" class="mr-2 pt-1 mt-1 ml-3"/>
                    Active
                </h5>
            </div>
            <div class="col col-lg-auto">
                <h5>
                    <font-awesome-icon v-if="Course.published === true" icon="toggle-on" class="mr-2 pt-1 mt-1 ml-3"/>
                    <font-awesome-icon v-else icon="toggle-off" class="mr-2 pt-1 mt-1 ml-3"/>
                    Published
                </h5>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col col-lg-3 mr-5">
                <h4>
                    <font-awesome-icon icon="angle-double-right"/>
                    Tags
                </h4>
                <hr>
                <div class="row">
                    <div class="col">
                        <div v-if="Course.tags.length > 0">
                            <p v-for="tags in Course.tags">
                                {{tags.name}}<br>
                            </p>
                        </div>
                        <p v-else> This course has no tags</p>
                    </div>
                </div>
            </div>
            <div class="col col-lg-3">
                <h4>
                    <font-awesome-icon icon="angle-double-right"/>
                    Topics
                </h4>
                <hr>
                <div v-if="Course.topic.length > 0">
                    <p v-for="topic in Course.topic">
                        {{topic.name}}<br>
                    </p>
                </div>
                <p v-else> This course has no topics</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h4>
                    <font-awesome-icon icon="angle-double-right"/>
                    Modules
                </h4>
                <hr>
                <div class="col-6">
                    <div v-if="Course.modules.length > 0" class="my-4">
                        <div v-for="module in Course.modules">
                            <h5>
                                {{module.title}}
                                <div class="float-right">
                                    <router-link :to="{name: 'moduleDetailView', params: {id: module.id}}"><font-awesome-icon icon="eye" class="mr-2"/></router-link>
                                    <a href="#"><font-awesome-icon icon="trash" class="ml-3"/></a>
                                </div>
                            </h5>

                            <hr>
                        </div>
                    </div>
                    <div v-else class="my-4">
                        <p> This course has no modules</p>
                    </div>
                </div>
            </div>
            <div class="col">

            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "CourseDetailView",
        props: {
            Course: Object
        }
    }
</script>

<style scoped>

</style>