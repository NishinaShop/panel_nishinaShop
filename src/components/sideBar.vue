<template>
  <nav class="navbar navbar-vertical fixed-start navbar-expand-md navbar-light" id="sidebar">
    <div class="container-fluid">
      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarCollapse"
        aria-controls="sidebarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Brand -->
      <a class="navbar-brand" href="./index.html">
      <img
          src="https://res.cloudinary.com/dqitdaxd8/image/upload/nishina-logo_Mesa_de_trabajo_1_a0mio8.png"
          class="navbar-brand-img mx-auto"
          alt="..."
        />
      </a>

      <!-- User (xs) -->
      <div class="navbar-user d-md-none">
        <!-- Dropdown -->
        <div class="dropdown">
          <!-- Toggle -->
          <a
            href="#"
            id="sidebarIcon"
            class="dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="avatar avatar-sm avatar-online">
              <img
                src="/assets/img/avatar-1.jpg"
                class="avatar-img rounded-circle"
                alt="..."
              />
            </div>
          </a>

          <!-- Menu -->
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="sidebarIcon"
          >
            <a href="" class="dropdown-item">Profile</a>
            <a href="" class="dropdown-item">Settings</a>
            <hr class="dropdown-divider" />
            <a href="" class="dropdown-item">Logout</a>
          </div>
        </div>
      </div>

      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidebarCollapse">
        <!-- Form -->
        <form class="mt-4 mb-3 d-md-none">
          <div
            class="input-group input-group-rounded input-group-merge input-group-reverse"
          >
            <input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div class="input-group-text">
              <span class="fe fe-search"></span>
            </div>
          </div>
        </form>

        <!-- Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#sidebarDashboards"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="true"
              aria-controls="sidebarDashboards"
            >
              <i class="fe fe-home"></i> inicio
            </a>
            <div class="collapse show" id="sidebarDashboards">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <router-link to="/dashboard" class="nav-link">
                    Dashboard
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/colaborador" class="nav-link" active-class="active"><i class="fe fe-user"></i> Colaboradores</router-link>
          </li>
          <li class="nav-item d-md-none">
            
          </li>
        </ul>
        <hr class="navbar-divider my-3">
          <h6 class="navbar-heading">
            Almacen
          </h6>
          <ul class="navbar-nav mb-md-4">
            <li class="nav-item">
            <router-link to="/producto" class="nav-link" active-class="active"><i class="fe fe-shopping-cart"></i> Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categorias" class="nav-link" active-class="active"><i class="fe fe-tag "></i>Categorias</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ingreso" class="nav-link" active-class="active"><i class="fe fe-folder-plus"></i> Ingresos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/salidas" class="nav-link" active-class="active"><i class="fe fe-folder-minus"></i>Salidas</router-link>
          </li>
          <li class="nav-item" >
            <router-link to="/inventario" class="nav-link" active-class="active"><i class="fe fe-list"></i>Inventario</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/extraordinario" class="nav-link" active-class="active"><i class="fe fe-clipboard"></i>Extraordinario</router-link>
          </li>
          </ul>
          <hr class="navbar-divider my-3">
          <h6 class="navbar-heading">
            Ventas
          </h6>
          <ul class="navbar-nav mb-md-4">
            <li class="nav-item">
            <router-link to="/ventas" class="nav-link" active-class="active"><i class="fe fe-shopping-cart"></i> Ordenes de compra</router-link>
          </li>
          </ul>
          <!-- Push content down -->
        <div class="mt-auto"></div>
        <!-- User (md) -->
        <div class="navbar-user d-none d-md-flex" id="sidebarUser">
          <!-- Icon -->
          <a
            class="navbar-user-link"
            data-bs-toggle="offcanvas"
            href="#sidebarOffcanvasActivity"
            aria-controls="sidebarOffcanvasActivity"
          >
            <span class="icon">
              <i class="fe fe-bell"></i>
            </span>
          </a>
        </div>
      </div>
      <!-- / .navbar-collapse -->
    </div>
  </nav>
</template>

<script>
export default {
  name: "sideBar",
};
</script>
