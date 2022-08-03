import { createApp } from "vue"
import app from "./app.vue"
import router from "@/router"
import "@/styles/index.scss"
import "@/icons"
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"

createApp(app).use(router).use(ElementPlus).mount("#app")
