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
                    <h1 class="header-title">Perfil de usuario</h1>
                  </div>
                </div>
                <!-- / .row -->

              </div>
            </div>

<div class="mb-7 mt-5">                

                <div class="row">
                  <!--Nombre del producto-->
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1"> Nombre:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        v-model="usuario.nombre"
                        placeholder="Nombres del usuario" 
                      />
                    </div>
                  </div>
                   <!-- Clave del producto -->
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1"> Apellidos:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        v-model="usuario.apellidos"
                        placeholder="Apellidos del usuario"
                        
                      />
                    </div>
                  </div>
                  <!--Genero-->
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1">Correo electronico:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        v-model="usuario.email"
                        placeholder="Correo electronico del usuario"
                        
                      />
                    </div>
                  </div>
                  <!--Categoria-->
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1">Cargo:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="text"
                        readonly
                        class="form-control"
                        v-model="usuario.rol"
                        placeholder="Cargo del usuario"
                        
                      />
                    </div>
                  </div>
                  <!--Precio-->
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1">Nueva contraseña:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        placeholder="Nueva contraseña"
                        
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="mb-1">Confirma la contraseña:</label>
                      <small class="form-text text-muted">
                        
                      </small>
                      <input
                        type="password"                        
                        class="form-control"
                        v-model="repassword"
                        placeholder="Confirma la contraseña"
                        
                      />
                    </div>
                  </div>
                </div>
                
                <hr class="mt-4 mb-5" />

                <!-- Button -->
                <button class="btn btn-primary" v-on:click="guardar_contraseña()">Guardar cambios</button>
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
  
  export default {
    name: 'perfilColaboradorApp',
    data(){
      return{
        usuario:{},
        id: this.$route.params.id,
        password: '',
        repassword: ''
      }
    },
    beforeMount(){
      this.init_data()
    },
    methods:{
      init_data(){
         axios.get(this.$url + "/obtener_usuario_admin/" + this.id, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token,
          },
        })
        .then((result) => {
            this.usuario = result.data;
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      },
      guardar_contraseña(){
        if(this.password === ''){
          this.$router.push({name:  'dashboard'});
        }else if(this.repassword != this.password){
          this.$notify({
            title: 'ATENCIÓN',
            text: 'Las contraseñas no coinciden',
            type: 'warn'
          })
        }else{
          axios.put(this.$url+'/cambiar_password_usuario_admin/'+this.id,{
            password: this.password
          },{
            headers:{
              'Content-Type': 'application/json',
              'Authorization': this.$store.state.token
            }
          }).then((result)=>{
            this.$notify({
              title: 'EXITO',
            text: 'La contraseña se actualizo',
            type: 'success'
            })
            this.password = ''
            this.repassword = ''
          })
        }
      }
    },
    components: {
      sideBar,
      topNav
    }
}
</script>