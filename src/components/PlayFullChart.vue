<template>
  <div
    @click="$emit('toggle-show-lyric')"
    class="chart"
    :class="{ paused: paused }"
  >
    <img :src="PicturePath" class="imgd" />
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "paused", "PicturePath"],
};
</script>

<style lang = "less">
.chart {
  width: 100%;
  height: 100%;
  position: relative;
  &.paused {
    img {
      animation-play-state: paused;
    }
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-left: -100px;
    position: absolute;
    left: 50%;
    top: 15%;
    animation: identifier 15s linear infinite;
  }
}

@keyframes identifier {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>