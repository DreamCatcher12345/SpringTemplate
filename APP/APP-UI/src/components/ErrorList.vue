<template>
    <div>
        <h3>{{message}}</h3>
        <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['message', 'errors'],
}
</script>

<style>

</style>