import { createApp } from 'vue'
// import App from './App.vue'
import AdminApp from "./AdminApp.vue";

if (document.getElementById('my-vue-admin-app')) {
    createApp(AdminApp).mount('#my-vue-admin-app')
} else if (document.getElementById('my-vue-app')) {
    // fallback for shortcode usage
    createApp(AdminApp).mount('#my-vue-app')
}
