<template>
  <div id="main" :style="'height:' + screenHeight + 'px;' + 'margin:0 auto'">
    <div style="display: flex; flex-direction: column">
      <div :style="'height:' + 0.3 * screenHeight + 'px;'+'display:flex;justify-content:center;align-items:center;'">
        <svg class="icon" aria-hidden="true" style="font-size:6rem;margin:0 auto">
          <use xlink:href="#icon-Vue" ></use>
        </svg>
      </div>
      <input
        @keydown.enter="handleEnterBtnClick"
        style="
          height: 4rem;
          width: 10rem;
          margin: 0 auto;
          text-align: center;
          border-radius: 1rem;
          outline: none;
          font-size: 1.5rem;
          border: none;
        "
        type="text"
        placeholder="请输入昵称"
        v-model="username"
      />
      <button
        class="iconfont icon-jinru"
        style="
          height: 6rem;
          width: 12rem;
          margin: 2rem auto;
          font-size: 2rem;
          border-radius: 1rem;
          border: 0 transparent;
          margin-top: 9rem;
        "
        @click="handleEnterBtnClick"
      >
        Enter
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Login",

  setup() {
    const username = ref("");
    const router = useRouter();

    //定义前端接口
    let {ctx,proxy} = getCurrentInstance()



    const handleEnterBtnClick = async () => {
      const Username = username.value.trim();
      if (Username.length < 3) {
        alert("昵称必须大于三位");
        return;
      }
      localStorage.setItem("username", Username);
      const res = await proxy.$http.post('/user',{username:Username})
      router.push("/");
    };
    onMounted(() => {
      setHeight();
      console.log('1')
      if (localStorage.getItem("username")) {
        router.push("/");
      }

    });
    const screenHeight = ref(0);
    const setHeight = () => {
      const nowheight = window.innerHeight;
      screenHeight.value = nowheight;
    };
    return {
      username,
      handleEnterBtnClick,
      screenHeight,
      ctx,proxy,
      
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
