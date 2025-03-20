<script setup>
import Sidebar from "./components/Sidebar.vue";
import AppSidebar from "./components/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
  <div id="app" class="flex min-h-screen w-full overflow-x-hidden">
    <SidebarProvider>
      <AppSidebar />

      <div class="flex-1 w-full p-4 overflow-x-hidden">
        <SidebarTrigger />
        <router-view />
      </div>
    </SidebarProvider>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content-wrapper {
  flex: 1;
}

/* Global styles */
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}
</style>
