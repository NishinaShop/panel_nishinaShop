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
                        <h1 class="header-title">Listado de ordenes de compra</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <a class="nav-link active">
                              Todas las ordenes
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                
                </div>
                <div class="row">
                    <div class="col-12">
                <!-- Files --> <small class="d-flex justify-content-end">Nota: se visualizan las ultimas 20 ordenes de compra</small>
                    <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                    <div class="card-header">
                <!-- Title -->
                    <h4 class="card-header-title">
                    Ordenes
                    </h4>
                    <button class="btn btn-danger" v-if="filtro" v-on:click="borrar_filtro()">X</button>
        </div>
        <div class="card-header">
            <div class="row mb-5 mt-5">
                    <div class="col-9 d-flex">
                        <input type="date" class="form-control" v-model="desde" style="margin-right: 1rem"/>
                        <input type="date" class="form-control" v-model="hasta"/>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" style="width:100%" v-on:click="filtro_ventas()">Buscar</button>
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
                    <ul id="my-table" class="list-group list-group-lg list-group-flush list my-n4" v-if="ordenes.length >= 1">
                <li class="list-group-item" v-for="item in itemsForList">
                    <div class="row align-items-center">
                    <div class="col-auto">

                        <!-- Avatar -->
                        <a class="avatar avatar-lg">
                        <img src="https://res.cloudinary.com/dqitdaxd8/image/upload/5334066_dxuran.png" alt="..." class="avatar-img rounded" >
                        </a>

                    </div>
                    <div class="col ms-n2">

                        <!-- Title -->
                        <h4 class="mb-1 name">
                        <a href="#!">Orden #{{ item.serie.toString().padStart(6,'0') }}</a> &nbsp;
                        <span class="item-score badge bg-primary-soft">{{ item.estado_orden }}</span>
                        </h4>

                        <!-- Text -->
                        <p class="card-text small text-muted mb-1">ID pago: 
                        {{ item.transaccion }} &nbsp;
                        <span v-if="item.estado == 'Pendiente'" class="item-score badge bg-warning-soft">Pendiente</span>
                        <span v-if="item.estado == 'Pagado'"class="item-score badge bg-success-soft">Pagado</span>
                        <span v-if="item.estado == 'Cancelado'"class="item-score badge bg-danger-soft">Cancelado</span>
                        </p>

                        <!-- Time -->
                        <p class="card-text small text-muted">
                        Creación <time datetime="2018-01-03">{{ convertDate(item.createdAt) }}</time>
                        </p>
                        
                    </div>
                    <div class="col-auto">
                        <spam><b>{{ convertCurrency(item.total) }}</b></spam>

                    </div>
                    <div class="col-auto">
                        <button type="button"class="btn btn-primary btn-sm"> <router-link :to="{name: 'detalles-venta', params:{id: item._id}}">
                                    <b class="text-white">detalles</b>
                                </router-link></button>
                                
                        <!-- Dropdown -->
                        <!--
                        <div class="dropdown">
                        <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                        </a>
                            <div class="dropdown-menu dropdown-menu-end">
                            <router-link  class="dropdown-item" :to="{name: 'edit-producto',params:{id:item._id}}">Modificar</router-link>
                            <router-link  class="dropdown-item" :to="{name: 'galeria-producto',params:{id:item._id}}">Galeria</router-link>
                            </div>
                        </div>
                        -->

                    </div>
                    </div> <!-- / .row -->
                </li>
            </ul>
            <div class="row justify-content-center" v-if="ordenes.length == 0">
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
            Al parecer no hay ninguna orden que mostrar, intenta nuevamente.
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
                :total-rows="ordenes.length"
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
                filtro: false,
                desde: '',
                hasta: '',
                ordenes: [],
                filtro: '',
                load_data: false,
                currentPage: 1,
                perPage: 15,
                get itemsForList(){
                    return this.ordenes.slice(
                        (this.currentPage-1) * this.perPage, this.currentPage * this.perPage
                    )
                }
            }
        },
        methods:{
            init_data(){
                this.load_data = true
                
                    axios.get(this.$url+'/listar_ventas_admin',{
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.$store.state.token,
                    }
                }).then((result)=>{
                    this.ordenes = result.data
                    this.load_data = false;
                    console.log(result);
                }).catch((error) => {
    this.load_data = false;
    console.error("Error al obtener ventas:", error.response?.data || error.message);
});
            },
            convertDate(date){
                return moment(date).format('DD/MM/YYYY')
            },
            convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
            },
            filtro_ventas(){
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
                this.filtro  = true
                axios.get(this.$url+'/obtener_ordenes_venta_admin/'+this.desde+'/'+this.hasta,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result)=>{
                this.ordenes = result.data                
            })
        }
        },
        borrar_filtro(){
            this.filtro = false
            this.init_data()
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