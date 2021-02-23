<template>
  <li
    class="Hotli"
    @click="
      $emit('update:music', { item, index });
      $emit('update:playlist');
      $emit('update:PicturePath', item.al.picUrl);
    "
  >
    <span class="sort" :style="{color:index > 2 ? '' : 'red'}">{{ index > 8 ? index + 1 : "0" + (index + 1) }}</span>
    <span class="SongTitle">{{ item.name }}</span>
    <h6>{{ item.ar[0].name }}--{{ item.al.name }}</h6>
    <span class="Icon">
      <span class="iconfont icon-zantingtingzhi" v-if="currentMusic && currentMusic.id === item.id &&!paused"></span>
      <span class="iconfont icon-music-play" v-else></span>
    </span>
  </li>
</template>

<script>
export default {
  props: ["HotSongTitle", "paused", "item", "index" , "currentMusic"],
  methods: {
  
  },
};
</script>

<style lang="less">
.Hotli {
  margin: 15px 15px 0px 5px;
  position: relative;
  .sort {
    margin-right: 5px;
    color: rgb(175, 175, 175);
  }
  .SongTitle {
    font-size: 17px;
  }
  h6 {
    font-size: 12px;
    color: #888;
    margin-left: 24px;
  }
  .Icon {
    position: absolute;
    top: 30%;
    right: 0;
  }
}
</style>