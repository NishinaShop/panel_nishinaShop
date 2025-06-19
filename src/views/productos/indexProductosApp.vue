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
                        <h1 class="header-title">Listado de productos</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <a class="nav-link active">
                              Todos los productos
                            </a>
                          </li>
                          <li class="nav-item">
                            <router-link to="/producto/crear" class="nav-link">Crear producto </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                
                </div>
                <div class="row">
                    <div class="col-12">
                <!-- Files -->
                    <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                    <div class="card-header">
                <!-- Title -->
                    <h4 class="card-header-title">
                    Productos
                    </h4>
        </div>
        <div class="card-header">
            <div class="input-group input-group-flush input-group-merge input-group-reverse">

                <!-- Input -->
                <input class="form-control list-search" type="search" placeholder="Busca tu producto" v-model="filtro" @input="init_data()">

                <!-- Prepend -->
                <div class="input-group-text">
                <span class="fe fe-search"></span>
                </div>

            </div>

        </div>
        <div class="card-body">

            <!-- List -->
            <template v-if="load_data">
                <div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <div class="spinner-border mt-5 mb-5" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="!load_data">
                <div>
                    <ul id="my-table" class="list-group list-group-lg list-group-flush list my-n4" v-if="productos.length >= 1">
                <li class="list-group-item" v-for="item in itemsForList">
                    <div class="row align-items-center">
                    <div class="col-auto">

                        <!-- Avatar -->
                        <a href="#!" class="avatar avatar-lg">
                        <img :src="item.portada" alt="..." class="avatar-img rounded">
                        </a>

                    </div>
                    <div class="col ms-n2">

                        <!-- Title -->
                        <h4 class="mb-1 name">
                        <a href="#!">{{ item.nombre }}</a>
                        </h4>

                        <!-- Text -->
                        <p class="card-text small text-muted mb-1">
                        {{ item.categoria }} &nbsp;
                        <span v-if="!item.estado" class="item-score badge bg-danger-soft">No publicado</span>
                        <span v-if="item.estado"class="item-score badge bg-success-soft">Publicado</span>
                        </p>

                        <!-- Time -->
                        <p class="card-text small text-muted">
                        Creación <time datetime="2018-01-03">{{ convertDate(item.createdAt) }}</time>
                        </p>

                    </div>
                    <div class="col-auto">
                        <spam><b>{{ convertCurrency(item.precio) }}</b></spam>

                    </div>
                    <div class="col-auto">

                        <!-- Dropdown -->
                        <div class="dropdown">
                        <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                        </a>
                            <div class="dropdown-menu dropdown-menu-end">
                            <router-link  class="dropdown-item" :to="{name: 'edit-producto',params:{id:item._id}}">Modificar</router-link>
                            <router-link  class="dropdown-item" :to="{name: 'variedades',params:{id:item._id}}">Variedades</router-link>
                            <router-link  class="dropdown-item" :to="{name: 'galeria-producto',params:{id:item._id}}">Galeria</router-link>
                            <a class="dropdown-item text-danger"style="cursor:pointer" @click="eliminar_producto(item._id)">Eliminar</a>
                            </div>
                        </div>

                    </div>
                    </div> <!-- / .row -->
                </li>
            </ul>
            <div class="row justify-content-center" v-if="productos.length == 0">
    <div class="col-12 col-md-6 col-xl-6 my-5">
        
        <div class="text-center">
        
        <!-- Preheading -->
        <h6 class="text-uppercase text-muted mb-4">
            Sin resultados
        </h6>

        <!-- Heading -->
        <h1 class="display-4 mb-3">
        No se encontraron coincidencias 😭
        </h1>

        <!-- Subheading -->
        <p class="text-muted mb-4">
            Al parecer no hay ningun producto que mostrar, intenta nuevamente.
        </p>

        
        
        </div>

    </div>
            </div>
                </div>
            </template>
        </div>
        <div class="card-footer">
                <b-pagination
                v-model="currentPage"
                :total-rows="productos.length"
                :per-page="perPage"
                aria-controls="my-table">
                </b-pagination>
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
      import moment from "moment";
      var currencyFormatter = require ('currency-formatter');
      import { BPagination } from 'bootstrap-vue-next'
      
      export default {
        name: 'indexProductosApp',
        data(){
            return {
                productos: [],
                filtro: '',
                load_data: false,
                currentPage: 1,
                perPage: 15,
                get itemsForList(){
                    return this.productos.slice(
                        (this.currentPage-1) * this.perPage, this.currentPage * this.perPage
                    )
                }
            }
        },
        methods:{
            init_data(){
                this.load_data = true
                const url = this.filtro 
                    ? `${this.$url}/listar_productos_admin?filtro=${encodeURIComponent(this.filtro)}`
                    : `${this.$url}/listar_productos_admin`;
                    axios.get(url,{
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.$store.state.token,
                    }
                }).then((result)=>{
                    this.productos = result.data
                    this.load_data = false;
                    console.log(result.data);
                });
            },
            convertDate(date){
                return moment(date).format('DD/MM/YYYY')
            },
            convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
            },
            eliminar_producto(id){
                axios.delete(this.$url+'/eliminar_producto_admin/'+id,{
                    headers:{
                        'Content-type': 'application/json',
                        'Authorization': this.$store.state.token,
                    }
                }).then((result)=>{
                    if(result.data.message){
                        this.$notify({
                              title: 'SUCCESS',
                              text: result.data.message,
                              type: 'success',
                            })
                    }else{
                        this.$notify({
                              title: 'SUCCESS',
                              text: 'Producto eliminado',
                              type: 'success',
                            })
                    this.init_data()
                    }
                })
            }
        },
    beforeMount() {
                this.init_data();
            },
    components: {
        sideBar,
        topNav,
        BPagination
    }
}
</script>