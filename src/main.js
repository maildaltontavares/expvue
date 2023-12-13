import { createApp } from 'vue'
import App from './App.vue'  
import router from '@/router'
import store from '@/store/index'
import moment from 'moment'
import { vMaska  } from 'maska'
//import {Maska} from 'maska'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Popper from 'vue3-popper' 
import useVuelidate from '@vuelidate/core'
import VueCookies from 'vue3-cookies'
import money from 'v-money3' 
 
 

const Vue = createApp(App)

Vue.directive('maska', vMaska)
//Vue.use(Maska)
Vue.component('Popper', Popper)

Vue.config.globalProperties.$moment = moment
Vue.config.globalProperties.$moment.locale('pt-br')


 

Vue.use(router)
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: '',
  suffix: '',
  precision: 2,
  masked: false /* doesn't work with directive */
})

Vue.use(store)
Vue.use(VueCookies, { expires: '60min' })
Vue.use(useVuelidate)
Vue.use(VueAxios, axios) 
 


router.isReady().then(() => {
    Vue.mount('#app')
 
  })
