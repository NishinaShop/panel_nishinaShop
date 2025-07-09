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
                    <h1 class="header-title">Nuevo ingreso</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                       <li class="nav-item">
                        <router-link to="/extraordinario" class="nav-link">Todos los registros</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                           Nuevo ingreso
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/extraordinario/salida" class="nav-link">Nueva salida</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-6">

<div class="col-md-12 mb-4">
    <h3><b>Ingreso extraordinario de producto</b></h3>
</div>
<small class="text-end text-muted mb-4">Nota: Selecciona el producto, color y talla que requiera el <br>  ingreso al igual que la razon del movimiento </small>
<div class="col-12 col-md-12">

<!-- First name -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Producto
    </label>
    <small class="form-text text-muted">
        Selecciona el producto:
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

 <!-- Selección de Color -->
    <div class="col-12 col-md-6">
      <div class="form-group">
        <label class="form-label">Color</label>
        <small class="form-text text-muted">Selecciona el color:</small>
        <select 
          class="form-select mb-3"
          v-model="colorSeleccionado"
          @change="filtrarTallas">
          <option value="" disabled selected>Seleccionar</option>
          <option 
            v-for="item in variedades" 
            :key="item._id" 
            :value="item">
            {{ item.colores.color.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>

    <!-- Selección de Talla -->
    <div class="col-12 col-md-6" >
      <div class="form-group">
        <label class="form-label">Talla</label>
        <small class="form-text text-muted">Selecciona la talla:</small>
        <select 
          class="form-select mb-3"
          v-model="ingreso.talla"
          @change="informacion_producto($event)">
          <option value="" disabled selected>Seleccionar</option>
          <option 
            v-for="t in tallasFiltradas" 
            :key="t._id"
            :value="t._id"
            :data-texto="`${t.talla}`">
            {{ t.talla.toUpperCase() }} - Stock: {{ t.stock }}
          </option>
        </select>
      </div>
    </div>


<div class="col-12 col-md-6">

<!-- Phone -->
<div class="form-group">

    <!-- Label -->
    <label class="form-label">
    Precio 
    </label>
    <small class="form-text text-muted">
        Ingresa el nuevo precio
    </small>
    <!-- Input -->
    <input type="number" class="form-control mb-3" placeholder="0.00" v-model="ingreso.precio">

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
        Ingresa la cantidad que se ingresara al stock
    </small>
    <!-- Input -->
    <input type="number" class="form-control mb-3" placeholder="0" v-model="ingreso.cantidad" >

</div>

</div>
<div class="col-12 col-md-6">
      <div class="form-group">
        <label class="form-label">Movimiento</label>
        <small class="form-text text-muted">Selecciona la razon del movimiento:</small>
        <input type="text" v-model="ingreso.movimiento" class="form-control mb-3" placeholder="Razon del ingreso">
          
      </div>
    </div>
<div class="col-md-6 text-center">
    
    <button class="btn btn-primary " style="margin-top: 3.7rem!important;" v-on:click="guardar_registro()" >
        guardar
    </button>
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
    name: 'indexExtraApp',
    data(){
      return{
        ingreso:{
        movimiento : '',
        registro: 'ingreso',
        producto: '',
        color: '',
        talla: '',
        },
        
        detalle:{
            talla: '',
            producto: '',
            inf_talla: '',
            inf_color: ''
        },
        detalles:[],
        
        producto: [],
        productos:[],
        variedades:[],
        descripcion_var: {},
        total: 0,
        colorSeleccionado: null,    
        tallasFiltradas: [],
        
      }
      
    },
    methods:{
        filtrarTallas() {
    if (this.colorSeleccionado && this.colorSeleccionado.tallas) {
      this.tallasFiltradas = this.colorSeleccionado.tallas;
      this.ingreso.color = this.colorSeleccionado.colores._id
      this.detalle.inf_color = this.colorSeleccionado.colores.color
      
    } else {
      this.tallasFiltradas = [];
    }
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
                    text: item.nombre,
                    precio: item.precio
                })
            }
        })
    },
    producto_selected(item){
        this.producto = item;
        this.init_variedades(item.value)
        this.ingreso.producto = item.value;
        this.detalle.titulo_producto = item.text;
        this.detalle.talla = ''
        this.tallasFiltradas= []
        this.colorSeleccionado = []
    },
    informacion_producto(event){
      const selectedOption = event.target.options[event.target.selectedIndex];
      
      this.detalle.inf_talla = selectedOption.dataset.texto;
    },
    init_variedades(id){
        axios.get(this.$url+'/obtener_colores/'+id,{
            headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
            }
        }).then((result)=>{   
            this.variedades = result.data
            console.log(this.variedades);
            
        })
    },
    guardar_registro(){
      if(!this.ingreso.producto){
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Selecciona el producto',
            type: 'warn'
          })
      }else if(!this.ingreso.color){
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Selecciona el color',
            type: 'warn'
          })
      }else if(!this.ingreso.talla){
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Selecciona la talla',
            type: 'warn'
          })
      }else if(!this.ingreso.precio && !this.ingreso.cantidad){
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Ingresa el nuevo precio o la cantidad a agregar ',
            type: 'warn'
          })
      }else if(!this.ingreso.movimiento){
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Ingresa el motivo del movimiento',
            type: 'warn'
          })
      }else {
        axios.post(this.$url+'/entrada_extraordinaria/'+this.ingreso.producto,this.ingreso,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
          if(result.data.message){
            this.$notify({
            title: 'ATENCIÓN',
            text: result.data.message,
            type: 'warn'
          })
          }else{
            this.$notify({
            title: 'EXITO',
            text: 'Se guardo el registro',
            type: 'success'
          })
          
            }
          
        })
      }
    }
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