<template>
  <aside class="main-sidebar sidebar-light-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">
      <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">Admin Panel</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/img/user1-128x128.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Hi! You admin here :)</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group">
          <input v-model="searchSidebar" class="form-control form-control-sidebar" type="search"
                 placeholder="Пошук..." v-on:keydown.enter="startSearch">
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Blog -->
          <li class="nav-item">
            <a href="#" class="nav-link" :class="{active: activeEl === 1}"
               @click.prevent="activeEl = 1">
              <i class="nav-icon fas fa-blog"></i>
              <p>
                POSTS
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul :class="{display: activeEl !== 1, display_block: activeEl === 1}"
                class="nav nav-treeview">
              <router-link :to="{name: 'posts.index'}"><a href="" class="nav-link">
                <i class="fas fa-blog nav-icon"></i>
                <p>
                  Posts
                </p>
              </a>
              </router-link>
              <li class="nav-item">
                <router-link :to="{name: 'post_category'}"><a href="" class="nav-link">
                  <i class="fas fa-bars nav-icon"></i>
                  <p>
                    Category
                  </p>
                </a>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import router from "@/router";
import 'animate.css';

export default {
  name: "SidebarComponent",
  data() {
    return {
      searchSidebar: null,
      activeEl: 0,
    }
  },
  methods: {
    startSearch() {
      router.push({name: 'search', params: {search: this.searchSidebar}})
    },
  },
}
</script>

<style scoped>
.display {
  display: none!important;
}
.display_block{
  border: 1px solid rgba(80, 95, 255, 0.2);
  border-radius: 10px;
  display: block!important;
  margin-top: 20px;
  margin-bottom: 20px;
  animation: slideInRight;
  animation-duration: 1s;
}
</style>