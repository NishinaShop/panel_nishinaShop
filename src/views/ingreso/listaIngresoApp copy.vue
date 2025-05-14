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
                <div class="row">
    <div class="col-12 col-md-6">

        <!-- Card -->
        <div class="card">
            <div class="card-body">
                <div class="row align-items-center">
                <div class="col">

                    <!-- Title -->
                    <h6 class="text-uppercase text-muted mb-2">
                        Inversión
                    </h6>

                    <!-- Heading -->
                    <span class="h2 mb-0">
                        <b>$29/mo</b>
                    </span>

                </div>
                <div class="col-auto">

                    <!-- Icon -->
                    <a class="btn btn-sm btn-primary text-white" href="pricing.html">Upgrade</a>

                </div>
                </div> <!-- / .row -->

            </div>
        </div>

    </div>
    <div class="col-12 col-md-6">

        <!-- Card -->
        <div class="card">
        <div class="card-body">
            <div class="row align-items-center">
            <div class="col">

                <!-- Title -->
                <h6 class="text-uppercase text-muted mb-2">
                    N° ingresos <i class="fe fe-info" data-bs-toggle="tooltip" data-title="Your limits renew on May 1, 2020" data-bs-original-title="" title=""></i>
                </h6>

                <!-- Heading -->
                <span class="h2 mb-0">
                    <b>7,500 of 10,000</b>
                </span>

            </div>
            <div class="col-auto">

                <!-- Chart -->
                <div class="chart chart-sparkline">
                <canvas class="chart-canvas" id="sparklineChart" width="75" height="35" style="display: block; box-sizing: border-box; height: 35px; width: 75px;"></canvas>
                </div>

            </div>
            </div> <!-- / .row -->

        </div>
        </div>

    </div>
</div>

<div class="card">
    <div class="card-header">

        <!-- Title -->
        <h4 class="card-header-title">
            <b>Ingresos</b>
        </h4>
        <div class="col-auto">

            <input type="month" class="form-control form-control-sm">

        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-sm table-nowrap card-table">
        <thead>
            <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody class="fs-base">
            <tr>
            <td>
                <a href="invoice.html">Invoice #10395</a>
            </td>
            <td>
                <time datetime="2020-04-24">Apr. 24, 2020</time>
            </td>
            <td>
                $29.00
            </td>
            <td>
                <span class="badge bg-secondary">Outstanding</span>
            </td>
            </tr>
            <tr>
            <td>
                <a href="invoice.html">Invoice #10244</a>
            </td>
            <td>
                <time datetime="2020-03-24">Mar. 24, 2020</time>
            </td>
            <td>
                $29.00
            </td>
            <td>
                <span class="badge bg-success">Paid</span>
            </td>
            </tr>
            <tr>
            <td>
                <a href="invoice.html">Invoice #10119</a>
            </td>
            <td>
                <time datetime="2020-02-24">Feb. 24, 2020</time>
            </td>
            <td>
                $29.00
            </td>
            <td>
                <span class="badge bg-success">Paid</span>
            </td>
            </tr>
            <tr>
            <td>
                <a href="invoice.html">Invoice #10062</a>
            </td>
            <td>
                <time datetime="2020-01-24">Jan. 24, 2020</time>
            </td>
            <td>
                $29.00
            </td>
            <td>
                <span class="badge bg-success">Paid</span>
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
    import { ModelSelect } from 'vue-search-select';
    import 'vue-search-select/dist/VueSearchSelect.css'
    import axios from 'axios'
    var currencyFormatter = require ('currency-formatter');
    
    export default {
    name: 'crearIngresoApp',
    data(){
       return{
        ingreso:{
            proveedor: ''
        },
        detalle:{
            variedad: ''
        },
        detalles:[],
        comprobante: undefined,
        producto: [],
        productos:[],
        variedades:[],
        total: 0,
       }
    },
    methods:{
    uploadComprobante($event){
        var file;
        if($event.target.files.length >= 1){
            file = $event.target.files[0];
        }
        if(file.size <= 1000000){
          if(file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpeg' || file.type == 'application/pdf'){            
            this.comprobante = file;
            this.ingreso.documento = this.comprobante;        
          }else{
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Solo se admiten imagenes o archivo PDF.',
            type: 'warn'
          });
          this.ingreso.documento = undefined
          this.comprobante = undefined
        }
      } else{
          this.$notify({
            title: 'ATENCIÓN',
            text: 'El archivo no debe ser mayor a 1mb.',
            type: 'warn'
          });
          this.ingreso.documento = undefined
          this.comprobante = undefined
        }
        console.log(this.ingreso.documento)
    },
    init_productos(){
        this.productos = [];
        axios.get(this.$url+'/listar_productos_activos_admin',{
            headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
            }
        }).then((result)=>{
            for (var item of result.data){
                this.productos.push({
                    value: item._id,
                    text: item.nombre
                })
            }
        })
    },
    producto_selected(item){
        this.producto = item;
        this.init_variedades(item.value)
        this.detalle.producto = item.value;
        this.detalle.titulo_producto = item.text;
    },
    init_variedades(id){
        axios.get(this.$url+'/obtener_variedades_producto/'+id,{
            headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
            }
        }).then((result)=>{   
            this.variedades = result.data
        })
    },
    agregar_detalle(){
        if(!this.detalle.producto){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Selecciona un producto',
                type:'warn'
            })
        }else if(!this.detalle.variedad){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Selecciona la variedad',
                type:'warn'
            })
        }else if(!this.detalle.precio_unidad){
                this.$notify({
                title: 'ATENCIÓN',
                text: 'Ingrese el precio por unidad',
                type:'warn'
            })
            }else if(!this.detalle.cantidad){
                this.$notify({
                title: 'ATENCIÓN',
                text: 'Ingrese la cantidad a agredar',
                type:'warn'
            })
            }else{
            this.detalles.push(this.detalle);
            let subtotal = this.detalle.precio_unidad * this.detalle.cantidad;
            this.total = this.total + subtotal;
            this.detalle = {
                variedad: ''
            }
            this.producto = {};
            }
            console.log(this.detalles)
    },
    convertCurrency(number){
            return currencyFormatter.format(number,{code:'MXN'})
    },
    eliminar_detalle(idx, subtotal){
        this.detalles.splice(idx,1)
        this.total = this.total - subtotal 
    },
    registro_ingreso(){
        
        if(!this.ingreso.proveedor){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Seleccione el proveedor ',
                type:'warn'
            })
        }else if(!this.ingreso.ncomprobante){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Ingrese el numero del comprobante',
                type:'warn'
            })
        }else if(!this.ingreso.monto_total){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Ingrese el monto total',
                type:'warn'
            })
        }else if(!this.ingreso.documento){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Agrega una factura al ingreso',
                type:'warn'
            })
        }else {
            this.conexion_registro()
            this.ingreso.documento=''
        }
    },
    conexion_registro(){
        var fm = new FormData();
        fm.append('proveedor',this.ingreso.proveedor);
        fm.append('ganancia',this.$ganancia)
        fm.append('ncomprobante',this.ingreso.ncomprobante);
        fm.append('monto_total',this.ingreso.monto_total);
        fm.append('monto_resultante',this.total);
        fm.append('documento',this.ingreso.documento);
        fm.append('detalles',JSON.stringify(this.detalles));

        axios.post(this.$url+'/registro_ingresos_admin',fm,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': this.$store.state.token
        }
        }).then((result)=>{
            if(result.data.message){
                this.$notify({
                title: 'ERROR',
                text: result.data.message,
                type:'error'
            })
            }else{ 
            console.log(result);
            this.$notify({
                title: 'SUCCESS',
                text: 'Se registro el ingreso',
                type:'success'
            })
            
        }
        }).catch((error)=>{
            console.log(error);
        });
    },
    },
    beforeMount(){
    this.init_productos()
    },
    components: {
        sideBar,
        topNav,
        ModelSelect
    }

}
</script>