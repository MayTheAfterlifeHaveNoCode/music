<template>
  <li
    class="song-item"
    @click="
      $emit('update:music', { item, index });
      $emit('update:playlist');
    "
  >
    <div class="info">
      <h5>{{ item.name }}</h5>
      <p style="font-size: 13px" v-if="item.alg">
        <span v-for="(artist, index) in item.song.artists" :key="index">
          <template v-if="index"> / </template>{{ artist.name }}
        </span>
      </p>
      <p style="font-size: 13px" v-else>
        <span v-for="(artist, index) in item.artists" :key="index">
          <template v-if="index"> / </template>{{ artist.name }}
        </span>
      </p>
    </div>
    <div class="icon">
      <span
        class="playing"
        :class="{ paused: paused }"
        v-if="currentMusic && currentMusic.id === item.id"
      >
        <i></i>
        <i></i>
        <i></i>
      </span>
      <span v-else class="iconfont icon-music-play backloco"></span>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "index", "paused", "currentMusic"],
};
</script>

<style lang="less">
li.song-item {
  margin: 10px;
  display: flex;
  // padding-left: 10px;
  .info {
    flex: 1;
    p {
      color: #888;
    }
  }
  .icon {
    position: relative;
    width: 20px;
    height: 30px;
    .icon-music-play {
      font-size: 20px;
      position: absolute;
      top: 25%;
      left: 0;
    }
    .playing {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      i {
        width: 2px;
        height: 30px;
        background: red;
        // display: inline-block;
        transform-origin: center bottom;

        animation: playing 0.6s linear -0.2s infinite alternate-reverse;

        &:first-of-type {
          animation-delay: 0s;
          background: rgb(62, 236, 106);
        }
        &:last-of-type {
          animation-delay: -0.4s;
          background: rgb(44, 91, 244);
        }
      }
      &.paused {
        i {
          animation-play-state: paused;
        }
      }
    }
  }
}

@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>