<template>
  <div
    class="main"
    :style="'height:' + screenHeight + 'px;' + 'width:' + screenWidth + 'px;'"
  >
    <div class="home" style="display: flex; flex-direction: column">

      <div id="historyMsgs" class="historyMsgs" @click="fetchMsg" style="display: flex; justify-content: center;margin:0.5rem 0;height:2rem;align-items:center">
        <span style="">{{tips}}</span>
        <svg class="icon" aria-hidden="true" style="font-size:1.3rem;margin-left:0.4rem">
          <use xlink:href="#icon-lishijilu"></use>
        </svg>
      </div>

      <div
        ref="myref"
        id="chatlist"
        :style="'height:' + 0.82 * screenHeight + 'px;'"
      >
        <HisMsg :hismsgs="hismsgs"></HisMsg>
        <ul id="msglists" style="display: flex; flex-direction: column">
          <li
            v-for="(item) in state.msglist"
            :key="item.count"
            style="margin-left: 2rem; margin-bottom: 0.5rem"
            :class="item.name==username ? 'myself':'other'"
          >
            <div style="margin: 0.5rem 0">
              <span style="margin-right:0.4rem;">{{ item.name }}</span>

              <i style="font-size: 0.7rem">{{ item.time }}</i>
            </div>
            <div>
              <span class="context">{{ item.msg }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div id="inputdiv" style="display: flex;margin-top:0.5rem">
        <input
          @keyup.enter="handlerSentBtnClcik"
          type="text"
          v-model="state.msg"
          style="
            outline: none;
            padding: 0 1rem;
            height: 2rem;
            font-size: 1.1rem;
          "
        />
        <button @click="handlerSentBtnClcik">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-SEND"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket } from "../hooks";
import HisMsg from "../components/his-msg.vue";
export default {
  name: "Home",
  components: {
    HisMsg,
  },
  setup() {
    const state = reactive({
      msg: "",
      msglist: [],
      count:0,
    });
    const router = useRouter();
    let { proxy } = getCurrentInstance();
    const username = localStorage.getItem("username");

    const ws = useWebSocket(handleMessage);

    const handlerSentBtnClcik = async () => {
      const data = {
        name: username,
        time: new Date().toLocaleTimeString(),
        msg: state.msg,
        count:++state.count
        
      };
      //前端的信息接口

      const res = await proxy.$http.post("/msg", data);
      //单独显示自己发出去的信息
      //太low了 还有bug 动态设置css啊！！！ tule
      /* const msglist = document.querySelector("#msglists");
      const myli = document.createElement("li");
      myli.innerHTML = `
          <li style="display:flex;flex-direction:column;align-items:flex-end;margin-right:2rem;margin-bottom:0.5rem">
            <div style="margin: 0.5rem 0">
              <span>${data.name}</span>

              <i style="font-size: 0.7rem">${data.time}</i>
            </div>
            <div>
              <span class="context">${data.msg}</span>
            </div>
          </li>
      `;
      msglist.appendChild(myli); */
      ws.send(JSON.stringify(data));
      state.msg = "";
      // console.log(myref.value.offsetHeight)
      // console.log(
      //   myref.value.scrollTop,
      //   myref.value.scrollHeight,
      //   myref.value.offsetHeight
      // );
      /* setTimeout(
        () =>
          (myref.value.scrollTop =
            myref.value.scrollHeight - myref.value.offsetHeight),
        10
      ); */
      // console.log(myref.value.scrollTop,myref.value.scrollHeight)
    };

    function handleMessage(e) {
      state.msglist.push(JSON.parse(e.data));
      //当信息量多与屏幕长度时自动滑动
      setTimeout(
        () =>
          (myref.value.scrollTop =
            myref.value.scrollHeight - myref.value.offsetHeight),
        10
      );
    }
    function handlekeyup(e) {
      if (e && e.key === 13) {
        handlerSentBtnClcik();
      }
    }
    onMounted(() => {
      setHeight();
      if (!username) {
        router.push("/login");
      }
      // console.log(myref.value.scrollHeight)
      //查找滚动条的位置
      // const nowscrollHeight = myref.value.screenHeight
      // const nowscrollTop = myref.value.screenTop

      // console.log(myref.value.scrollTop)
      // setInterval(()=>myref.value.scrollTop=myref.value.scrollHeight,1000)
    });

    //监控屏幕高度
    const screenHeight = ref(0);
    const screenWidth = ref(0);

    const setHeight = () => {
      const nowheight = window.innerHeight;
      screenHeight.value = nowheight;
      const nowwidth = window.innerWidth;
      screenWidth.value = nowwidth;
    };

    const myref = ref(null);

    const tips = ref('显示历史消息')
    //获取历史信息 最多20条
    //不需要响应式
    const hismsgs = ref([]);

    const flag = ref(true)
    //控制点击事件发送的次数
    const fetchMsg = async () => {
      if(flag.value){
      const res = await proxy.$http.get("/msg");
      // console.log(res.data)
      // console.log((res.data))
      const length1 = res.data.length;
      const findata = res.data.slice(length1 - 15, length1);
      hismsgs.value = findata;
      // console.log(findata);
      // console.log(hismsgs.value)
      
      const hisdiv = document.querySelector('#historyMsgs')
      hisdiv.style.backgroundColor='rgb(104, 176, 173)'
      tips.value =''
      flag.value = false
      //将显示历史信息的div隐藏
      }
    };

    

    return {
      state,
      handlerSentBtnClcik,
      screenHeight,
      screenWidth,
      myref,
      handlekeyup,
      proxy,
      fetchMsg,
      hismsgs,
      tips,
      username
    };
  },
};
</script>


<style>
ul {
  margin: 0;
  padding: 0;
}
.main {
  max-width: auto;
  background: url("../assets/1.jpg") no-repeat center center fixed;
  background-size: cover;
}
.main .home {
  height: 100%;
  width: 100%;
}
#chatlist {
  overflow: auto;
}
#chatlist ul li div .context {
  background-color: whitesmoke;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.5rem;
  display: inline-block;
  width: auto;
  padding: 0 0.5rem;
}
.myself {
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  margin-right:2rem;
}
li {
  list-style: none;
}
#inputdiv input {
  height: 1.4rem;
  margin: 0 1rem;
  border: transparent;
  background-color: whitesmoke;
  border-radius: 0.5rem;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>