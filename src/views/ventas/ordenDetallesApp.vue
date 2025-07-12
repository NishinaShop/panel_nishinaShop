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
                    <h1 class="header-title">Detalles de la orden de compra</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/ventas" class="nav-link">
                          Todas las ordenes
                        </router-link>
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
            N. de orden:
            </h5>

        </div>
        <div class="col-auto">

            <!-- Time -->
            <time class="small text-muted" datetime="1988-10-24">
                #{{venta.serie.toString().padStart(6,'0')}}
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
            {{convertDate(venta.createdAt)}}
            </time>

        </div>
        </div> <!-- / .row -->
    </div>
    <div class="list-group-item">
        <div class="row align-items-center">
        <div class="col">

            <!-- Title -->
            <h5 class="mb-0">
            Total de compra:
            </h5>

        </div>
        <div class="col-auto">

            <!-- Text -->
            <small class="text-muted">
            {{convertCurrency(venta.total)}}
            </small>

        </div>
        </div> <!-- / .row -->
    </div>
    <div class="list-group-item">
        <div class="row align-items-center">
        <div class="col">

            <!-- Title -->
            <h5 class="mb-0">
            Envio:
            </h5>

        </div>
        <div class="col-auto">

            <!-- Text -->
            <small class="text-muted">
            {{convertCurrency(venta.envio)}}
            </small>

        </div>
        </div> <!-- / .row -->
    </div>
    <div class="list-group-item">
        <div class="row align-items-center">
        <div class="col">

            <!-- Title -->
            <h5 class="mb-0">
            Estado del pago:
            </h5>
        </div>
        <div class="col-auto">

            <!-- Link -->
            <span v-if="venta.estado == 'Pendiente'" class="item-score badge bg-warning-soft"><b>Pendiente</b></span>
            <span v-if="venta.estado == 'Pagado'"class="item-score badge bg-success-soft"><b>Pagado</b></span>
            <span v-if="venta.estado == 'Cancelado'"class="item-score badge bg-danger-soft"><b>Cancelado</b></span>
        </div>
       
        </div> <!-- / .row -->
    </div>
    <div class="list-group-item" v-if="venta.pago_validado">
        <div class="row align-items-center">
        <div class="col">

            <!-- Title -->
            <small>Usuario valido pago:</small>
        </div>
        <div class="col-auto">
            <div> <small>{{venta.pago_validado.nombre}}</small></div>
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
                Estado de la orden:
                </h5>

            </div>
            <div class="col-auto">

                <!-- Time -->
                <span class="item-score badge bg-primary-soft">
                {{venta.estado_orden}}
                </span>

            </div>
            </div> <!-- / .row -->
        </div>
        <div class="list-group-item">
            <div class="row align-items-center">
            <div class="col">

                <!-- Title -->
                <h5 class="mb-0">
                Transanccion:
                </h5>

            </div>
            <div class="col-auto">

                <!-- Time -->
                <time class="small text-muted" datetime="2018-10-28">
                <b>{{venta.transaccion}}</b>
                </time>

            </div>
            </div> <!-- / .row -->
        </div>
        <div class="list-group-item">
            <div class="row align-items-center">
            <div class="col">

                <!-- Title -->
                <h5 class="mb-0">
                Cliente:
                </h5>

            </div>
            <div class="col-auto">

                <!-- Text -->
                <small class="text-muted">
                {{venta.cliente.nombre}}
                </small>

            </div>
            </div> <!-- / .row -->
        </div>
         <div class="list-group-item" v-if="venta.orden_actualizada">
            <div class="row align-items-center">
            <div class="col">

                <!-- Title -->
                <h5 class="mb-0">
                Actualizada por:
                </h5>

            </div>
            <div class="col-auto">

                <!-- Text -->
                <small class="text-muted">
                {{venta.orden_actualizada.nombre}}
                </small>

            </div>
            </div> <!-- / .row -->
        </div>
        </div>

    </div>
    </div>
<div class="d-flex flex-row-reverse mb-4">
    <button class="col-6 btn btn-outline-primary" v-if="venta.estado == 'Pendiente'" v-on:click="validar_pago()">Validar pago</button>
    <button class="col-6 btn btn-outline-primary" v-on:click="actualizar_orden()" v-if="venta.estado_orden != 'Entregado'"><small>actualizar orden</small></button>
</div>    
</div>
    
    </div>
    
        <div class="card">
            <div class="card-header">

                <!-- Title -->
                <h4 class="card-header-title mb-0">
                    <b>Datos de envio</b>
                </h4>

            </div>
            <div class="ms-4 mt-4 mb-4">
                <span><b>Nombre:</b></span> &nbsp;
                <span>{{ venta.direccion.nombre }}</span>
                <div class="mt-2">
                    <span ><b>Direccion:</b></span> &nbsp;
                    <span>{{ venta.direccion.calle }}, {{ venta.direccion.colonia }}, CP {{ venta.direccion.codigo_postal }}, 
                        {{ venta.direccion.ciudad }}, {{ venta.direccion.estado }}, 
                    </span>
                    <div class="mt-2">
                        <span><b>Email:</b></span>&nbsp;
                        <span>{{ venta.direccion.email }}</span>&nbsp;
                        <span><b>Numero de contacto:</b></span>&nbsp;
                        <span>{{ venta.direccion.n_contacto }}</span>
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
                <th>Cantidad:</th>
                <th>Precio unidad:</th>
                <th>Total:</th>
                </tr>
            </thead>
            <tbody class="fs-base">
                <tr v-for="item in detalles">
            <td class="products-product">
                <div class="d-flex align-items-center">

                    <!-- Image -->
                    <div class="avatar">
                    <img class="avatar-img rounded me-3" :src="item.producto.portada" alt="...">
                    </div>

                    <div class="ms-3">

                    <!-- Heading -->
                    <h4 class="fw-normal mb-1">{{ item.producto.nombre }}</h4>

                    <!-- Text -->
                    <small class="text-muted">{{ item.color.color }} - {{ item.talla.talla }}</small>

                    </div>

                </div>
                </td>
                <td>
                    <time datetime="2020-04-24">
                        {{ item.cantidad }}
                    </time>
                </td>
                <td>
                    {{ convertCurrency(item.precio_unidad) }}
                </td>
                <td>
                    <span class="badge bg-dark">{{ convertCurrency(item.cantidad * item.precio_unidad) }}</span>
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
    import axios from 'axios'
    import moment from "moment";
    var currencyFormatter = require ('currency-formatter');


  export default {
    name: 'ordenDetallesApp',
    data(){
        return{
            estado: '',
            venta:{
                serie: 0,
                direccion:{
                    nombre: ''
                },
                cliente: {
                    nombre: ''
                }
            },
            detalles: [
                
            ]
        }
    },
    beforeMount(){
        this.init_data()
    },
    methods:{
        init_data(){
            axios.get(this.$url+'/obtener_detalles_orden_venta_admin/'+this.$route.params.id,{
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result)=>{
                this.venta = result.data.venta
                this.detalles = result.data.detalle
                console.log(result.data);
                
            })

        },
        convertDate(date){
            return moment(date).format('DD/MM/YYYY')
        },
        convertCurrency(number){
            return currencyFormatter.format(number,{code:'MXN'})
        },
        validar_pago(){
            axios.put(this.$url+'/validar_pago/'+this.$route.params.id,{},{
                headers :{
                    'Content-type': 'application/json',
                    'Authorization': this.$store.state.token
                }
            }).then((result)=>{
                console.log(result)
                this.$notify({
                    title: 'EXITO',
                    text: 'Validaste el pago del cliente',
                    type: 'success'
                })
                this.init_data()
            }).catch(error => {
            console.log(error.response?.data?.description || error.message);;
            });
        },
        actualizar_orden(){
        if(this.venta.estado_orden === 'Generada'){
            this.estado = 'Recibida'
        }if(this.venta.estado_orden === 'Recibida'){
            this.estado = 'En preparación'
        }if(this.venta.estado_orden ==='En preparación'){
            this.estado = 'Enviada'
        }if(this.venta.estado_orden === 'Enviada'){
            this.estado = 'Entregado'
        }
        console.log(this.estado);
        
        axios.put(this.$url+'/cambio_estado_orden/'+this.$route.params.id,{
            estado: this.estado
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token
            }
        }).then((result)=>{
            this.$notify({
                    title: 'EXITO',
                    text: 'Se actualizo el estado de la orden',
                    type: 'success'
                })
                this.init_data()
        }).catch(error => {
            console.log(error.response?.data?.description || error.message);;
        });
        }
    },
    components: {
      sideBar,
      topNav
    }
}
</script>