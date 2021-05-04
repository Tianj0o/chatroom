<template>
     <ul  style="display: flex; flex-direction: column;">
          <li :class="item.name==username ? 'myself':'other'" v-for="(item,i) in newhismsgs" :key="i" style="margin-left:2rem;margin-bottom:0.5rem">
            <div style="margin: 0.5rem 0">
              <span style="margin-right:0.4rem;">{{ item.name }}</span>

              <i style="font-size: 0.7rem">{{ item.time }}</i>
            </div>
            <div>
              <span class="context">{{ item.msg }}</span>
            </div>
          </li>
        </ul>
</template>
<script>
import {computed} from 'vue'
export default({
    name:'his-msg',
    props:{
        hismsgs:Array,
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
