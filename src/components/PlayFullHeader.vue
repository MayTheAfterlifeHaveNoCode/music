<template>
  <div @click="$emit('show-play-bar')" class="return">
    <span class="iconfont icon-fanhui"></span>
    <span class="goback">返回</span>
    <h5 class="name">
      {{currentMusic.name}} ——
     <span v-if="currentMusic.ar"
            ><span v-for="(artist, index) in currentMusic.ar" :key="index">
              <template v-if="index"> / </template>{{ artist.name }}
            </span></span
          >
          <span v-if="currentMusic.alg"
            ><span
              v-for="(artist, index) in currentMusic.song.artists"
              :key="index"
            >
              <template v-if="index"> / </template>{{ artist.name }}
            </span></span
          >
          <span v-else>
            <span v-for="(artist, index) in currentMusic.artists" :key="index">
              <template v-if="index"> / </template>{{ artist.name }}
            </span>
          </span>
    </h5>
  </div>
</template>


<script>
export default {
  props: ["currentMusic"],
};
</script>

<style lang="less">
.return {
  margin: 10px 0;
  .goback,.iconfont {
    color: white;
    margin-left: 10px;
  }
  h5{
    padding-left: 35px;
  }
  .name {
    color: white;
    font-size: 12px;
  }
}
</style>