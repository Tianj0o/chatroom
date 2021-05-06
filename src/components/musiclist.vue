<template>
  <div id="musiclist">
    <p>子组件列表</p>
    <ul>
      <li
        v-for="(item, i) in musiclists"
        :key="i"
        style="display: flex; height: 4rem; margin-bottom: 1rem"
      >
        <img style="margin-left: 1.5rem" :src="item.img" alt="" />
        <div style="display: flex; flex-direction: column; margin-left: 1.5rem">
          <h4 style="margin-bottom: 0.5rem">{{ item.name }}</h4>
          <p>{{ item.author }}</p>
        </div>
        <div>
          <audio :src="item.url"></audio>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs } from "vue";
export default {
  name: "musiclist",
  props: {
    musiclists: Array,
  },
  setup(props, ctx) {
    const { musiclists } = toRefs(props);
    console.log(musiclists.value);
    console.log("1");
    return {
      musiclists,
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