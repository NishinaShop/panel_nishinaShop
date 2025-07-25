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
                    <h6 class="header-pretitle">Panel de administración</h6>
                    <h1 class="header-title">Dashboard</h1>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjetas del dashboard -->
            <div class="row mt-4 g-4">
              <div class="col-6 col-md-4" v-for="card in cards" :key="card.title">
                <div class="card text-white" :class="card.bg">
                  <div class="card-body">
                    <h2 class="card-title">{{ card.title }}</h2>
                    <h4 class="card-text fw-bold">{{ card.value }}</h4>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gráfico simulado -->
            <!--
            <div class="card mt-5">
              <div class="card-body">
                <h5 class="card-title">Ventas del mes</h5>
                <canvas id="graficoVentas"></canvas>
              </div>
            </div>-->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "@/components/sideBar.vue";
import topNav from "@/components/topNav.vue";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "dashboardApp",
  components: {
    sideBar,
    topNav,
  },
  data() {
    return {
      datos: {
        productos: 0,
        ventasTotales: 0,
        ingresosTotales: 0,
        clientes: 0,
        ingresosDelmes: 0,
        ventasDelMes: 0
      },
      cards: [],
      ventasPorDia: [
        { dia: 1, total: 1200 },
        { dia: 2, total: 1800 },
        { dia: 3, total: 2500 },
        { dia: 4, total: 1000 },
        { dia: 5, total: 3000 },
      ],
    };
  },
  beforeMount(){
  this.cargarDatos();
  },
  mounted() {
    this.iniciarGrafico();
  },
  methods: {
    formatCurrency(val) {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(val);
    },
    async cargarDatos() {
      try {
        axios.get(this.$url+'/obtener_datos_dashboard',{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': this.$store.state.token
          }
        }).then((result)=>{
          this.datos = result.data;
          this.cards = [
          { title: "Productos", value: this.datos.productos, bg: "bg-primary" },
          { title: "Clientes", value: this.datos.clientes, bg: "bg-warning" },
          { title: "N. ingresos totales", value: this.datos.ingresosTotales, bg: "bg-info" },
          { title: "Ingresos del mes", value: this.formatCurrency(this.datos.ingresosDelmes), bg: "bg-secondary" },
          { title: "N. ventas totales", value: this.datos.ventasTotales, bg: "bg-success" },
          { title: "Ventas del mes", value: this.formatCurrency(this.datos.ventasDelMes), bg: "bg-dark" },
        ];
        })
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
      }
      
    },
    /*
    iniciarGrafico() {
      const ctx = document.getElementById("graficoVentas");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.ventasPorDia.map((v) => `Día ${v.dia}`),
          datasets: [
            {
              label: "Ventas MXN",
              data: this.ventasPorDia.map((v) => v.total),
              backgroundColor: "rgba(25, 135, 84, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `$${value}`,
              },
            },
          },
        },
      });
    },
    */
    
  },
};
</script>
