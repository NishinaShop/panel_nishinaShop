import { createRouter, createWebHistory } from 'vue-router'
import LoginApp from '../views/LoginApp.vue'
import store from '@/store/index'
import CreateColaboradorApp from '@/views/colaboradores/CreateColaboradorApp.vue'
import indexColaboradorApp from '@/views/colaboradores/indexColaboradorApp.vue'
import { jwtDecode } from 'jwt-decode'

const routes = [
  /*Colaboradores*/ 
  {path: '/', name: 'login',component: LoginApp,meta: { requiresAuth: false },},
  {path: '/colaborador/create', name: 'colaborador-create',component: CreateColaboradorApp, meta: { requiresAuth: true }},
  {path: '/colaborador', name: 'colaborador-index',component: indexColaboradorApp, meta: { requiresAuth: true },},
  {path: '/colaborador/edit/:id', name: 'colaborador-edit', component: ()=> import('@/views/colaboradores/EditColaboradorApp.vue'),meta: { requiresAuth: true },},
  {path: '/colaborador/perfil/:id', name: 'colaborador-perfil', component: ()=> import('@/views/colaboradores/perfilColaborador.vue'), meta: {requiresAuth: true}},
  {path: '/dashboard', name: 'dashboard',component: ()=> import('@/views/dashboardApp.vue'),meta: { requiresAuth: true }, },
  /*Productos*/ 
  {path: '/producto/crear', name: 'crear-producto',  component: ()=> import('@/views/productos/crearProductoApp.vue'), meta: {requiresAuth: true},},
  {path: '/producto', name: 'index-producto', component: ()=> import('@/views/productos/indexProductosApp.vue'), meta: {requiresAuth: true},},
  {path: '/producto/edit/:id', name: 'edit-producto',component: ()=> import('@/views/productos/editProductoApp.vue'),meta: { requiresAuth: true }, },
  {path: '/producto/galeria/:id', name: 'galeria-producto',component: ()=> import('@/views/productos/galeriaProductoApp.vue'),meta: { requiresAuth: true }, },
  /*ingresos*/
  {path: '/ingreso/crear', name: 'crear-ingreso',  component: ()=> import('@/views/ingreso/crearIngresoApp.vue'), meta: {requiresAuth: true},},
  {path: '/ingreso', name: 'lista-ingreso', component: ()=> import('@/views/ingreso/listaIngresoApp.vue'),  meta: {requiresAuth: true},},
  {path: '/ingreso/detalle/:id', name: 'detalle-ingreso', component: ()=> import('@/views/ingreso/detalleIngresoApp.vue'),  meta: {requiresAuth: true},},
  /*Ventas*/
  {path: '/ventas', name: 'ordenes-venta', component:()=> import('@/views/ventas/indexOrdenesApp.vue'),meta: {requiresAuth: true}},
  {path: '/ventas/detalles/:id', name: 'detalles-venta', component: () => import('@/views/ventas/ordenDetallesApp.vue'),meta: {requiresAuth: true}},
  /*Salidas*/
  {path: '/salidas', name: 'lista-salidas', component:()=> import('@/views/salidas/salidasApp.vue'),meta: {requiresAuth: true}},
  /*Inventario*/
  {path: '/inventario', name: 'lista-inventario', component:()=> import ('@/views/inventario/inventarioApp.vue'),meta: {requiresAuth: true}},
  {path: '/inventario/detalle/:id', name: 'detalle-inventario', component:()=> import ('@/views/inventario/detalleInventarioApp.vue'), meta: {requiresAuth: true}},
  /*Extraoridario*/
  {path: '/extraordinario', name: 'lista-extra', component:()=> import ('@/views/extraordinario/indexExtraApp.vue'),meta: {requiresAuth: true}},
  {path: '/extraordinario/salida', name: 'salida-extra', component:()=> import ('@/views/extraordinario/salidaExtraApp.vue'),meta: {requiresAuth: true}},
  {path: '/extraordinario/ingreso', name: 'ingreso-extra', component:()=> import ('@/views/extraordinario/ingresoExtraApp.vue'),meta: {requiresAuth: true}},
  /*Categorias */
  {path: '/categorias', name: 'categorias', component:()=> import('@/views/productos/categoriasApp.vue'),meta: {requiresAuth: true}},
  /*Variedades */
  {path: '/variedades/:id', name: 'variedades', component:()=> import('@/views/productos/variedadesApp.vue')}
] 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

router.beforeEach((to, from, next) => {
 if (to.matched.some(item => item.meta.requiresAuth)){
  if(!store.state.token){
    next({
      name:'login'
    })
  }
  try{
    jwtDecode(store.state.token)
  }catch (error){
    next({
      name:'login'
    })
  }
if(jwtDecode(store.state.token).exp*1000 <= new Date().getTime()){
  next({
    name:'login'
  })
} 
  next()
  console.log('privada');
 }else{
  console.log('Publica')
  next()  
 }
})

export default router
