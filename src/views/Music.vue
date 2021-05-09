<template>
  <div
    id="music"
    :style="'height:' + screenHeight + 'px;' + 'width:' + screenWidth + 'px;'"
  >
    <form @submit.prevent="postMusicName">
      <div
        style="
          height: 4rem;
          width: 100%;
          background-color: #ef4c05;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            width: 90%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
          "
        >
          <input
            type="text"
            v-model="musicname.name"
            style="
              outline: none;
              height: 2.5rem;
              width: 60%;
              padding-left: 4%;
              border: none;
              font-size: 1.3rem;
              color: #ef4c05;
            "
          />
          <button
            type="submit"
            style="
              height: 2rem;
              width: 20%;
              border: none;
              background-color: white;
            "
          >
            <svg class="icon" aria-hidden="true" style="font-size: 2rem">
              <use xlink:href="#icon-SEND"></use>
            </svg>
          </button>
        </div>
      </div>
    </form>
    <div>
      <div style="display:flex;justify-content:space-between;width:90%;height:4rem;align-items:center;border-bottom:1px solid grey;margin:0 auto;">
      <p style="font-size:1.2rem;margin-left:2rem">{{state.navname}}</p> 
      <svg class="icon" aria-hidden="true" style="font-size: 2rem;margin-right:2rem;">
        <use
          xlink:href="#icon-yinleyanzou"
        ></use>
      </svg>
      </div>
      <musiclist :musiclists="state.musiclist"></musiclist>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref, reactive, onMounted } from "vue";
import musiclist from "../components/musiclist";
export default {
  name: "Music",
  components: {
    musiclist,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    //post将歌曲名发给后端
    const musicname = ref({});
    const postMusicName = async () => {
      const data = await proxy.$http.post("/musicname", musicname.value);
      console.log(data.data);
      await fetchmusic();
      state.navname='歌曲'
    };

    //获取音乐列表
    const state = reactive({
      musiclist: [],
      navname:'每日推荐',
    });
    const fetchmusic = async () => {
      const data = await proxy.$http.get("/musiclist");
      console.log(data.data);

      state.musiclist = data.data;
      console.log(state.musiclist);
    };

    const screenHeight = ref(0);
    const screenWidth = ref(0);

    const setHeight = () => {
      const nowheight = window.innerHeight;
      screenHeight.value = nowheight;
      const nowwidth = window.innerWidth;
      screenWidth.value = nowwidth;
    };

    const fetchMusicrec =  async()=>{
      const data = await proxy.$http.get('/musicrec')
      state.musiclist = data.data
    }
    onMounted(() => {
      setHeight();
      fetchMusicrec()
    });
    return {
      musicname,
      postMusicName,
      state,
      screenHeight,
      screenWidth,
      fetchMusicrec,
    };
  },
};
</script>

<style>
#music {
  background: url("../assets/4.jpg") no-repeat center center fixed;
  background-size: cover;
}
input,
button {
  margin: 0;
  padding: 0;
}
</style>