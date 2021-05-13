<template>
     <ul  style="display: flex; flex-direction: column;">
          <li :class="item.name==username ? 'myself':'other'" v-for="(item,i) in newhismsgs" :key="i" style="margin-left:2rem;margin-bottom:0.5rem">
            <MusicMsg :music='item' :i='i'></MusicMsg>
            <div v-if="item.type=='msg'" style="margin: 0.5rem 0">
              <span style="margin-right:0.4rem;font-size:1.2rem;">{{ item.name }}</span>

              <!-- <i style="font-size: 0.7rem">{{ item.time }}</i> -->
              <i v-if="!(item.time.slice(0,4) == new Date().toLocaleString('chinese', { hour12: false }).slice(5,9))" style="font-size: 0.7rem">{{ item.time.slice(0,4) }}</i>
              <i style="font-size: 0.7rem">{{ item.time.slice(4) }}</i>
            </div>
            <div v-if="item.type=='msg'" style="max-width:70%;display:flex">
              <div class="context" style="word-wrap: break-word; word-break: break-all;">{{ item.msg }}</div>
            </div>
          </li>
        </ul>
</template>
<script>
import {computed} from 'vue'
import MusicMsg from './musicmsg'
export default({
    name:'his-msg',
    props:{
        hismsgs:Array,
    },
    components:{
      MusicMsg
    },
    setup(props,ctx) {
        // console.log(hismsgs);

        const newhismsgs = computed({
            get:()=>props.hismsgs
        })
        const username=localStorage.getItem('username')
        
        return {
            newhismsgs,
            username
        }
    },
})
</script>
