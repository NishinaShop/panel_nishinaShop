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
                    <h1 class="header-title">Lista de salidas</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todas las Salidas
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-5">
                    <div class="col-9 d-flex">
                        <input type="date" class="form-control" v-model="desde" style="margin-right: 1rem"/>
                        <input type="date" class="form-control" v-model="hasta"/>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" style="width:100%" v-on:click="init_data()">Buscar</button>
                    </div>
                </div>
            <div class="card">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title mb-0">
                            <b>Salidas de inventario</b>
                        </h4>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                            <th>Nombre:</th>
                            <th>Clave:</th>
                            <th>Fecha:</th>
                            <th>Precio:</th>
                            <th>Cant:</th>
                            <th>*</th>
                            </tr>
                        </thead>
                        <tbody class="fs-base" v-if="salidas.length >= 1">
                            <tr v-for="item in salidas">
                            <td>
                                <small><b>{{ item.producto.nombre }}</b></small>
                                <div>
                                  <small>{{ item.variedad.color+'-'+item.variedad.talla }}</small>
                                </div>
                            </td>
                            <td>
                                <small>{{item.producto.clave}} </small>
                            </td>
                            <td>
                                <small>{{cDate(item.createdAt)}}</small>
                            </td>
                            <td>
                              <small>{{ convertCurrency(item.producto.precio) }}</small>
                            </td>
                            <td>
                               <small> {{item.cantidad}}</small>
                            </td>
                            <td>
                                <button type="button"class="btn btn-primary btn-sm"> <router-link :to="{name: 'detalle-ingreso', params:{id:   item._id}}">
                                    <b class="text-white">ver</b>
                                </router-link></button>
                                
                            </td>
                            </tr>
                        </tbody>
                        <tbody v-if="salidas.length == 0">
                            <tr>
                                <td colspan="6">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-6 col-xl-12 my-5">
                                            <div class="text-center">
                                                <h6 class="text-uppercase text-muted mb-4">
                                                    Sin registros.
                                                </h6>
                                                <h1 class="mb-3">
                                                <b>No hay registros en ese margen de fechas</b>
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
    name: 'salidasApp',
    data(){
       return{
        desde: '',
        hasta: '',
        salidas: []
       }
    },
    methods:{
init_data(){
            if(!this.desde){
                this.$notify({
                    title: 'ATENCIÓN',
                    text: 'Seleccione la fecha de inicio para el rango de búsqueda',
                    type: 'warn',
                })
            }else if(!this.hasta){
                this.$notify({
                    title: 'ATENCIÓN',
                    text: 'Seleccione la fecha de fin para el rango de búsqueda',
                    type: 'warn',
                })
            }else{
                axios.get(this.$url+'/obtener_salidas_admin/'+this.desde+'/'+this.hasta,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result)=>{
                this.salidas = result.data
                console.log(this.salidas);
                
            })
        }
            },
             cDate(item){
                  return moment(item).format('DD/MM/YYYY')
            },
            convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
            },  
    },
    components: {
      sideBar,
      topNav
    }
    
}
</script>