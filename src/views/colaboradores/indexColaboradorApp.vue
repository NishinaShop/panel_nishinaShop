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
                    <h1 class="header-title">Colaboradores</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos los colaboradores
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/colaborador/create" class="nav-link">Nuevo colaborador </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel" aria-labelledby="contactsListTab">

                <!-- Card -->
                <div class="card" data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="contactsList">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">

                        <!-- Form -->
                        <form>
                          <div class="input-group input-group-flush input-group-merge input-group-reverse">
                            <input class="form-control list-search" type="search" v-model="filtro"placeholder="Buscar Colaborador">
                            <span class="input-group-text">
                              <i class="fe fe-search"></i>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div> <!-- / .row -->
                  </div>
                 <div class="card-body p-0">
                   <div class="table-responsive" style="overflow-x: auto; max-width: 100%;">
                    <table class="table table-sm table-hover table-nowrap card-table "style="width: 100%; table-layout: fixed;">
                      <thead>
                        <tr>
                          <th style="width: 25%;">
                            <a class="list-sort text-muted" >Nombre</a>
                          </th>
                          <th style="width: 20%;">
                            <a class="list-sort text-muted" >Cargo</a>
                          </th>
                          <th style="width: 30%;">
                            <a class="list-sort text-muted" >Email</a>
                          </th>
                          <th style="width: 10%;">
                            <a class="list-sort text-muted" >Estado</a>
                          </th>
                          <th style="width: 10%;">
                            <a class="list-sort text-muted" ></a>
                          </th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr v-for="item in colaboradores">
                              
                              <td>
                                <!-- Avatar -->
                                <div class="avatar avatar-xs align-middle me-2">
                                  <img class="avatar-img rounded-circle" src="/assets/img/avatar-1.png" alt="...">
                                </div> <a class="item-name text-reset" >{{item.nombre.split(" ")[0] }} {{item.apellidos.split(" ")[0] }}</a>
    
                              </td>
                              <td>
    
                                <!-- Text -->
                                <span class="item-title">{{item.rol }}</span>
    
                              </td>
                              <td>
                                <!-- Email -->
                                <a class="item-email text-reset">{{ item.email.substr(0,28) }}</a>
                              </td>
                                <!-- Badge -->
                                <td>
                                <span v-if="!item.estado" class="item-score badge bg-danger-soft">Inactivo</span>
                                <span v-if="item.estado"class="item-score badge bg-success-soft">Activo</span>
    
                              </td>
                              <td class="text-end">
    
                                <!-- Dropdown -->
                                <div class="dropdown">
                                  <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-end">
                                    <router-link :to="{name: 'colaborador-edit',params:{id: item._id}}"class="dropdown-item">
                                      Editar
                                      </router-link>
                                    <a style="cursor:pointer" class="dropdown-item" @click="cambiarEstado(item._id, item.estado)">
                                      <span v-if="!item.estado">activar</span>
                                      <span v-if="item.estado">desactivar</span>
                                    </a>
                                    <!--<a href="#!" class="dropdown-item">
                                      Eliminar
                                    </a>-->
                                  </div>
                                </div>
    
                              </td>
                                </tr>
                      </tbody>
                      <tr v-if="load_data">
                        <td colspan="5" class="text-center">
                          <div class="spinner-border mt-5 mb-5" role="status">
                           <span class="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                 </div>
                   <div class="card-footer d-flex justify-content-between">
                    <!-- Pagination (prev) -->
                    <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-0 pe-4 border-end" href="#">
                          <i class="fe fe-arrow-left me-1"></i> Prev
                        </a>
                      </li>
                    </ul>

                    <!-- Pagination -->
                    <ul class="list-pagination pagination pagination-tabs card-pagination"></ul>

                    <!-- Pagination (next) -->
                    <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-4 pe-0 border-start" href="#">
                          Next <i class="fe fe-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>

                    <!-- Alert -->
                    <div class="list-alert alert alert-dark alert-dismissible border fade" role="alert">

                      <!-- Content -->
                      <div class="row align-items-center">
                        <div class="col">

                          <!-- Checkbox -->
                          <div class="form-check">
                            <input class="form-check-input" id="listAlertCheckbox" type="checkbox" checked disabled>
                            <label class="form-check-label text-white" for="listAlertCheckbox">
                              <span class="list-alert-count">0</span> deal(s)
                            </label>
                          </div>

                        </div>
                        <div class="col-auto me-n3">

                          <!-- Button -->
                          <button class="btn btn-sm btn-white-20">
                            Edit
                          </button>

                          <!-- Button -->
                          <button class="btn btn-sm btn-white-20">
                            Delete
                          </button>

                        </div>
                      </div> <!-- / .row -->

                      <!-- Close -->
                      <button type="button" class="list-alert-close btn-close" aria-label="Close"></button>

                    </div>

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
  import axios from "axios";
  import store from "@/store/index"
  export default {
    name: 'indexColaboradorApp',

    data(){
      return{
        colaboradores: [],
        colaboradores_const:[],
        filtro: '',
        load_data: false,
      }
    },
    components: {
      sideBar,
      topNav
    },
    methods:{
    filtrar(){
      let terms = new RegExp (this.filtro,'i');
      this.colaboradores = this.colaboradores_const.filter(item=>terms.test(item.nombre)||terms.test(item.apellidos)||terms.test(item.email));

    },
    init_data(){
      this.load_data = true;
      axios.get(this.$url+ '/listar_usuarios_admin'+this.filtro,{
        headers:{
          'Content-Type': 'application/json', 
          'Authorization': store.state.token,
        }
      }).then((result)=>{
        this.colaboradores  = result.data;
        this.colaboradores_const = this.colaboradores;
        console.log(this.colaboradores);
        this.load_data = false;
      }).catch((error)=>{
        console.log(error);
      });
    },
    cambiarEstado(id, estado){
      axios.put(this.$url +'/cambiar_estado_usuario_admin/'+ id,{estado: estado},{
        headers:{
          'Content-Type': 'application/json', 
          'Authorization': store.state.token,
        } 
      }).then((result)=>{
        console.log(result)
        this.init_data();
        this.$notify({
          title: 'SUCCESS',
          text: 'Cambio de estado aplicado',
          type: 'success',
        })
      }).catch((error)=>{
        console.log(error);
      });
    }
    },
    beforeMount(){
      this.init_data();
    },
  }
  </script>
  