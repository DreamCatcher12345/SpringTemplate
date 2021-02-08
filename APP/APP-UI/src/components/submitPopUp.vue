<template>
    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <h3>{{message}}</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
                    </ul>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "submitPopUp",
        props: {
            errors: Array,
            message: String
    },
    }
</script>

<style scoped>

</style>