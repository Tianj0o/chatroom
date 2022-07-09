import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import request from "./request/request";
export default defineComponent({
  setup() {
    const msg = ref("");
    request({
      url: "http://localhost:8888/login",
    }).then((res) => {
      msg.value = res.data;
    });

    return () => {
      return (
        <>
          <RouterView />
        </>
      );
    };
  },
});
