import { createApp } from "vue";

import App from "./App.vue";

import "./assets/reset.scss";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(Antd).use(VueAxios, axios).mount("#app");
