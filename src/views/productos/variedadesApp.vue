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
                    <h1 class="header-title">Variedades</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <button class="btn  btn-sm">
            <router-link to="/producto"><i class="fe fe-arrow-left"></i> Regresar</router-link>
                        </button>
                      </li>
                      
                    </ul>
                    <hr class="mt-4 mb-5" />
                    <div class="row justify-content-between align-items-center mb-5">
    <div class="col-12">

        <!-- Heading -->
        <h2 class="mb-2">
            Agrega las variedades al producto
        </h2>

        <!-- Text -->
        <p class="text-muted mb-xl-0">
        Agrega el color y la talla para que posteriormente se le agrege el stock
        </p>
    </div>
    
</div>

<div class="row mb-5">
    <div class="col-lg-5">
        <small class="text-muted">
            Color
        </small>
        <input type="text" class="form-control" placeholder="Agrega el color." v-model="color">
    </div>
     <div class="col-lg-5">
        
        <small class="text-muted">Selecciona un color:</small>
    <div style="display: flex; align-items: center; height: 40px;">
        <input type="color" class="col-lg-2" v-model="codigo_color"/><small>&nbsp Color seleccionado: {{ codigo_color }}</small>
    </div>
</div>
    <!--
    <div class="col-lg-5">
        <small class="text-muted">
            Talla
        </small>
        <input type="text" class="form-control" placeholder="Agrega la talla." v-model="variedad.talla">
    </div>-->
    <div class="col">
        <br>
        <button class="btn btn-primary btn-block" v-on:click="validar_color()">Agregar</button>
    </div>
   
</div>
<small class="text-muted">
            Nota: Si hay unidades en el stock no se pueden eliminar la variedad
        </small>
        <div class="card">
    <div class="card-body">
        <ul class="list-group list-group-flush list my-n3">
            <li class="list-group-item" v-for="item in variedades">
                <div class="row align-items-center">
                    <div class="col-auto">

                        <!-- Avatar -->
                        <a class="avatar">
                                    <div class="avatar-img rounded-circle" :style="{backgroundColor: item.colores.codigo_color}"></div>
                                </a>

                    </div>
                    <div class="col ms-n2">

                        <!-- Title -->
                        <h4 class="mb-1 name">
                            <a>{{ item.colores.color }}</a>
                        </h4>

                        <!-- Time -->
                        <p class="small mb-0">
                            Codigo de color: {{ item.colores.codigo_color }}
                        </p>

                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-dark text-white" v-if="!add_talla" v-on:click="add_talla = true" >Agregar talla</button>
                        <button class="btn btn-danger btn-sm" v-if="add_talla" v-on:click="add_talla = false">Ocultar</button>
                        <button  class="btn btn-sm btn-danger text-white ms-2" v-on:click="eliminar_color(item.colores._id)">
                            Eliminar
                        </button>
                    </div>
                </div>
                <div class="input-group" v-if="add_talla">
                        <input type="text" class="form-control" placeholder="Escribe la talla" v-model="talla" >
                        <button class="btn btn-dark" v-on:click="validar_talla(item.colores._id,item.colores.color)">Agregar</button>
                    </div>
                <!-- / .row -->
                <div class="row mb-3">
                    <div class="col-12">
                        <ul class="list-group mt-4">
                            <li class="list-group-item d-flex justify-content-between align-items-center"  style="font-size: .8rem;padding: 0.5rem 1.5rem;" v-for="subitem in item.tallas">
                                Talla: {{ subitem.talla }} <div>  SKU: {{ subitem.sku }}</div> Stock: {{ subitem.stock }}
                                <button class="btn btn-sm btn-danger text-white" v-on:click="eliminar_talla(subitem._id)">
                                    Eliminar
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
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
import axios from 'axios'

export default {
    name: 'variedadesApp',
    data(){
    return{
        variedades: [],
        variedad: {},
        total: 0,
        clave:'',
        color: '',
        codigo_color: '#ffffff',
        nuevo_color: {},
        colores: [],
        add_talla: false,
        talla:'',
        nueva_talla: {},
        tallas: [],
    }
  },
  methods:{
eliminar_color(id){
axios.delete(this.$url+'/eliminar_color/'+id,{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': this.$store.state.token
        }
    }).then((result)=>{
    if(result.data.message){
       this.$notify({
        title: "ATENCION",
        text: result.data.message,
        type: "error"
    }) 
    }else{
        this.$notify({
        title: "ATENCION",
        text: "Se elimino el color",
        type: "error"
    })
    this.init_colores()
    }
    })
},
eliminar_talla(id){
axios.delete(this.$url+'/eliminar_talla/'+id,{
    headers:{
        'Content-Type': 'application/json',
        'Authorization': this.$store.state.token
        }
    }).then((result)=>{
        console.log(result);
    this.$notify({
        title: "ATENCION",
        text: "Se elimino la talla",
        type: "error"
    })
    this.init_colores()
    })
},
validar_talla(id,color){
    if(!this.talla){
    this.$notify({
        title: "ATENCION",
        text: "Escribe la talla",
        type: "warn"
    })
    }else{
    this.nueva_talla.talla = this.talla
    this.nueva_talla.sku = this.generar_sku(color)
    this.nueva_talla.color = id
    console.log(this.nueva_talla);
    this.registrar_talla()
    }
    },
    registrar_talla(){
        axios.post(this.$url+'/agregar_talla',this.nueva_talla,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token
            }
        }).then((result)=>{
            this.nueva_talla = {}
            this.talla = ''
            this.$notify({
            title: 'SUCCESS',
            text: 'Se agrego la talla',
            type:  'success'
        })
        this.init_colores()
        })
    },
validar_color(){
      if(!this.color){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Agregar el color',
                type: 'warn'
            });
        } else {
            this.nuevo_color.producto = this.$route.params.id;
            this.nuevo_color.color = this.color
            this.nuevo_color.codigo_color = this.codigo_color
            this.registrar_color()
        }
},
registrar_color(){
      axios.post(this.$url+'/agregar_color',this.nuevo_color,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        this.nuevo_color = {};
        this.color = ''
        this.codigo_color = '#ffffff'
        this.$notify({
            title: 'SUCCESS',
            text: 'Se agrego el color al producto',
            type:  'success'
        })
        this.init_colores()
      }) 
      
},
init_colores(){
axios.get(this.$url+'/obtener_colores/'+this.$route.params.id,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
            }
        }).then((result)=>{
            this.variedades = result.data;
            console.log(this.variedades);
            
        })
},
validar_variedad(){
        if(!this.variedad.color){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Agregar el color',
                type: 'warn'
            });
        } else if(!this.variedad.talla){
            this.$notify({
                title: 'ATENCIÓN',
                text: 'Agregar la talla',
                type: 'warn'
            });
        } else {
            this.variedad.producto = this.$route.params.id;
            this.variedad.sku = this.generar_sku()
            this.registar_variedad()
        }
    },
    registar_variedad(){
      axios.post(this.$url+'/registro_variedad_producto',this.variedad,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        this.variedad = {};
        this.$notify({
            title: 'SUCCESS',
            text: 'Se agrego la variedad al producto',
            type:  'success'
        })
        this.init_variedades()
      }) 
      
    },
    generar_sku(color){
        let sku = (this.clave+'-'+color.substring(0,3)+'-'+this.talla.substring(0,2)).toUpperCase();
        return sku
    },
    init_variedades(){
        axios.get(this.$url+'/obtener_variedades_producto/'+this.$route.params.id,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
            }
        }).then((result)=>{
            this.variedades = result.data;
        })
    },
    eliminar_variedad(id){
      axios.delete(this.$url+'/eliminar_variedades_producto/'+id,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
      }).then((result)=>{
        if(result.data.message){
          this.$notify({
          title: 'ERROR',
          text: result.data.message,
          type: 'error'
        })
        }else{
          this.$notify({
          title: 'SUCCESS',
          text: 'Se elimino la variedad',
          type: 'success'
        })
        this.init_variedades()
        } 
      });
    },
    init_data(){
        axios.get(this.$url+'/obtener_producto_admin/'+this.$route.params.id,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token
            }
        }).then((result)=>{
            var producto = result.data
            this.clave = producto.clave
            
        })
    },
  },
  beforeMount(){
    this.init_data();
    this.init_colores()
  },
    components: {
      sideBar,
      topNav
    }
}
</script>