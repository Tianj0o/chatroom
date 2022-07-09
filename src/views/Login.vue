<template>
  <div id="main" :style="'height:' + screenHeight + 'px;' + 'margin:0 auto'">
    <div style="display: flex; flex-direction: column">
      <div :style="
        'height:' +
        0.3 * screenHeight +
        'px;' +
        'display:flex;justify-content:center;align-items:center;'
      ">
        <svg class="icon" aria-hidden="true" style="font-size: 6rem; margin: 0 auto">
          <use xlink:href="#icon-Vue"></use>
        </svg>
      </div>
      <input @keydown.enter="handleEnterBtnClick" style="
          height: 4rem;
          width: 10rem;
          margin: 0 auto;
          text-align: center;
          border-radius: 1rem;
          outline: none;
          font-size: 1.5rem;
          border: none;
        " type="text" placeholder="请输入昵称" v-model="username" />
      <button class="iconfont icon-jinru h-24 w-48 m-2 text-8 text-blue rd-4 my-8 mt-32 b-0 mx-a"
        @click="handleEnterBtnClick">
        Enter
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Login",

  setup() {
    const username = ref("");
    const router = useRouter();

    let { ctx, proxy } = getCurrentInstance();
    //获得组件实例 其中ctx只能在生产环境使用 proxy在生产和线上都可使用

    const handleEnterBtnClick = async () => {
      const Username = username.value.trim();
      if (Username.length < 3) {
        alert("昵称必须大于三位");
        return;
      }
      localStorage.setItem("username", Username);
      //将username储存在本地

      const res = await proxy.$http.post("/user", { username: Username });
      //将username发给后端 注意 使用对象，后端上已经使用 json方法
      router.push("/");
    };
    onMounted(() => {
      setHeight();
      console.log("1");
      if (localStorage.getItem("username")) {
        router.push("/");
      }
    });

    //获取屏幕的高度来适应不同的屏幕
    const screenHeight = ref(0);
    const setHeight = () => {
      const nowheight = window.innerHeight;
      screenHeight.value = nowheight;
    };

    // const search = async()=>{
    //   const data =await proxy.$http.get('/search?keywords=海阔天空')
    //   console.log(data.data)
    // }
    return {
      username,
      handleEnterBtnClick,
      screenHeight,
      ctx,
      proxy,
    };
  },
};
</script>

<style>
#main {
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
}

input::-webkit-input-placeholder {
  font-size: 1rem;
}

button {
  opacity: 0.8;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
