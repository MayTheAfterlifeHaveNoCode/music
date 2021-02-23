<template >
  <div class="play-full-footer">
    <div class="progress">
      <input
        type="range"
        min="0"
        :max="duration"
        step="1"
        @input="getValue"
        :value="currentTime"
        class="inp"
      />
      <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
    </div>

    <div class="funct">
      <span class="iconfont icon-shangyishou1" @click="PlayPrevious"></span>
      <span @click="togglePlayState">
        <span class="iconfont icon-zantingtingzhi" v-if="!paused"></span>
        <span class="iconfont icon-bofang" v-else></span>
      </span>

      <span class="iconfont icon-xiayishou" @click.stop="playNext"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["currentTime", "duration", "paused" , "playNext" , "PlayPrevious" , "togglePlayState"],
  data: function () {
    return {};
  },
  methods: {
    getValue: function (e) {
      this.$emit("update:currentTime", e.target.value);
    },
  },
};
</script>
<style lang="less">
.play-full-footer {
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .funct {
    text-align: center;
    margin-top: 20px;
    span {
      margin: 0 20px;
      color: rgb(252, 248, 248);
    }
  }
  .progress {
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, lightblue, lightcoral);
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto;
    .inp {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      opacity: 0;
    }
    span{
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: rgb(30, 255, 0);
      border-radius: 3px;
    }
  }
}
</style>