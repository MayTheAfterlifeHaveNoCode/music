<template>
  <div class="playly">
    <div class="toggle" @click="$emit('toggle-show-lyric')">
      <ul
        class="lyric"
        ref="lyric"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      >
        <li v-for="(item, index) in LyricsGroup" :key="index">
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="colors">
        <div class="red" @click="LyricsColor = 'red'"></div>
        <div class="blue" @click="LyricsColor = 'blue'"></div>
        <div class="yellow" @click="LyricsColor = 'yellow'"></div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["currentTime", "audio", "currentMusic", "LyricsGroup"],
  data: function () {
    return {
      str: null,
      arrLyric: [],
      scrollY: 0,
      touching: false,
      LyricsColor:"red"
    };
  },
  mounted() {
    this.str = this.LyricsGroup;
  },
  updated() {},
  watch: {
    LyricsGroup: function (n) {
      this.str = n;
    },
    scrollY: function (n) {
      let Lyric = this.$refs.lyric;
      // console.log(Lyric);
      var currentTime = this.currentTime;
      this.i = this.str.findIndex((element) => {
        return element.time > currentTime;
      });
      Lyric.style.marginTop = -30 * (this.i - 1 + n) + 250 + "px";
      // console.log(Lyric.style.marginTop);
      var lis = Lyric.querySelectorAll("li");
      for (let k = 0; k < lis.length; k++) {
        lis[k].style.color = "white";
        // console.log(lis[k]);
      }
      if (lis[this.i - 1 + n]) {
        lis[this.i - 1 + n].style.color = this.LyricsColor;
      }
    },
    currentTime: function () {
      let Lyric = this.$refs.lyric;
      // console.log(Lyric);
      if (Lyric) {
        this.str = this.LyricsGroup;
        var newArr = [...this.str];

        let that = this;
        this.audio.ontimeupdate = function () {
          if (!that.touching) {
            // console.log(123);
            var currentTime = this.currentTime;
            var i = newArr.findIndex((element) => {
              return element.time > currentTime;
            });
            Lyric.style.marginTop = -30 * (i - 1) + 250 + "px";
            var lis = Lyric.querySelectorAll("li");
            for (let k = 0; k < lis.length; k++) {
              lis[k].style.color = " white";
            }
            if (lis[i - 1]) {
              lis[i - 1].style.color = that.LyricsColor;
            }
          }
        };
      }
    },
  },
  methods: {
    touchstart: function (e) {
      this.touching = true;
      this.y = e.touches[0].clientY;
    },
    touchmove: function (e) {
      this.scrollY = Math.floor((this.y - e.touches[0].clientY) / 30);
      console.log(this.scrollY);
    },
    touchend: function () {
      // console.log(this.LyricsGroup[this.i - 1 + this.scrollY]);
      this.touching = false;
      // console.log(this.i - 1 + this.scrollY);
      let ct = this.LyricsGroup[this.i - 1 + this.scrollY].time;
      // console.log(ct);
      this.audio.currentTime = ct;
    },
  },
};
</script>

<style lang="less">
.playly {
  height: 70%;
  overflow: hidden;
  color: white;
  text-align: center;
  .toggle{
    height: 100%;
  }
  .lyrc {
    height: 100%;

    li {
      margin: 10px;
    }
  }
  .colors{
    position: absolute;
    bottom: 165px;
    right: 0px;
    .red{
      width: 20px;
      height: 20px;
      background: red;
    }
     .blue{
      width: 20px;
      height: 20px;
      background: blue;
    }
     .yellow{
      width: 20px;
      height: 20px;
      background: yellow;
    }
  }
}
</style>