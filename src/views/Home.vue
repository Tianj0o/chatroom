<template>
  <div
    class="main"
    :style="'height:' + screenHeight + 'px;' + 'width:' + screenWidth + 'px;'"
  >
    <div style="display: flex; justify-content: space-around;font-size:1rem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-new_file"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Vue"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-SEND"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-SEND"></use>
      </svg>
    </div>
    <div class="home" style="display: flex; flex-direction: column;">
      <div style="display: flex; align-items: center;justify-content:space-around">
        <div
          id="historyMsgs"
          class="historyMsgs"
          @click="fetchMsg"
          style="
            display: flex;
            justify-content: center;
            margin: 0.5rem 0;
            height: 2rem;
            align-items: center;
            
          "
        >
          <span style="">{{ tips }}</span>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 1.3rem; margin-left: 0.4rem"
          >
            <use xlink:href="#icon-lishijilu"></use>
          </svg>
        </div>
        <div @click="handleQQ">
          学习交流+
        </div>
        <div style=" display: flex; justify-content: center">
          <router-link to="/music" tag="div"><span>音乐</span> </router-link>

          <svg
            class="icon"
            style="font-size: 1.3rem; margin-left: 0.4rem"
            aria-hidden="true"
          >
            <use xlink:href="#icon-yinleyanzou"></use>
          </svg>
        </div>
      </div>
      <div
        ref="myref"
        id="chatlist"
        :style="'height:' + 0.82 * screenHeight + 'px;'"
      >
        <HisMsg :hismsgs="hismsgs"></HisMsg>
        <ul id="msglists" style="display: flex; flex-direction: column">
          <li
            v-for="(item, i) in state.msglist"
            :key="item._id"
            style="margin-left: 2rem; margin-bottom: 0.5rem"
            :class="item.name == username ? 'myself' : 'other'"
          >
            <MusicMsg :music="item" :i="i"></MusicMsg>
            <div v-if="item.type == 'msg'" style="margin: 0.5rem 0">
              <span style="margin-right: 0.4rem">{{ item.name }}</span>

              <i
                v-if="
                  !(
                    item.time.slice(0, 4) ==
                    new Date()
                      .toLocaleString('chinese', { hour12: false })
                      .slice(5, 9)
                  )
                "
                style="font-size: 0.7rem"
                >{{ item.time.slice(0, 4) }}</i
              >
              <i style="font-size: 0.7rem">{{ item.time.slice(4) }}</i>
            </div>
            <div
              v-if="item.type == 'msg'"
              style="max-width: 70%; display: flex"
            >
              <div
                class="context"
                style="word-wrap: break-word; word-break: break-all"
              >
                {{ item.msg }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div id="inputdiv" style="display: flex; margin-top: 0.5rem">
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
          <svg class="icon" aria-hidden="true" style="width: 1.5rem">
            <use xlink:href="#icon-SEND"></use>
          </svg>
        </button>
      </div>
      <div
        style="display: flex; flex-direction: row-reverse; margin-right: 1rem"
      >
        <div href="#" @click="willGo">
          <span class="iconfont icon-huaban88" style="font-size: 1.5rem"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket } from "../hooks";
import HisMsg from "../components/his-msg.vue";
import MusicMsg from "../components/musicmsg";
export default {
  name: "Home",
  components: {
    HisMsg,
    MusicMsg,
  },

  setup() {
    const state = reactive({
      msg: "",
      msglist: [],
    });
    const router = useRouter();
    let { proxy } = getCurrentInstance();
    const username = localStorage.getItem("username");

    const ws = useWebSocket(handleMessage);
    //将信息接受的事件传递给接受信息的组件

    const handlerSentBtnClcik = async () => {
      const nowtime = new Date()
        .toLocaleString("chinese", { hour12: false })
        .slice(5);
        if(state.msg.trim()==''){
          alert('你还没有输入内容噢')
          return
        }
      const data = {
        type: "msg",
        name: username,
        time: nowtime,
        msg: state.msg,
      };
      //前端的信息接口

      const res = await proxy.$http.post("/msg", data);
      //单独显示自己发出去的信息
      //太low了 还有bug 动态设置css啊！！！ tule
      ws.send(JSON.stringify(data));
      state.msg = "";
    };

      const willGo = ()=>{
        const r=confirm('将会跳转到源码页面')
        if(r==true){
          window.location='https://github.com/Tianj0o/websocket-vue'
        }
        else{
          return 
        }
      }
    function handleMessage(e) {
      // console.log(state.msglist);
      // console.log(e.data);
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
      initmsg();
      setHeight();
      if (!username) {
        router.push("/login");
      }
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

    const tips = ref("显示历史消息");
    //获取历史信息 最多20条
    //不需要响应式
    const hismsgs = ref([]);

    const flag = ref(3);
    //控制点击事件发送的次数 点击一次后就不能点击了

    //  初始化信息，进入页面就显示7条信息
    const initmsg = async () => {
      const res = await proxy.$http.get("/msg");
      const findata = res.data.slice(res.data.length - 7, res.data.length);
      state.msglist = findata;
    };

    //获取历史信息
    const fetchMsg = async () => {
      if (flag.value) {
        state.msglist = [];
        //先将信息列表清空 防止历史信息与发送的信息重合
        const res = await proxy.$http.get("/msg");
        // console.log(res.data)
        const length1 = res.data.length;
        const mid = 4 - flag.value;
        const findata = res.data.slice(length1 - 15 * mid, length1);
        hismsgs.value = findata;
        const hisdiv = document.querySelector("#historyMsgs");
        hisdiv.style.backgroundColor = "rgb(104, 176, 173)";
        if (flag.value === 1) {
          tips.value = "";
        }
        //显示历史消息后 将发送的信息清除
        //将显示历史信息的div隐藏
        flag.value--;
      }
    };
        const handleQQ = ()=>{
          alert('请加QQ2576099053')
        }
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
      username,
      initmsg,
      willGo,
      handleQQ
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
  height: auto;
  border-radius: 0.8rem;
  padding: 0.3rem 0.5rem;
  line-height: 1.6rem;
}
.myself {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 2rem;
}
.other {
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
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
a {
  text-decoration: none;
}
</style>