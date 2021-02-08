<template>
  <div class="d-flex" id="wrapper">
    <Sidebar />
    <div id="page-content-wrapper">
      <Navbar />
      <div class="container-fluid">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

td{
  word-break: break-word;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
  import Sidebar from "./components/page/Sidebar";
  import Navbar from "./components/page/Navbar";
  export default {
    components: {Navbar, Sidebar}
  }
</script>