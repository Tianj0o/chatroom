<template>
  <div id="musiclist" style="margin-top: 1rem;height:70%;">
    <ul>
      <li
        v-for="(item, i) in musiclists"
        :key="i"
        style="display: flex; height: 3.5rem; margin-bottom: 1rem"
        
      >
        <img style="margin-left: 1.5rem;width:3.5rem" :src="item.img" alt="" />
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 1.5rem;
            width: 45%;
          "
        >
          <h4 style="margin-bottom: 0.5rem">{{ item.name }}</h4>
          <p>{{ item.author }}</p>
        </div>
        <div
          style="
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 1rem;
          "
        >
          <audio  loop="true" :id="`music${i}`" v-if="item.url!='null'" :src="item.url"></audio>
          
          <span v-if="item.url!='null'"
            :id="`icon${i}`"
            class="iconfont icon-zanting iconxxx"
            style="font-size: 2rem"
            @click="playmusic(i,item)"
          ></span>
          <span v-if="item.url!='null'" class="iconfont icon-fenxiang" @click="sharemusic(item)" style="font-size: 1.5rem;margin-left: 0.5rem;"></span>
        </div>
      </li>
    </ul>
    
  </div>
  <div style="display:flex;justify-content:center;align-items;center;">
      <div style="background-color:#dd6464;height:2.5rem;width:96%;display:flex;align-items:center;border-radius:1rem;">
        
        <div v-if="state.section" id="currentime" :style="'width:'+state.section"></div>
      
        <span class="iconfont icon-fasong" style="font-size:1.5rem;margin-left:0.5rem"></span>
      </div>
    </div>
</template>

<script>
import { toRefs, onMounted, ref, watch, reactive,getCurrentInstance, watchEffect } from "vue";
import {useWebSocket} from '../hooks';
export default {
  name: "musiclist",
  props: {
    musiclists: Array,
  },
  setup(props, ctx) {
    const { musiclists } = toRefs(props);
    // console.log(musiclists.value);
    const state = reactive({
      musictime:String,
      currenttime:String,
      section:String,
      
    })
    let { proxy } = getCurrentInstance();
    //根据索引的值播放音乐
    const playmusic = (i,item) => {
      const allmusic = document.querySelectorAll("audio");
      const allicon = document.querySelectorAll(".iconxxx");
      const currentmusic = document.querySelector(`#music${i}`);
      const currenticon = document.querySelector(`#icon${i}`);
      state.musictime =parseInt(currentmusic.duration/60)+':'+parseInt(currentmusic.duration%60);

      currentmusic.addEventListener('timeupdate',()=>{
        state.currenttime = currentmusic.currentTime;
        state.section = (currentmusic.currentTime/currentmusic.duration*100)*0.87+"%"
      })
      for (let n = 0; n < allmusic.length; n++) {
        if (n !== i) {
          allmusic[n].load();
          allmusic[n].pause();
          allicon[n].classList.remove("icon-zanting1");
          allicon[n].classList.add("icon-zanting");
        }
      }
      console.log(currentmusic.paused);
      if (currentmusic.paused) {
        currentmusic.play();
        console.log("play");
        currenticon.classList.remove("icon-zanting");
        currenticon.classList.add("icon-zanting1");
      } else {
        currentmusic.pause();
        currenticon.classList.remove("icon-zanting1");
        currenticon.classList.add("icon-zanting");
        console.log("zant");
      }
    };

    const ws =  useWebSocket(handlemsg);
    function handlemsg(e){
        console.log(e.data)
    }
    //分享音乐
    const sharemusic = async (item) =>{
      const data = {
        name:localStorage.getItem('username'),
        time:new Date().toLocaleString('chinese', { hour12: false }).slice(5),
        musicname:item.name,
        author:item.author,
        img:item.img,
        url:item.url,
        type:'music',
      }
      
     const res = await proxy.$http.post('/msg',data)
     const res2= await proxy.$http.post('/musiclists',data)
      alert('分享成功')
      ws.send(JSON.stringify(data))
      
    }

    watch(musiclists, (newcount, oldcount) => {
      const allicon = document.querySelectorAll('.iconxxx')
      allicon.forEach((item)=>{
        item.classList.remove('icon-zanting1')
        item.classList.add('icon-zanting')
      })
    });
    // watchEffect(()=>{
    //   console.log(musiclists.value);
    //   const allicon = document.querySelectorAll('.iconxxx')
    //   allicon.forEach((item)=>{
    //     item.classList.remove('icon-zanting1')
    //     item.classList.add('icon-zanting')
    //   })
    // })
    return {
      musiclists,
      playmusic,
      state,
      sharemusic,
    };
  },
};
</script>

<style>
h4,
p {
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#currentime {
  background-color:#03f4b8;
  height: 1.9rem;
  border-radius:0.8rem;
}
</style>