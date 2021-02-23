<template>
  <div class="search" style="margin-top:2px">
    
    <div class="back">
      <div class="cover">
        <div class="CloudMusic"></div>
        <div class="time">更新日期：{{ nowDate }}</div>
      </div>
    </div>

    <ul class="hots">
      <HotSong
        @update:music="$emit('update:music', $event)"
        @update:PicturePath="$emit('update:PicturePath', $event)"
        @update:playlist="$emit('update:playlist', HotSongTitle)"
        v-for="(ind, index) in HotSongTitle"
        :key="ind.id"
        :index="index"
        :item="ind"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </div>
</template>

<script>
import HotSong from "@/components/HotSong.vue";
export default {
  props: [],
  components: {
    HotSong,
  },
  data: function () {
    return {
      HotSongTitle: [],
      nowDate: "",
    };
  },
  created() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.nowDate = `${month}月${day}日`;
    // console.log("Hot created");
    this.$root.isShowLoading = true;


    this.axios
      .get("/top/list?idx=1")
      .then((response) => {
        this.$root.isShowLoading = true;
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            // console.log(response.data.songs,'125444984');
            this.HotSongTitle = response.data.songs;
          })
          .finally(() => {
            this.$root.isShowLoading = false;
          });
      })
      .finally(() => {
        this.$root.isShowLoading = false;
      });
  },
};
</script>

<style lang="less">
.back {
  position: relative;
  padding: 19.9%;
  background: url("../assets/Netease.jpg") no-repeat;
  background-size: contain;
  overflow: hidden;
  .cover {
    position: absolute;
    top: 20%;
    left: 10%;
    .CloudMusic {
      background: url("../assets/NeteaseMusic.png") no-repeat -27px 0;
      width: 196px;
      height: 56px;
    }
    .time {
      color: white;
    }
  }
}
.hots {
  margin-bottom: 60px;
}
</style>