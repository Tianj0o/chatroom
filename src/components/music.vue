<template>>
  <ul>
      <li 
      v-for="(item,i) in items" :key="i"
      style="margin:0.2rem auto;"
      >
        <div style="display:flex;">
            <div>
                <img style="height:3rem;width:3rem" :src="item.imgurl">
            </div>
            <div style="display:flex;flex-direction:column;flex-grow:1">
                <span style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap">{{item.name}}</span>
                <span>{{item.author}}</span>
                </div>
            <audio  style="width:6rem;height:3rem;" controls :src="item.url"></audio>
            
        </div>
      </li>
  </ul>
</template>

<script>
import {computed,ref} from 'vue'
export default {
    name:'musicLists',
    props:{
        musiclist:Array
    },

    setup(props,ctx){
        

        const items= computed({
            get:()=>props.musiclist
        })

        // setInterval(()=>{console.log(items.value)},1000)
        
        return {
            items,
        }
    }


}
</script>

<style>

</style>