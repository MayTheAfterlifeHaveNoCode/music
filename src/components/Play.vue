<template>
  <div class="play" :class="{ paused: paused }">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      autoplay
      ref="audio"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div
        class="play-bar"
        v-show="isShowPlayBar"
        @click="isShowPlayBar = false"
      >
        <div class="load" v-show="$parent.isShowimg">
          <span class="ref iconfont icon-luntai_xuanzhuan"></span>
        </div>
        <div class="imgd" :class="{paused:paused}">
          <img :src="PicturePath" class="imgs"/>
        </div>
        <h5 class="name">
          {{ currentMusic.name }}
          <br />
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
        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"> </canvas>
          <span class="iconfont icon-zantingtingzhi" v-if="!paused"></span>
          <span class="iconfont icon-bofang" v-else></span>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-if="!isShowPlayBar">
        <PlayFullHeader
          @show-play-bar="isShowPlayBar = true"
          v-bind:currentMusic="currentMusic"
        />
        <template>
          <PlayFullLyric
            v-if="isShowLyric"
            :currentMusic="currentMusic"
            :LyricsGroup="LyricsGroup"
            :audio="this.$refs.audio"
            :currentTime="currentTime"
            @toggle-show-lyric="isShowLyric = !isShowLyric"
          />
          <PlayFullChart
            v-else
            :currentMusic="currentMusic"
            :paused="paused"
            :PicturePath="PicturePath"
            @toggle-show-lyric="isShowLyric = !isShowLyric"
          />
        </template>
        <PlayFullFooter
          :currentTime="currentTime"
          :duration="duration"
          :paused="paused"
          :playNext="playNext"
          :PlayPrevious="PlayPrevious"
          :togglePlayState="togglePlayState"
          @update:currentTime="$refs.audio.currentTime = $event"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHeader from "@/components/PlayFullHeader.vue";
import PlayFullChart from "@/components/PlayFullChart.vue";
import PlayFullLyric from "@/components/PlayFullLyric.vue";
import PlayFullFooter from "@/components/PlayFullFooter.vue";

export default {
  props: [
    "currentMusic",
    "item",
    "playlist",
    "currentIndex",
    "LyricsGroup",
    "PicturePath",
    "isShowimg",
  ],
  components: {
    PlayFullHeader,
    PlayFullChart,
    PlayFullLyric,
    PlayFullFooter,
  },
  data: function () {
    return {
      paused: null,
      duration: 0,
      currentTime: 0,
      isShowLyric: false,
      isShowPlayBar: true,

      Pic: "",
    };
  },
  // watch()  {

  // },
  mounted() {
    // console.log("mountde", this.$refs.audio);
    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      // console.log(this.paused);
      this.paused = true;
    });
    audio.addEventListener("play", () => {
      // console.log("播放");s
      this.paused = false;
    });
    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
    });
    audio.addEventListener("paused", () => {
      this.paused = audio.paused;
    });
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      this.drawCircle(this.currentTime, this.duration);
    });

    audio.addEventListener("ended", () => {
      // console.log(321);
      this.playNext();
    });
  },

  methods: {
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      ctx.arc(
        25,
        25,
        19,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      );
      ctx.stroke();
      ctx.closePath();
    },
    // foo:function (){

    // },

    togglePlayState: function () {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },

    calculateNext: function () {
      // console.log(this.currentIndex);
      let nextIndex;
      if (this.currentIndex < this.playlist.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }

      return nextIndex;
    },

    playNext: function () {
      // console.log("下");
      let index = this.calculateNext();
      // console.log(index);
      this.$emit("update:music", {
        item: this.playlist[(index, index)],
        index,
      });
    },

    CalculateLast: function () {
      let nextInde;
      // console.log("", this.currentIndex);
      if (this.currentIndex > 0) {
        nextInde = this.currentIndex - 1;
      } else {
        nextInde = this.playlist.length - 1;
      }
      return nextInde;
    },

    PlayPrevious: function () {
      let index = this.CalculateLast();
      // console.log(index);
      this.$emit("update:music", {
        item: this.playlist[(index, index)],
        index,
      });
    },
  },

  watch: {
    paused: function (n) {
      this.$emit("update:paused", n);
    },
  },
};
</script>

<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      .imgd {
        animation-play-state: paused;
      }
    }
  }
}
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: white;
  display: flex;
  width: 100%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  .name {
    flex: 1;
    span {
      font-size: 12px;
    }
  }

  .imgd {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
    overflow: hidden;
    animation: playing 6s linear infinite;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  }
  .imgs{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  h5 {
    flex: 1;
    overflow: hidden;
  }
  .control {
    position: relative;
    span {
      position: absolute;
      width: 100%;
      height: 100%;
      margin-top: -20%;
      margin-left: -15%;
      top: 50%;
      left: 50%;
    }
  }
}
.play-full {
  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
}

@keyframes playing {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.load {
  width: 40px;
  border-radius: 50%;
  height: 40px;
  position: fixed;
  left: 5px;
  bottom: 9px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.15);
  .ref {
    font-size: 30px;
    color: red;
    animation: loa 1s linear infinite;
  }
}

@keyframes loa {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>