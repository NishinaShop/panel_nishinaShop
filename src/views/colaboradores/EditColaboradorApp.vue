<template>
  <div>
    <Sidebar />
    <div class="main-content">
      <TopNav />

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
                    <h1 class="header-title">Editar colaborador</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/colaborador" class="nav-link"
                          >Todos los colaboradores</router-link
                        >
                      </li>
                      <li class="nav-item">
                        <router-link
                          to="/colaborador/create"
                          class="nav-link "
                        >
                          Nuevo colaborador</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->

            <template v-if="data">
              <div>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <!-- First name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label"> Nombres </label>

                      <!-- Input -->
                      <input
                        type="text"
                        class="form-control"
                        v-model="colaborador.nombre"
                        placeholder="Nombres completos"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label"> Apellidos </label>

                      <!-- Input -->
                      <input
                        type="text"
                        class="form-control"
                        v-model="colaborador.apellidos"
                        placeholder="Apellidos completos"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <!-- Email address -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1"> Correo electrónico </label>
                      <!-- Input -->
                      <input
                        type="email"
                        class="form-control"
                        v-model="colaborador.email"
                        placeholder="Correo electrónico"
                      />
                    </div>
                  </div>

                  <div class="col-12 col-md-6">
                    <!-- Birthday -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label"> Cargo </label>

                      <!-- Input -->
                      <select
                        name=""
                        class="form-select"
                        v-model="colaborador.rol"
                      >
                        <option value="" disabled selected>Seleccionar</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Inventariado">Inventariado</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- / .row -->
                <hr class="my-5" />
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="validar()"
                >
                  Guardar cambios
                </button>
              </div>
            </template>

            <template v-if="!data">
              <div>
               <ErrorNotFound /> 
               
              </div>
            </template>

            <br /><br />
          </div>
        </div>
        <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/sideBar.vue";
import TopNav from "@/components/topNav.vue";
import ErrorNotFound from "@/components/ErrorNotFound.vue";
import axios from "axios";
import store from "@/store/index"


export default {
  name: "EditColaboradorApp",

  data() {
    return {
      colaborador: {
        rol: "",
      },
      id: this.$route.params.id,
      data: false,
    };
  },

  methods: {
    init_data() {
      axios
        .get(this.$url + "/obtener_usuario_admin/" + this.id, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': store.state.token,
          },
        })
        .then((result) => {
          if (result.data == "") {
            this.data = false;
          } else {
            this.data = true;
            this.colaborador = result.data;
          }
          console.log(this.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    validar() {
      if (!this.colaborador.nombre) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese los nombres",
          type: "error",
        });
      } else if (!this.colaborador.apellidos) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese los apellidos",
          type: "error",
        });
      } else if (!this.colaborador.email) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese los email",
          type: "error",
        });
      } else if (!this.colaborador.rol) {
        this.$notify({
          title: "ERROR",
          text: "Ingrese los cargo",
          type: "error",
        });
      } else {
         this.actualizar_colaborador(); 
      }
    },

    actualizar_colaborador(){
          axios.put(this.$url+'/actualizar_usuario_admin/'+this.id,this.colaborador,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : store.state.token,
              }
          }).then((result)=>{
            console.log(result);
            this.$notify({
                title: "SUCCESS",
                text: "Se guardaron los cambios",
                type: "success"
            });
            this.$router.push({name:  'colaborador-index'});  
        }).catch((error)=>{
              console.log(error);
          });
      } 
  },

  mounted() {
    console.log(this.id);
  },

  beforeMount() {
    this.init_data();
  },

  components: {
    Sidebar,
    TopNav,
    ErrorNotFound,
    
  },
};
</script>
