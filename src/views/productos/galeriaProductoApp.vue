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
                    <h1 class="header-title">Galerias de productos</h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/producto" class="nav-link"
                          >Todos los productos
                        </router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active"> Galeria de producto </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="load_data">
              <div class="row">
                <div class="col text-center">
                  <div class="spinner-border" role="status">
                    <div class="visually-hidden">Loading...</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="!load_data">
              <div>
                <div class="mb-7">
                  <div class="row">
                    <div class="col-12 col-md-12">
                      <!-- Email address -->
                      <div class="form-group">
                        <!-- Label -->
                        <label class="mb-1"> Imagen </label>
                        <!-- Input -->
                        <div class="input-group mb-3">
                          <input
                            id="input_file"
                            type="file"
                            class="form-control"
                            placeholder="Selecciona la imagen"
                            v-on:change="uploadImage($event)"
                          />
                          <button
                            class="btn btn-primary"
                            v-on:click="subir_imagen()"
                          >
                            <i class="fe fe-upload"></i>
                          </button>
                        </div>
                        <!-- Form text -->
                        <small class="form-text text-muted">
                          Subo un maximo de 5 imagenes para la galeria del
                          producto.
                          <br />
                          Solo imagenes tipo PNG, JPG, JPEG o WEBP no mayor a
                          1mb.
                        </small>
                      </div>
                    </div>
                  </div>
                  <!-- / .row -->

                  <div class="row listAlias" v-if="!load_galeria">
                    <div class="col-12 col-md-6 col-xl-4" v-for="item in galeria">
                      <div class="card">
                        <a >
                          <img
                            :src="$url+'/obtener_galeria_producto/'+item.imagen"
                            alt="..."
                            class="card-img-top"
                          />
                        </a>
                        <div class="card-footer card-footer-boxed">
                          <div class="row">
                            <div class="col text-center">
                              <a type="button" @click="eliminar_imagen(item._id)"class="text-danger" style="cursor:pointer">Eliminar imagen</a>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="load_galeria">
                    <div class="col text-center m-5" >
                  <div class="spinner-border text-info" role="status">
                    <div class="visually-hidden">Loading...</div>
                  </div>
                </div>
                  </div>
                </div>
                <template v-if="!data">
                  <div>
                    <errorNotFound />
                  </div>
                </template>
              </div>
            </template>
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
import errorNotFound from "@/components/ErrorNotFound.vue";
import $ from "jquery";
import axios from "axios";

export default {
  name: "galeriaProductoApp",
  components: {
    sideBar,
    topNav,
    errorNotFound,
  },
  data() {
    return {
      image: undefined,
      str_img: "",
      data: false,
      load_data: true,
      load_galeria: true,
      galeria: [],
    };
  },
  methods: {
    init_data() {
      this.load_data = true;
      axios.get(this.$url + "/obtener_producto_admin/" + this.$route.params.id, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.$store.state.token,
          },
        })
        .then((result) => {
          console.log(result);
          if (result.data == "") {
            this.data = false;
          } else {
            this.data = true;
            this.producto = result.data;
            this.str_img = this.$url+'/obtener_portada_producto/'+this.producto.portada;
          }
          this.load_data = false;
        });
    },
    uploadImage($event) {
      var img;
      if ($event.target.files.length >= 1) {
        img = $event.target.files[0];
      }
      if (img.size <= 1000000) {
        if (
          img.type == "image/jpg" ||
          img.type == "image/png" ||
          img.type == "image/webp" ||
          img.type == "image/jpeg"
        ) {
          this.str_img = URL.createObjectURL(img);
          this.image = img;
        } else {
          this.$notify({
            title: "ATENCIÓN",
            text: "Solo se admiten imagenes.",
            type: "warn",
          });
          this.image = undefined;
          $("#input_file").val("");
        }
      } else {
        this.$notify({
          title: "ATENCIÓN",
          text: "La imagen no debe ser mayor a 1mb.",
          type: "warn",
        });
        this.image = undefined;
        $("#input_file").val("");
      }
      console.log(this.image);
    },
    subir_imagen() {
      if (this.image == undefined) {
        this.$notify({
          title: "ATENCION",
          text: "No se selecciono ninguna imagen",
          type: "warn",
        });
      } else {
        var fm = new FormData();
        fm.append("producto", this.$route.params.id);
        fm.append("imagen", this.image);

        axios
          .post(this.$url + "/subir_imagen_producto_admin", fm, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": this.$store.state.token,
            },
          })
          .then((result) => {
            console.log(result);
            if (result.data == undefined) {
              this.$notify({
                title: "ERROR",
                text: result.data.message,
                type: "error",
              });
            } else {
              this.$notify({
                title: "SUCCESS",
                text: "Se subio la imagen",
                type: "success",
              });
              this.init_galeria()
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    init_galeria() {
      this.load_galeria = true;
      axios.get(this.$url + "/obtener_galeria_producto_admin/" + this.$route.params.id, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.$store.state.token,
          },
        })
        .then((result) => {
          console.log(result);
          this.galeria = result.data
          this.load_galeria = false;
        });
    },
    eliminar_imagen(id){
      axios.delete(this.$url+'/eliminar_galeria_producto_admin/'+id,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.$store.state.token,
          },
      }).then((result)=>{
        if(result.data.message){
          this.$notify({
                title: "ERROR",
                text: result.data.message,
                type: "error",
              });
        }else{
          this.$notify({
                title: "SUCCESS",
                text: "Se elimino la imagen",
                type: "success",
              });
          this.init_galeria()
        }
      })
    }
  },
  beforeMount() {
    this.init_data()
    this.init_galeria()
  },
};
</script>
