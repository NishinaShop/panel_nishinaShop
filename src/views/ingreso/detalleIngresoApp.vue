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
                        <h1 class="header-title">Detalles del ingreso</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <router-link class="nav-link" to="/ingreso">
                               Ingresos
                            </router-link>
                          </li>
                          <li class="nav-item">
                            <router-link class="nav-link" to="/ingreso/crear">Nuevo ingreso </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="card">
                        <div class="card-body">

                            <!-- List group -->
                            <div class="list-group list-group-flush my-n3">
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Proveedor:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="1988-10-24">
                                    {{ingreso.proveedor}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Comprobante:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="2018-10-28">
                                    {{ingreso.ncomprobante}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Serie:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Text -->
                                    <small class="text-muted">
                                    #{{ingreso.serie.toString().padStart(6,'0')}}
                                    </small>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card">
                            <div class="card-body">

                                <!-- List group -->
                                <div class="list-group list-group-flush my-n3">
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="mb-0">
                                        Monto total:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Time -->
                                        <time class="small text-muted" datetime="1988-10-24">
                                        {{ convertCurrency(ingreso.monto_total) }}
                                        </time>

                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="mb-0">
                                        Fecha:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Time -->
                                        <time class="small text-muted" datetime="2018-10-28">
                                        {{ cDate(ingreso.createdAt) }}
                                        </time>

                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="mb-0">
                                        Colaborador:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Text -->
                                        <small class="text-muted">
                                        {{ usuario.nombre }}
                                        </small>

                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title mb-0">
                            <b>Productos</b>
                        </h4>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                            <th>Producto:</th>
                            <th>Variedad:</th>
                            <th>Precio unidad:</th>
                            <th>Cantidad:</th>
                            </tr>
                        </thead>
                        <tbody class="fs-base">
                            <tr v-for="item in detalles">
                            <td>
                                <a v-if="item.producto">{{ item.producto.nombre }}</a>
                            </td>
                            <td>
                                <time datetime="2020-04-24">{{ item.variedad.color+'-'+item.variedad.talla }}</time>
                            </td>
                            <td>
                                {{convertCurrency(item.precio_unidad)}}
                            </td>
                            <td>
                                <span>{{ item.cantidad }}</span>
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
  import axios from 'axios';
  import moment from 'moment'
  var currencyFormatter = require ('currency-formatter');
  import sideBar from "@/components/sideBar.vue";
  import topNav from "@/components/topNav.vue";
  
  export default {
    name: 'detalleIngresoApp',
    data(){
      return{
        ingreso:{
          serie: 0,
        },
        detalles:[
          
        ],
        usuario: {
            nombre: ''
        }
      }
    },
    beforeMount(){
      this.init_data()
    },
    methods:{
      init_data(){
        axios.get(this.$url+'/obtener_detalles_ingreso_admin/'+this.$route.params.id,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
            console.log(result.data)
          this.ingreso = result.data.Ingreso
          this.detalles = result.data.detalles
          this.usuario = result.data.colaborador
        })
      },
      convertCurrency(number){
                return currencyFormatter.format(number,{code:'MXN'})
        },
            cDate(item){
                return moment(item).format('DD/MM/YYYY')
        },
    },
    components: {
      sideBar,
      topNav
    }
}
</script>