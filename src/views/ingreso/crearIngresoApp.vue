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
                        <h1 class="header-title">Nuevo Ingreso</h1>
                      </div>
                    </div>
                    <!-- / .row -->
                    <div class="row align-items-center">
                      <div class="col">
                        <!-- Nav -->
                        <ul class="nav nav-tabs nav-overflow header-tabs">
                          <li class="nav-item">
                            <a class="nav-link ">
                              Ingresos
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link active" >Nuevo ingreso </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
<div class="col-12 col-md-6">

<!-- Last name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
        Proveedor
    </label>
    <small class="form-text text-muted">
        Proveedor encargado del ingreso.
    </small>
    <!-- Input -->
    <select class="form-select mb-3" v-model="ingreso.proveedor">
        <option value="" selected disable>Seleccionar</option>
        <option>Red marin</option>
        <option>Otro</option>
    </select>

</div>

</div>

<div class="col-12 col-md-6">

<!-- Last name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
        N° comprobante
    </label>
    <small class="form-text text-muted">
        Número de la factura.
    </small>
    <!-- Input -->
        <input type="text" class="form-control" placeholder="5DSF-000154" v-model="ingreso.ncomprobante">

</div>

</div>

<div class="col-12 col-md-6">

<!-- Last name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
        Monto total
    </label>
    <small class="form-text text-muted">
        Monto total pagado al proveedor.
    </small>
    <!-- Input -->
        <input type="text" class="form-control" placeholder="546"v-model="ingreso.monto_total">

</div>

</div>

<div class="col-12 col-md-6">

<!-- Last name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
        Comprobante
    </label>
    <small class="form-text text-muted">
        Selecciona el comprobante del ingreso.(requerido)
    </small>
    <!-- Input -->
        <input type="file" class="form-control" v-on:change="uploadComprobante($event)" >

</div>

</div>
</div>

<hr class="my-5">

<div class="row">

<div class="col-md-12 mb-4">
    <h3><b>Productos del ingreso</b></h3>
</div>

<div class="col-12 col-md-6">

<!-- First name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Producto
    </label>
    <small class="form-text text-muted">
        Selecciona el producto
    </small>
    <!-- Input -->
    <model-select  :options="productos" 
    v-model="producto"
    :selected-option="producto"
    placeholder="Selecciona el producto"
    @update:modelValue="producto_selected" 
    ></model-select >

</div>

</div>

<div class="col-12 col-md-6">

<!-- First name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Variedad
    </label>
    <small class="form-text text-muted">
        Selecciona la variedad
    </small>
    <!-- Input -->
    <select class="form-select mb-3" v-model="detalle.variedad">
        <option value="" selected disable>Seleccionar</option>
        <option :value="item._id" v-for="item in variedades">{{ item.color.toUpperCase()}} - {{item.talla.toUpperCase()}} - {{ item.stock }}</option>
    </select >

</div>

</div>


<div class="col-12 col-md-6">

<!-- Phone -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Precio unidad
    </label>
    <small class="form-text text-muted">
        Ingresa el precio por unidad
    </small>
    <!-- Input -->
    <input type="text" class="form-control mb-3" placeholder="0.00" v-model="detalle.precio_unidad">

</div>

</div>
<div class="col-12 col-md-6">

<!-- Birthday -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Cantidad total
    </label>
    <small class="form-text text-muted">
        Ingresa cantidad de unidades que ingresan al stock
    </small>
    <!-- Input -->
    <input type="number" class="form-control mb-3" placeholder="0" v-model="detalle.cantidad" >

</div>

</div>

<div class="col-md-6 ">
    
    <button class="btn btn-primary" style="margin-bottom: 1.8rem!important;" v-on:click="agregar_detalle()">
        Agregar
    </button>
</div>
</div> <!-- / .row -->

<!-- Button -->
<div class="card ">
<div class="table-responsive mb-0">
    <table class="table table-sm table-nowrap card-table">
        <thead>
            <tr>
            <th>Producto:</th>
            <th>Precio unidad:</th>
            <th>Cantidad:</th>
            <th>Subtotal:</th>
            <th></th>
            </tr>
        </thead>
        <tbody class="fs-base" v-if="detalles.length >= 1">
            <tr v-for="(item,index) in detalles">
            <td>
                <a>{{ item.titulo_producto}}</a>
            </td>
            <td>
        <time datetime="2020-04-24">{{ convertCurrency(item.precio_unidad) }}</time>
            </td>
            <td>
                {{ item.cantidad }}
            </td>
            <td> {{ convertCurrency(item.precio_unidad * item.cantidad ) }}</td>
            <td>
                <button class="btn btn-danger btn-sm" v-on:click="eliminar_detalle(index,item.precio_unidad * item.cantidad )">Quitar</button>
            </td>
            </tr>
            
        </tbody>
        <tbody class="fs-base" v-if="detalles.length == 0">
            <tr>
                <td class="text-center" colspan="5"><span class="text-muted">No se han agregado detalles en el ingreso</span></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">Total:</td>
                <td>{{ convertCurrency(total) }}</td>
            </tr>
        </tfoot>
    </table>
</div>
</div>

<button class="btn btn-primary mb-7" v-on:click="registro_ingreso()">
Ingresar datos
</button>
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