<template>
<div>
    <sideBar />
    <div class="main-content">
      <topNav />
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Pretitle -->
                    <h6 class="header-pretitle">Panel de administración</h6>
                    <!-- Title -->
                    <h1 class="header-title">Nueva salida</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                        <li class="nav-item">
                        <router-link to="/extraordinario" class="nav-link">Todos los registro</router-link>
                      </li>
                      
                      <li class="nav-item">
                        <router-link to="/extraordinario/ingreso" class="nav-link">Nuenvo ingreso</router-link>
                      </li>
                        <li class="nav-item">
                        <a class="nav-link active">
                          Nuenva salida
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- / .row -->
      </div>
    </div>
</div>
  </template>
  
  <script>
  import sideBar from "@/components/sideBar.vue";
  import topNav from "@/components/topNav.vue";
  
  export default {
    name: 'indexExtraApp',
    components: {
      sideBar,
      topNav
    }
}
</script>