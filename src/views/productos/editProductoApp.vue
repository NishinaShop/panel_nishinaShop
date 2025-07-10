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
                    <h1 class="header-title">Editar producto</h1>
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
                        <router-link to= "/producto/crear" class="nav-link"> Crear producto</router-link>
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

                      <!-- Input -->
                      <input
                        type="number"
                        readonly
                        class="form-control"
                        placeholder="Precio"
                        v-model="producto.precio" 
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6" >
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label" > Descuento </label>
                      <small class="form-text text-muted">
                        Indique el descuanto en %
                      </small>
                      <!-- Input -->
                      <input 
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
                <hr class="mt-4 mb-5" />
                <!-- / .row -->
                <button class="btn btn-primary" v-on:click="validar()">Guardar cambios</button>
                <!-- Divider -->
                <hr class="mt-4 mb-5" />
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
  name: "editPoductoApp",
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
        
      },
      total: 0,
      portada: undefined,
      categorias:[],
    }
  },
  mounted(){
  },
  methods:{
    calcular_descuento(){
      const precio = parseInt(this.producto.precio);
      const descuento = parseInt(this.producto.desc_porcentaje) / 100
      this.total = precio - (precio * descuento)
      
    },
     descuentoActivado(){
      if (!this.descuento){
        this.descuento = true
      } else {
        this.descuento = false
      }
    },
    init_data(){
        axios.get(this.$url+'/obtener_producto_admin/'+this.$route.params.id,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token
            }
        }).then((result)=>{
            this.producto = result.data
            this.str_img = this.producto.portada;
        })
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
          this.portada = undefined
        }
      } else{
          this.$notify({
            title: 'ATENCIÓN',
            text: 'La imagen no debe ser mayor a 1mb.',
            type: 'warn'
          });
          this.portada = undefined
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
      } else{
        this.actualizar()
      }
    },
    actualizar() {
      console.log(this.producto.desc_porcentaje);
      
      if(this.producto.descuento === true){
        if(this.producto.desc_porcentaje > 100 ){
          this.$notify({
            title: 'ATENCIÓN',
            text: 'Ingresa un porcentaje valido',
            type: 'warn'
          })
        }else if(this.producto.desc_porcentaje === '' ||
  this.producto.desc_porcentaje === null ||
  this.producto.desc_porcentaje === undefined ||
  isNaN(this.producto.desc_porcentaje) ||
  parseFloat(this.producto.desc_porcentaje) <= 0
) {
  this.$notify({
    title: 'ATENCIÓN',
    text: 'Ingresa un porcentaje válido',
    type: 'warn'
  });
        }else {
          this.calcular_descuento()
        console.log(this.total);
        const formData = new FormData();
  
  // Agrega todos los campos obligatorios
  formData.append('nombre', this.producto.nombre);
  formData.append('clave', this.producto.clave);
  formData.append('genero', this.producto.genero);
  formData.append('categoria', this.producto.categoria);
  formData.append('descripcion', this.producto.descripcion);
  formData.append('estado', this.producto.estado);
  formData.append('descuento', this.producto.descuento);
  formData.append('precio', this.total);

  // Solo agrega la imagen si existe
  if (this.portada instanceof File) {
    formData.append('portada', this.portada);
  }

  axios.put(`${this.$url}/actualizar_producto_admin/${this.$route.params.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': this.$store.state.token
    }
  }).then((result) => {
    this.$notify({
      title: 'ÉXITO',
      text: 'Producto actualizado correctamente',
      type: 'success'
    });
    this.$router.push({name:  'index-producto'});
  }).catch((error) => {
    console.error('Error detallado:', error.response?.data);
    this.$notify({
      title: 'ERROR',
      text: error.response?.data?.message || 'Error al actualizar el producto',
      type: 'error'
    });
  });
        }
        
      
}else {
  const formData = new FormData();
  
  // Agrega todos los campos obligatorios
  formData.append('nombre', this.producto.nombre);
  formData.append('clave', this.producto.clave);
  formData.append('genero', this.producto.genero);
  formData.append('categoria', this.producto.categoria);
  formData.append('descripcion', this.producto.descripcion);
  formData.append('estado', this.producto.estado);
  formData.append('descuento', this.producto.descuento);
  formData.append('precio', this.producto.precio)
  // Solo agrega la imagen si existe
  if (this.portada instanceof File) {
    formData.append('portada', this.portada);
  }

  axios.put(`${this.$url}/actualizar_producto_admin/${this.$route.params.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': this.$store.state.token
    }
  }).then((result) => {
    this.$notify({
      title: 'ÉXITO',
      text: 'Producto actualizado correctamente',
      type: 'success'
    });
    this.$router.push({name:  'index-producto'});
  }).catch((error) => {
    console.error('Error detallado:', error.response?.data);
    this.$notify({
      title: 'ERROR',
      text: error.response?.data?.message || 'Error al actualizar el producto',
      type: 'error'
    });
  });
}
  
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
    this.init_data();
    this.init_categorias()
  },
}
</script>
