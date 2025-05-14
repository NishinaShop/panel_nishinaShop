<template>
  <nav class="navbar navbar-expand-md navbar-light d-md-flex">
    <div class="container-fluid">
      <!-- Form -->
      <form class="form-inline me-4 d-none d-md-flex"></form>
      <!-- User -->
      <div class="navbar-user">
        <!-- Dropdown -->
        <div class="dropdown">
          <!-- Toggle -->
          <a
            href="#"
            class="avatar avatar-sm avatar-online dropdown-toggle "
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
          <img
              src="/assets/img/avatar-1.png"
              alt="..."
              class="avatar-img rounded-circle"
            />
          </a>

          <!-- Menu -->
          <div class="dropdown-menu dropdown-menu-end">
            <a  class="dropdown-item">Perfil</a>
            <a  class="dropdown-item">ajustes</a>
            <hr class="dropdown-divider" />
            <a  class="dropdown-item" @click="logout()">Cerrar sesión</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "topNav",
 
  methods:{
  logout(){
    this.$store.dispatch("logout");
      if(this.$router.path !== '/') this.$router.push({ name: "login" });
  }
}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
