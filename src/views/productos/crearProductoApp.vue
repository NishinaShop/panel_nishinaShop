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
                    <h1 class="header-title">Nuevo producto</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      
                      <li class="nav-item">
                        <router-link to="/producto" class="nav-link "
                          >Todos los productos
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active"> Crear producto </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!--Contenido dinamico Inicio-->
              <div class="mb-7 mt-5">
                <div class="row justify-content-between align-items-center">
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <div class="avatar">
                          <img
                            class="avatar-img rounded-circle"
                            src="/assets/img/icon-ropa.jpg"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Heading -->
                        <h4 class="mb-1">
                          <b>Selecciona la imagen de portada</b>
                        </h4>

                        <!-- Text -->
                        <small class="text-muted">
                          Solo imagenes tipo PNG, JPG, JPEG o WEBP no mayor a 1mb.
                        </small>
                      </div>
                    </div>
                    <!-- / .row -->
                  </div>
                  <div class="col-auto">
                    <!-- Button -->

                    <label for="file-upload" class="btn btn-sm btn-primary">
                      Cargar
                    </label>
                    <input style="display: none" id="file-upload" type="file" v-on:change="uploadImage($event)" />
                  </div>
                </div>
                <!-- / .row -->
                <img
                            class="upload-img rounded-circle"
                            :src="str_img"
                            alt="..."
                          />
                <!-- Divider -->
                <hr class="my-5" />

                <div class="row">
                  <!--Nombre del producto-->
                  <div class="col-12">
                    <div class="form-group">
                      <label class="mb-1"> Nombre del producto</label>
                      <small class="form-text text-muted">
                        El nombre debe ser descriptivo, claro y deberá incluir características clave.
                      </small>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nombre del producto" 
                        v-model="producto.nombre" 
                      />
                    </div>
                  </div>
                   <!-- Clave del producto -->
                  <div class="col-12">
                    <div class="form-group">
                      <label class="mb-1"> Clave del producto</label>
                      <small class="form-text text-muted">
                        La clave de producto es para una mejor logistica interna
                      </small>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Clave del producto"
                        v-model="producto.clave" 
                      />
                    </div>
                  </div>
                  <!--Genero-->
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <label class="form-label"> Genero</label>
                      <select name="" class="form-select" v-model="producto.genero">
                        <option value=""disabled selected>Seleccionar</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Niña">Niña</option>
                        <option value="Niño">Niño</option>
                      </select>
                    </div>
                  </div>
                  <!--Categoria-->
                  <div class="col-12 col-md-6">
                    <div class="form-group">
                      <label class="form-label"> Categoria </label>
                      <select name="" class="form-select" v-model="producto.categoria">
                        <option value="" disabled selected>Seleccionar</option>
                        <option :value="item.categoria.titulo" v-for="item in categorias">{{ item.categoria.titulo }}</option>
                      </select>
                    </div>
                  </div>
                  <!--Precio-->
                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label"> Precio </label>
                      <small class="form-text text-muted">
                        El precio se agregara en el ingreso
                      </small>
                      <!-- Input -->
                      <input 
                        readonly
                        type="number"
                        class="form-control"
                        placeholder="Precio"
                        value="0"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label" > Descuento </label>
                      <small class="form-text text-muted">
                        Indique el descuanto en %
                      </small>
                      <!-- Input -->
                      <input v-if="descuento"
                      v-model="producto.desc_porcentaje"
                        type="number"
                        class="form-control"
                        placeholder="descuento"
                        value="0"
                      />
                    </div>
                  </div>

                  <div class="col-12 col-md-12">
                    <!-- Phone -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label"> Descripción </label>

                      <!-- Input -->
                      <textarea
                        class="form-control"
                        id=""
                        rows="3"
                        placeholder="Descripción"
                        v-model="producto.descripcion"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <!-- / .row -->

                <div class="row">
                  <div class="col-12 col-md-6">
                    <!-- Public profile -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1"> Producto publicado </label>

                      <!-- Form text -->
                      <small class="form-text text-muted">
                        Marca el producto como publicado si al guardar quedara publico o desactivalo si quedara como
                        borrador
                      </small>

                      <div class="row">
                        <div class="col-auto">
                          <!-- Switch -->
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="switchOne"
                              v-model="producto.estado" 
                            />
                            <label
                              class="form-check-label"
                              for="switchOne"
                            ></label>
                          </div>
                        </div>
                        <div class="col ms-n2">
                          <!-- Help text -->
                          <small class="text-muted"> Borrador activado </small>
                        </div>
                      </div>
                      <!-- / .row -->
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Allow for additional Bookings -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1"> En descuento </label>

                      <!-- Form text -->
                      <small class="form-text text-muted">
                        Habilida esta opcion si el producto si tendra descuento.
                      </small>

                      <div class="row">
                        <div class="col-auto">
                          <!-- Switch -->
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="switchTwo"
                              v-model="producto.descuento" 
                              v-on:change="descuentoActivado()"
                            />
                            <label
                              class="form-check-label"
                              for="switchTwo"
                            ></label>
                          </div>
                        </div>
                        <div class="col ms-n2">
                          <!-- Help text -->
                          <small class="text-muted">
                            Descuento desactivado
                          </small>
                          <!--Conteniedo dinamico cierre-->
                        </div>
                      </div>
                      <!-- / .row -->
                    </div>
                  </div>
                </div>
                <!-- / .row -->

                <!-- Divider -->
                <hr class="mt-4 mb-5" />

                <!-- Button -->
                <button class="btn btn-primary" v-on:click="validar()">Guardar producto</button>
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
import axios from "axios"
export default {
  name: "crearPoductoApp",
  components: {
    sideBar,
    topNav,
  },
  data(){
    return{
      str_img: '/assets/img/icon-ropa.jpg', 
      producto: {
        genero:'',
        categoria:'',
        estado: true,
        descuento: false,
        portada: undefined,
        desc_porcentaje: 0
      },
      portada: undefined,
      descuento: false,
      categorias: [],
    }
  },
  methods:{
    descuentoActivado(){
      if (!this.descuento){
        this.descuento = true
      } else {
        this.descuento = false
      }
    },
      uploadImage($event){
        var img;
        if($event.target.files.length >= 1){
          img = $event.target.files[0];
        }
        if(img.size <= 1000000){
          if(img.type == 'image/jpg' || img.type == 'image/png' || img.type == 'image/webp' || img.type == 'image/jpeg' ){
            this.str_img = URL.createObjectURL(img);  
            this.portada = img;
            this.producto.portada = this.portada;        
          }else{
        this.$notify({
            title: 'ATENCIÓN',
            text: 'Solo se admiten imagenes.',
            type: 'warn'
          });
        }
      } else{
          this.$notify({
            title: 'ATENCIÓN',
            text: 'La imagen no debe ser mayor a 1mb.',
            type: 'warn'
          });
        }
    },
    validar(){
      if(!this.producto.nombre){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Ingresa el nombre de producto',
          type: 'error',
        });
      }else if(!this.producto.clave){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Ingresa la clave de producto',
          type: 'error',
        });
      }else if(!this.producto.genero){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Selecciona el genero',
          type: 'error',
        });
      }else if(!this.producto.categoria){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Selecciona una categoria',
          type: 'error',
        });
      }else if(!this.producto.descripcion){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Agrega una descripcion del producto',
          type: 'error',
        });
      }else if(this.producto.portada == undefined){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'Ingresa la imagen de portada',
          type: 'error',
        });
      } else if(this.producto.desc_porcentaje > 100){
        this.$notify({
          title: 'ATENCIÓN',
          text: 'El rango del descuento % es del 0 al 100',
          type: 'error',
        });
      }else{
        this.registro()
      }
    },
    registro(){
      var fm = new FormData();
      fm.append('nombre',this.producto.nombre);
      fm.append('clave',this.producto.clave);
      fm.append('genero',this.producto.genero);
      fm.append('categoria',this.producto.categoria);
      fm.append('descripcion',this.producto.descripcion);
      fm.append('estado',this.producto.estado);
      fm.append('descuento',this.producto.descuento);
      fm.append('portada',this.producto.portada);

      axios.post(this.$url+'/registro_producto_admin',fm,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        console.log(result);
        if(result.data.data == undefined){
              this.$notify({
                title: "ERROR",
                text: result.data.message,
                type: "error"
            });
            }else{
              this.$notify({
                title: "SUCCESS",
                text: "Se registro el nuevo producto",
                type: "success"
            });
            this.$router.push({name:  'index-producto'});
            }
        }).catch((error)=>{
            console.log(error);
        });
    },
    init_categorias(){
      axios.get(this.$url+'/listar_categorias',{
        headers:{
          'Content-type': 'application/json',
          'Authorization': this.$store.state.token
        }
      }).then((result)=>{
        this.categorias = result.data
        console.log(this.categorias);
        
      })
      },
  },
  beforeMount(){
   this.init_categorias()
  }
};
</script>
