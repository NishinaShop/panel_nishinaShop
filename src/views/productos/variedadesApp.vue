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
        <input type="text" class="form-control" placeholder="Agrega el color." v-model="variedad.color">
    </div>
    <div class="col-lg-5">
        <small class="text-muted">
            Talla
        </small>
        <input type="text" class="form-control" placeholder="Agrega la talla." v-model="variedad.talla">
    </div>
    <div class="col">
            <br>
        <button class="btn btn-primary btn-block" style="width: 100% !important;" v-on:click="validar_variedad()">Agregar</button>
    </div>
</div>
<small class="text-muted">
            Nota: Si hay unidades en el stock no se pueden eliminar la variedad
        </small>
<div class="card">
    <div class="card-body">

        <!-- List group -->
        <div class="list-group list-group-flush my-n3" >        
        <div class="list-group-item" v-for="item in variedades">
            <div class="row align-items-center">
            <div class="col">

                <!-- Heading -->
                <h4 class="mb-1"> {{item.color}}-{{item.talla}}</h4>

                <!-- Text -->
                <small class="text-muted">
                  {{item.sku.toUpperCase()}}
                </small>

            </div>
            <div class="col-auto">
              Stock:
            </div>
            <div class="col">
              {{ item.stock }}
            </div>
            <div class="col-auto">

                <!-- Button -->
                <button v-if="item.stock == 0" class="btn btn-sm btn-danger"  type="button" @click="eliminar_variedad(item._id)">
                Eliminar
                </button>
                <button v-if="item.stock >= 1" disabled class="btn btn-sm btn-danger"  type="button" >
                Eliminar
                </button>

            </div>
            </div> <!-- / .row -->
        </div>        
        </div>

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
        clave:''
    }
  },
  methods:{
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
    generar_sku(){
        let sku = (this.clave+'-'+this.variedad.color.substring(0,3)+'-'+this.variedad.talla.substring(0,2)).toUpperCase();
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
    this.init_variedades()
  },
    components: {
      sideBar,
      topNav
    }
}
</script>