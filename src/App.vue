<template>
  <div>
    <div class="wrapper">
      <NavbarComponent v-if="auth"></NavbarComponent>
      <SidebarComponent v-if="auth"></SidebarComponent>
        <router-view></router-view>
      <!-- Main Footer -->
      <footer v-if="auth" class="main-footer pt-4">
        <strong>Copyright Maxvel &copy;</strong>
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 0.1
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/views/app/layouts/NavbarComponent.vue";
import SidebarComponent from "@/views/app/layouts/SidebarComponent.vue";
import Login from "@/views/app/login/Login.vue";
import getCookie from "@/js/cookie";

export default {
  name: "App.vue",
  components: {Login, SidebarComponent, NavbarComponent},
  data() {
    return {
      auth: getCookie('x-auth-token')
    }
  },
}

</script>

<style>

</style>
