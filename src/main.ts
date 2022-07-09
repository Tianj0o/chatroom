import { createApp } from "vue";
import App from "./App";
import router from "./router";
import "./assets/base.css";
import "uno.css";
// import './assets/font_deznx2kadpk/iconfont.css'
// import './assets/font_deznx2kadpk/iconfont.js'
const app = createApp(App);
app.use(router);
app.mount("#app");
