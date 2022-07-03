import { defineComponent, ref } from "vue";
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
          <div>{msg.value == "" ? "hello,world" : msg.value} </div>
        </>
      );
    };
  },
});
