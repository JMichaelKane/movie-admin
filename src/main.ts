import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";

const app = createApp(App);

app.use(router as any);

// 挂载到实例上
app.mount("#app");
