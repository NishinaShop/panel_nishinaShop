<template>
  <div class="d-flex align-items-center bg-auth border-top border-top-2 border-primary">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">
          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Bienvenido
          </h1>
          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Ingresa tu datos
          </p>
          <!-- Form -->
          <form>
            <div v-if="mns_error"class="alert alert-danger" role="alert">
              {{ mns_error }}
            </div>
            <!-- Email address -->
            <div class="form-group">
              <!-- Label -->
              <label class="form-label">
                Correo electronico
              </label>
              <!-- Input -->
              <input type="email" class="form-control" v-model="email" placeholder="usuario@email.com">
            </div>
            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <!-- Label -->
                  <label class="form-label">
                    Contraseña
                  </label>
                </div>
              </div> <!-- / .row -->
              <!-- Input group -->
              <div class="input-group input-group-merge">
                <!-- Input -->
                <input class="form-control" type="password" v-model="password" placeholder="Ingresa tu contraseña">
                <!-- Icon -->
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>
              </div>
            </div>
            <!-- Submit -->
            <button class="btn btn-lg w-100 btn-primary mb-3" type="button" v-on:click="validar">
              Ingresar
            </button>
          </form>
        </div>
      </div> <!-- / .row -->
    </div>
  </div>
  </template>
  <script>
  import axios from 'axios';
  import store from '@/store/index';
  
  export default {
    name: 'LoginApp',
    data(){
      return{
        email: '',
        password:'',
        mns_error:''
      }
    },
    created(){
      console.log(this.$url);
    },
    methods:{
      validar(){
        if (!this.email){
          this.mns_error = 'Ingresa un correo';
        }else if(!this.password){
          this.mns_error = 'Ingresa una contraseña';
        } else{
          this.mns_error = '';
          this.login();
        }
        console.log(this.mns_error)
      },
      login(){
      let data = {
        email: this.email,
        password: this.password
      }
      axios.post(this.$url+'/login_usuario', data,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((result)=>{
        console.log(result);
        if(result.data.data == undefined){
          this.mns_error = result.data.message;
        }
        if(result.data.token){
          this.$store.dispatch('saveToken',result.data.token);
          this.$router.push({name:'dashboard'});
        }
      }).catch((error)=>{
        console.log(error)
      });
    }
},
    components: {
    }
  }
  </script>
  