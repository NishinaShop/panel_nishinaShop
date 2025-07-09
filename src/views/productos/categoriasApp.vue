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
                    <h1 class="header-title">Categorias</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                        
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <button class="btn btn-dark btn-sm" v-if="!add_category"v-on:click="add_category = true">Agregar categoria</button>
                    <button class="btn btn-danger btn-sm" v-if="add_category" v-on:click="add_category = false">Ocultar</button>
                </div>
                <div class="col-12 mt-3" v-if="add_category">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Escribe la categoria" v-model="nueva_categoria">
                        <button class="btn btn-dark" v-on:click="crear_categoria()">Agregar</button>
                    </div>
                </div>
            </div>
            <div class="text-end">
              <small >Nota:Las categorias no se pueden eliminar, verificar antes de agregar</small>
            </div>
            
        <div class="card" v-if="!load_data">
    <div class="card-body">
        <ul class="list-group list-group-flush list my-n3">
            <li class="list-group-item" v-for="item in categorias">
                <div class="row align-items-center">
                    <div class="col-auto">

                        <!-- Avatar -->
                        <a href="profile-posts.html" class="avatar">
                                    <img src="https://res.cloudinary.com/dqitdaxd8/image/upload/tags_categories_icon_145927_ojalpy.png" alt="..." class="avatar-img rounded-circle">
                                </a>

                    </div>
                    <div class="col ms-n2">

                        <!-- Title -->
                        <h4 class="mb-1 name">
                            <a href="profile-posts.html">{{ item.categoria.titulo }} ({{ item.n_productos}} Productos) </a>
                        </h4>

                        <!-- Time -->
                        <p class="small mb-0" v-if="item.categoria.estado">
                            <span class="text-success">●</span> Activo
                        </p>
                          <p class="small mb-0" v-if="!item.categoria.estado">
                            <span class="text-danger">●</span> Inactivo
                        </p>
                    </div>
                    <div class="col-auto">

                        <!-- Button -->
                        <button class="btn btn-sm btn-danger text-white" v-if="item.categoria.estado" style="margin-right: 1rem;" @click="cambiarEstado(item.categoria._id, item.categoria.estado)">
                            Desactivar
                        </button>
                        <button class="btn btn-sm btn-success text-white" v-if="!item.categoria.estado" style="margin-right: 1rem;" @click="cambiarEstado(item.categoria._id, item.categoria.estado)">
                            activar
                        </button>

                    </div>
                </div>
                <!-- / .row -->
                
            </li>
        </ul>
    </div>
        </div>
        <div class="card" v-if="load_data">
            <div class="card-body">
                <ul class="list-group list-group-flush list my-n3">
                    <div class="text-center">
                      <img src="https://res.cloudinary.com/dqitdaxd8/image/upload/kOnzy_ikzcfe.gif" style="height: 50px;">
                    </div>
                </ul>
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
    name: 'categoriasApp',
    data(){
        return{
            add_category : false,
            nueva_categoria: '',
            categorias: [],
            load_data: false
        }
    },
    beforeMount(){
      this.init_data()
    },
    methods:{
      crear_categoria(){
       if(this.nueva_categoria){
         axios.post(this.$url+'/agregar_categoria',{titulo: this.nueva_categoria},{
          headers:{
            'Content-type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
          if (result.data.message){
          this.$notify({
                title: "ATENCION",
                text: result.data.message,
                type: "warn",
              });
          }else{
          this.$notify({
                title: "SUCCESS",
                text: "Categoria guardada",
                type: "success",
              });
          this.nueva_categoria = ''
          this.init_data()
          }
        })
      }else{
        this.$notify({
                title: "ERROR",
                text: "Ingrese la categoria",
                type: "error",
              });
      }
      },
      init_data(){
        this.load_data = true
      axios.get(this.$url+'/listar_categorias',{
        headers:{
          'Content-type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        this.categorias = result.data
        console.log(this.categorias);
        this.load_data = false
        
      })
      },
      cambiarEstado(id, estado){
      axios.put(this.$url +'/cambiar_estado_categoria/'+ id,{estado: estado},{
        headers:{
          'Content-Type': 'application/json', 
          'Authorization': this.$store.state.token,
        } 
      }).then((result)=>{
        console.log(result)
        this.init_data();
        this.$notify({
          title: 'SUCCESS',
          text: 'Se cambio el estado',
          type: 'success',
        })
      }).catch((error)=>{
        console.log(error);
      });
    }
    },
    components: {
      sideBar,
      topNav
    }
}
</script>