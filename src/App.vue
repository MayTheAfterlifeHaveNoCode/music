<template>
  <div id="app">
    <div class="loading" v-show="$parent.isShowLoading">
      <span class="refresh iconfont icon-luntai_xuanzhuan"></span>
    </div>
    <Play
      v-if="currentMusic"
      :currentMusic="currentMusic"
      :playlist="playlist"
      :LyricsGroup="LyricsGroup"
      :currentIndex="currentIndex"
      :PicturePath="PicturePath"
      :isShowimg="isShowimg"
      @update:paused="paused = $event"
      @update:music="
        currentMusic = $event.item;
        currentIndex = $event.index;
      "
    />

    <HomeNav v-if="$route.meta.isShowNav" />

    <keep-alive>
      <router-view
        @update:music="
          currentMusic = $event.item;
          currentIndex = $event.index;
        "
        @update:playlist="playlist = $event"
        :currentMusic="currentMusic"
        :paused="paused"
      />
    </keep-alive>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import Play from "@/components/Play.vue";
export default {
  components: {
    HomeNav,
    Play,
  },
  data: function () {
    return {
      currentMusic: null,
      paused: null,
      playlist: [],
      currentIndex: 0,
      LyricsGroup: [],
      PicturePath: "",
      isShowimg: false,
    };
  },
  watch: {
    currentMusic: function () {
      // console.log(this.currentMusic.id);
      this.axios.get("/lyric?id=" + this.currentMusic.id).then((response) => {
        this.LyricsGroup = this.paresLyric(response.data.lrc.lyric);
        // console.log(response.data.lrc.lyric);
      });
      this.$root.isShowimg = true;
      this.axios
        .get("/song/detail?ids=" + this.currentMusic.id)
        .then((response) => {
          // this.LyricsGroup = this.paresLyric(response.data.lrc.lyric);
          // console.log(response.data.songs[0].al.picUrl);
          this.PicturePath = response.data.songs[0].al.picUrl;
          this.$root.isShowimg = true;
        });
    },
  },
  methods: {
    paresLyric: function (lyric) {
      var patt = /\[\d{2}:\d{2}\.\d{0,3}\]/gi;
      var arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          return { time, text };
        });
      return arr;
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  --animation-duration: 300ms;
}

.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.15);
  .refresh {
    font-size: 30px;
    color: red;
    animation: loading 1s linear infinite;
  }
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
