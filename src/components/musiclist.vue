<template>
  <div id="musiclist" style="margin-top: 1rem">
    <ul>
      <li
        v-for="(item, i) in musiclists"
        :key="i"
        style="display: flex; height: 4rem; margin-bottom: 1rem"
      >
        <img style="margin-left: 1.5rem;width:4rem" :src="item.img" alt="" />
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 1.5rem;
            width: 50%;
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
          <audio loop="true" :id="`music${i}`" :src="item.url"></audio>
          <span
            :id="`icon${i}`"
            class="iconfont icon-zanting iconxxx"
            style="font-size: 2rem"
            @click="playmusic(i)"
          ></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs, onMounted, ref, watch } from "vue";
export default {
  name: "musiclist",
  props: {
    musiclists: Array,
  },
  setup(props, ctx) {
    const { musiclists } = toRefs(props);
    // console.log(musiclists.value);

    const playmusic = (i) => {
      const allmusic = document.querySelectorAll("audio");
      const allicon = document.querySelectorAll(".iconxxx");
      const currentmusic = document.querySelector(`#music${i}`);
      const currenticon = document.querySelector(`#icon${i}`);

      for (let n = 0; n < allmusic.length; n++) {
        if (n !== i) {
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

    watch(musiclists, (newcount, oldcount) => {
      const allicon = document.querySelectorAll('.iconxxx')
      allicon.forEach((item)=>{
        item.classList.remove('icon-zanting1')
        item.classList.add('icon-zanting')
      })
    });
    return {
      musiclists,
      playmusic,
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
</style>