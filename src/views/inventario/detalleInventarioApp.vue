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
                        <h1 class="header-title">Detalles del producto</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <router-link class="nav-link" to="/inventario">
                               Todas las existencias
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-12 col-md-12">
                        <div class="card">
                        <div class="card-body">
                          <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Nombre:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="1988-10-24">
                                    {{producto.nombre}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
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
                                    Clave:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="1988-10-24">
                                    {{producto.clave}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Genero:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Time -->
                                    <time class="small text-muted" datetime="2018-10-28">
                                    {{producto.genero}}
                                    </time>

                                </div>
                                </div> <!-- / .row -->
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Categoria:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Text -->
                                    <small class="text-muted">
                                    {{producto.categoria}}
                                    </small>

                                </div>
                                </div> <!-- / .row -->
                                
                            </div>
                            <div class="list-group-item">
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Title -->
                                    <h5 class="mb-0">
                                    Estado:
                                    </h5>

                                </div>
                                <div class="col-auto">

                                    <!-- Text -->
                                    <div class="badge bg-success" v-if="producto.estado">
                                    Activo
                                    </div>
                                    <div class="badge bg-warning" v-if="!producto.estado">
                                    Inactivo
                                    </div>

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
                                        Descuento:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Time -->
                                       <div class="badge bg-dark" v-if="!producto.descuento">
                                        Sin descuento
                                       </div>
                                       <div class="badge bg-primary" v-if="producto.descuento">
                                        En descuento
                                       </div>
                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="mb-0">
                                        Precio:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Time -->
                                        <time class="small text-muted" datetime="2018-10-28">
                                        {{  convertCurrency(producto.precio)}}
                                        </time>

                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                <div class="list-group-item">
                                    <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="mb-0">
                                        Stock:
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Text -->
                                        <small class="text-muted">
                                        {{ producto.stock }}
                                        </small>

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

                                        <!-- Text -->
                                        <small class="text-muted">
                                        {{ cDate(producto.createdAt)}}
                                        </small>

                                    </div>
                                    </div> <!-- / .row -->
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="card"  v-for="item in variedades">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title mb-0">
                            <b>Color: {{ item.colores.color }}</b>
                        </h4>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                            <th>Talla:</th>
                            <th>SKU:</th>
                            <th>Stock:</th>
                            </tr>
                        </thead>
                        <tbody class="fs-base">
                            <tr v-for="sub in item.tallas">
                            <td>
                                <a>{{ sub.talla }}</a>
                            </td>
                            <td>
                                <time datetime="2020-04-24">{{ sub.sku}}</time>
                            </td>
                            <td>
                                {{sub.stock}}
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
    name: 'detalleInventarioApp',
    data(){
      return{
        ingreso:{
          serie: 0,
        },
        detalles:[
          
        ],
        usuario: {
            nombre: ''
        },
        producto: {},
        variedades:{}
      }
    },
    beforeMount(){
      this.init_data()
    },
    methods:{
      init_data(){
        axios.get(this.$url+'/detalle_inventario/'+this.$route.params.id,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
          
          this.producto = result.data.product
          this.variedades = result.data.variedades
          
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