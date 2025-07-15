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
                    <h1 class="header-title">Ingresos y salidas extraordinarias</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos los registros
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/extraordinario/ingreso" class="nav-link">Nuevo ingreso</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link to="/extraordinario/salida" class="nav-link">Nueva salida</router-link>
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
                    Lista de registros
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
                            <th>Variedad:</th>
                            <th>Precio:</th>
                            <th>Cant:</th>
                            <th>Tipo:</th>
                            
                            </tr>
                        </thead>
                        <tbody class="fs-base" v-if="registros.length >= 1">
                            <tr v-for="item in  registros">
                            <td>
                                <a v-if="!item.producto.nombre">Producto borrado</a>
                                <a v-if="item.producto.nombre">{{item.producto.nombre}}</a>
                            </td>
                            
                            <td>
                                {{ item.color.color }} - {{ item.talla.talla }} 
                            </td>
                            <td>
                                <span v-if="!item.precio">s/m</span>
                                    <span v-if="item.precio">{{convertCurrency(item.precio)}}</span>
                            </td>
                            <td>
                              <span v-if="!item.cantidad">0</span>
                               <span v-if="item.cantidad">{{ item.cantidad }} </span>
                                
                            </td>
                            <td>
                                <small datetime="2020-04-24">{{item.registro}} </small>
                            </td>
                            </tr>
                        </tbody>
                        <tbody v-if="registros.length == 0">
                            <tr>
                                <td colspan="5">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-6 col-xl-12 my-5">
                                            <div class="text-center">
                                                <h6 class="text-uppercase text-muted mb-4">
                                                    Sin registros.
                                                </h6>
                                                <h1 class="mb-3">
                                                <b>No hay registros que mostrar</b>
                                                </h1>
                                                 <p class="text-muted mb-4">
                                                    No se encontraron registros guardados 
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
                :total-rows="registros.length"
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
  import { BPagination } from 'bootstrap-vue-next'
  import axios from "axios";
  import moment from "moment";
  var currencyFormatter = require ('currency-formatter');
  
  export default {
    name: 'indexExtraApp',
    data(){
            return {
                registros: [],
                load_data: false
            }
          },
    methods:{
      listar_registros(){
        axios.get(this.$url+'/listado_registros_extraordinarios',{
          headers:{
            'Content-type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
          this.registros = result.data
        })
      },
      cDate(item){
            return moment(item).format('DD/MM/YYYY')
      },
      convertCurrency(number){
          return currencyFormatter.format(number,{code:'MXN'})
      },
    },
    beforeMount(){
      this.listar_registros()
    },
    components: {
      sideBar,
      topNav,
      BPagination
    }
}
</script>