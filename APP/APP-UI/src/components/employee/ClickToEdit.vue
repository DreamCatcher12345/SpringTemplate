<template>
    <div>
        <div v-if="!editMode" class="d-inline-block">
            <span @click="editMode = true" class="d-inline-block"> {{ valueLocal }} </span>
        </div>
        <div v-else class="d-inline-block">
            <input @input="$emit('input', $event.target.value)"
                   @keydown.enter="editMode=false"
                   class="form-control" type="text"
                   v-model="valueLocal">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClickToEdit",
        props: ['value'],
        data () {
            return {
                editMode: false,
                valueLocal: this.value
            }
        },
    }
</script>

<style scoped>

</style>