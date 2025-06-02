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
                    <h1 class="header-title">Inventario</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos las existencias
                        </a>
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
                    Lista de productos
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
        <div class="card">

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
            <div v-if="!load_data" class="table-responsive">
                
                  
                        <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                            <th>Nombre:</th>
                            <th>Fecha:</th>
                            <th>Precio:</th>
                            <th>Stock:</th>
                            <th>*</th>
                            </tr>
                        </thead>
                        <tbody class="fs-base" v-if="productos.length >= 1">
                            <tr v-for="item in  productos">
                            <td>
                                <a >{{item.nombre  }}</a>
                            </td>
                            <td>
                                <small datetime="2020-04-24">{{cDate(item.createdAt)}} </small>
                            </td>
                            <td>
                                {{convertCurrency(item.precio)}}
                            </td>
                            <td>
                                <a :href="item.documento" target="_blank">
                                    <span>{{ item.stock }}</span>
                                </a>
                            </td>
                            <td>
                                <button type="button"class="btn btn-primary btn-sm"> <router-link :to="{name: 'detalle-ingreso', params:{id:   item._id}}">
                                    <b class="text-white">detalles</b>
                                </router-link></button>
                                
                            </td>
                            </tr>
                        </tbody>
                        <tbody v-if="productos.length == 0">
                            <tr>
                                <td colspan="5">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-6 col-xl-12 my-5">
                                            <div class="text-center">
                                                <h6 class="text-uppercase text-muted mb-4">
                                                    Sin registros.
                                                </h6>
                                                <h1 class="mb-3">
                                                <b>No hay registros con los parametros actuales</b>
                                                </h1>
                                                 <p class="text-muted mb-4">
                                                    Ingresa un rango de busqueda diferente 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    
                
                    </div>
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
    name: 'inventariodApp',
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
            cDate(date){
                return moment(date).format('DD/MM/YYYY')
            },
            convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
            },
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