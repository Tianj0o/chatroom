import { defineComponent, reactive, StyleValue } from "vue";
import User from "@/store/user";
import request from "@/request/request";
export default defineComponent({
  setup() {
    const styleValue: StyleValue = {
      backgroundImage: 'url("../src/assets/login.jpg")',
    };
    const user = reactive({
      name: "",
    });

    async function handleLoginClick() {
      if (user.name.length < 3) {
        alert("名称必须大于3位");
        return;
      }
      localStorage.setItem("username", user.name);
      request("/login", {
        method: "post",
        body: JSON.stringify(user.name),
      }).then((res) => {
        console.log(res);
      });
    }
    return () => {
      return (
        <>
          <div
            class="h-full bg-cover flex justify-center items-center"
            style={styleValue}
          >
            <div class="flex flex-col justify-center items-center w-full">
              <input
                class={
                  (user.name != "" ? "text-3xl" : "") +
                  " p-10 border-none rounded-4 w-2/5 mb-10 outline-none text-blue font-600 h-4"
                }
                // class={user.name != "" ? "text-2xl" : ""}
                type="text"
                placeholder="请输入呢称"
                v-model={user.name}
              />
              <div
                class="border-transparent bg-blue-100 rounded-2 p-x-10 p-y-4 text-blue-9"
                onClick={handleLoginClick}
              >
                Enter
              </div>
            </div>
          </div>
        </>
      );
    };
  },
});
