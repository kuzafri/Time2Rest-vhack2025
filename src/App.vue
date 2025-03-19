<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<template>
  <div id="app">
    <Sidebar />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}

.content-wrapper {
  flex: 1;
  margin-left: 250px; /* Same as sidebar width */
  padding: 2rem;
}

/* Global styles */
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
