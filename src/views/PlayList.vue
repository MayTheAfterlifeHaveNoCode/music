<template>
  <div class="playlist">
    <div style="width: 100%; overflow: hidden">
      <div
        class="x-box"
        :style="{
          background: 'url(' + coverImg + ')',
        }"
      ></div>
      <div class="imgs">
        <div class="imgpi">
          <img :src="coverImg" />
          <span class="play-count">{{
            playCount | formatPlayCount
          }}</span>
        </div>
        <div class="songs">歌单</div>
        <div class="plhead_fr">
          <h1>{{ names }}</h1>
        </div>
      </div>
    </div>
    <div class="list">歌曲列表</div>
    <ul class="Piaul">
      <HotSong
        @update:music="$emit('update:music', $event)"
        @update:PicturePath="$emit('update:PicturePath', $event)"
        @update:playlist="$emit('update:playlist', SongListDetails)"
        v-for="(ind, index) in SongListDetails"
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
  components: {
    HotSong,
  },
  data() {
    return {
      SingleGroup: [],
      SongListDetails: [],
      coverImg: "",
      playCount:"",
      names:"",
    };
  },
  filters: {
    formatPlayCount: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  activated() {
    this.axios
      .get("/playlist/detail?id=" + this.$route.query.id)
      .then((response) => {
        // console.log(response.data.playlist);
        this.SingleGroup = response.data;
        this.coverImg = response.data.playlist.coverImgUrl
        this.playCount = response.data.playlist.playCount
        this.names = response.data.playlist.name
        this.axios 
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            // console.log(response.data.songs);
            this.SongListDetails = response.data.songs;
          })
          .finally(() => {
            // console.log(321);
            this.$root.isShowLoading = false;
          });
      })
      .finally(() => {
        // console.log(222);
        this.$root.isShowLoading = true;
      });
  },
};
</script>

<style lang="less">
.playlist {
  position: relative;
  .x-box {
    width: 100%;
    height: 174px;
    filter: blur(20px);
    &:after {
      content: " ";
      background-color: rgba(0, 0, 0, 0.25);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }
  .imgs {
    position: absolute;
    top: 10px;
    left: 5%;
    div {
      float: left;
      color: white;
      h1 {
        word-break: break-all;
      }
      img {
        width: 7.125rem;
        height: 7.125rem;
      }
    }
    .songs {
      width: 2.5rem;
      height: 1.0625rem;
      position: absolute;
      top: 5px;
      background: red;
      font-size: 12px;
      border-radius: 0 10px 10px 0;
      text-align: center;
    }
    .imgpi {
      position: relative;
      .play-count {
        position: absolute;
        top: 2px;
        right: 0;
        font-size: 12px;
        &::before {
          content: "";
          background: no-repeat
            url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
          background-position: left center;
          background-size: auto 100%;
          width: 1.2em;
          height: 0.9em;
          display: inline-block;
        }
      }
    }
    .plhead_fr {
      width: 10.5rem;
      height: 9rem;
      margin-left: 16px;
    }
  }
  .list {
    width: 100%;
    height: 23px;
    line-height: 23px;
    padding-left: 5px;
    background: #eeeff0;
    color: #666;
    font-size: 12px;
    z-index: 8;
  }
  .Piaul {
    width: 100%;
  }
}
</style>