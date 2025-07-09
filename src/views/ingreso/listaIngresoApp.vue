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
                        <h1 class="header-title">Lista de ingresos</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <a class="nav-link active">
                               Ingresos
                            </a>
                          </li>
                          <li class="nav-item">
                            <router-link class="nav-link" to="/ingreso/crear">Nuevo ingreso </router-link>
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
                            <b>Ingresos a inventario</b>
                        </h4>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                            <th>Serie:</th>
                            <th>Fecha:</th>
                            <th>Total:</th>
                            <th>Factura:</th>
                            <th>*</th>
                            </tr>
                        </thead>
                        <tbody class="fs-base" v-if="ingresos.length >= 1">
                            <tr v-for="item in  ingresos">
                            <td>
                                <a >#{{ item.serie.toString().padStart(6,'0') }}</a>
                            </td>
                            <td>
                                <time datetime="2020-04-24">{{cDate(item.createdAt)}} </time>
                            </td>
                            <td>
                                {{convertCurrency(item.monto_total)}}
                            </td>
                            <td>
                                <a :href="item.documento" target="_blank">
                                    <span class="badge bg-primary"><b>{{ item.ncomprobante }}</b></span>
                                </a>
                            </td>
                            <td>
                                <button type="button"class="btn btn-primary btn-sm"> <router-link :to="{name: 'detalle-ingreso', params:{id:   item._id}}">
                                    <b class="text-white">detalles</b>
                                </router-link></button>
                                
                            </td>
                            <td><div class="dropdown">
                        <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                        </a>
                            <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item text-danger"style="cursor:pointer" @click="eliminar_ingreso(item._id)">Eliminar</a>
                            </div>
                        </div></td>
                            </tr>
                        </tbody>
                        <tbody v-if="ingresos.length == 0">
                            <tr>
                                <td colspan="5">
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
<style>
.btn-custom {
    color: white !important;
  }
</style>
<script>
    import sideBar from "@/components/sideBar.vue";
    import topNav from "@/components/topNav.vue";
    import axios from 'axios'
    import moment from 'moment'
    var currencyFormatter = require ('currency-formatter');
    
    export default {
    name: 'listaIngresoApp',
    data(){
       return{
        desde: '',
        hasta: '',
        ingresos: []
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
                axios.get(this.$url+'/obtener_ingresos_admin/'+this.desde+'/'+this.hasta,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result)=>{
                this.ingresos = result.data
                console.log(this.ingresos);
                
            })
        }
            },
             cDate(item){
                  return moment(item).format('DD/MM/YYYY')
            },
            convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
            },
            eliminar_ingreso(id){
                axios.delete(this.$url+'/eliminar_ingreso_admin/'+id,{
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
    beforeMount(){
    
    },
    components: {
        sideBar,
        topNav,
        
    }

}
</script>