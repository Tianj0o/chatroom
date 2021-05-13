<template>
    <div v-if="music.type=='music'&&music.url!='null'" style="margin-bottom:0.5rem">
         <span style="margin-right: 0.4rem">{{ music.name }}</span>
              <i v-if="!(music.time.slice(0,4) == new Date().toLocaleString('chinese', { hour12: false }).slice(5,9))" style="font-size: 0.7rem">{{ music.time.slice(0,4) }}</i>
              <i style="font-size: 0.7rem">{{ music.time.slice(4) }}</i>
    </div>
  <div v-if="music.type=='music'&&music.url!='null'" style="display:flex;background-color:rgb(12 11 11 / 18%);border-radius:1rem;align-items:center;width:70%;">
      <div style="display:flex;align-items:center">
          <div style="height:4rem;width:4rem;">
          <img :src="music.img" style="height:4rem;border-radius:0.5rem">
          </div>
          <div style="position:relative">
          <span @click="playmusic" style="position:absolute;bottom:-1rem;left:-2.9rem;font-size:2rem" class="iconfont icon-zanting"></span>
          </div>
      </div>
      <div style="display:flex;flex-direction:column;margin-left:0.5rem;justify-content: space-around;color:white;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
          <p style="font-weight:500;margin-bottom:0.6rem;">{{music.musicname}}</p>
          <span>{{music.author}}</span>
      </div>
    <audio :id='`music${i}`' v-if="music.url!='null'" loop :src="music.url"></audio>
  </div>
</template>

<script>
import {toRefs} from 'vue'
export default {
    name:"music-msg",
    props:{
        music:Object,
        i:Number
    },
    setup(props,ctx){
        const {music,i} = toRefs(props)
        const playmusic = ()=>{
           const allmusic = document.querySelectorAll("audio");
           for(let r =0;r<allmusic.length;r++){
               
               if(allmusic[r].getAttribute('id')!=`music${i.value}`){
                   allmusic[r].load()
                   allmusic[r].pause()
               }
               
           }
           const music = document.querySelector(`#music${i.value}`);
           if(music.paused){
           music.play();
           }else {
               music.pause()
           }
        }

        return {
            music,
            playmusic,
            i
        }
    }
}
</script>

<style>

</style>