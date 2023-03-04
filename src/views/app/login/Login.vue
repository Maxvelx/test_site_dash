<template>
  <section class="vh-100 bg">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="text-white" style="background: transparent">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Admin Panel</h2>
                <p class="text-white-50 mb-5"></p>
                <form @submit.prevent="submit">
                  <div class="form-outline form-white mb-4 ">
                    <input required type="email" autocomplete="new-email" id="typeEmailX" placeholder="Login"
                           v-model="email"
                           class="form-control form-control-lg"/>
                  </div>

                  <div class="form-outline form-white mb-5">
                    <input required type="password" id="typePasswordX" autocomplete="new-password"
                           v-on:keydown.enter="loginAuth"
                           placeholder="Password"
                           v-model="password" class="form-control form-control-lg"/>
                  </div>
                  <button type="submit" class="btn btn-outline-light btn-lg px-5">Sing In
                  </button>
                </form>

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      message: null,
    }
  },
  methods: {

    submit() {
      api.post('/api/auth/login', {email: this.email, password: this.password})
          .then(res => {
            document.cookie = "x-auth-token = "
                + res.data.token_access + ";"
                + "max-age =" + res.data.expires_in + ";"
                + "secure;"
            router.go()
          })
    },


  },
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 300% 300%;
  background-image: linear-gradient(
      -45deg,
      rgb(8, 57, 139) 0%,
      rgb(41, 70, 213) 25%,
      rgb(102, 42, 124) 51%,
      rgb(84, 6, 167) 100%
  );
}
</style>