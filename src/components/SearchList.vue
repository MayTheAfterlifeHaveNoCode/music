<template>
  <div class="sea">
    <div class="sou">
      <div class="inp">
        <span class="iconfont icon-fangdajing"></span>
        <input
          type="text"
          @input="inputing = true"
          @keyup.enter="inputing = false"
          class="text"
          v-model="something"
          placeholder="搜索歌曲、歌手、专辑"
        />
        <span class="inpde" v-if="something.length" @click="something = ''"
          >X</span
        >
      </div>
    </div>
    <div v-if="!inputing.length && !inputing && !something">
      <ul class="hottitl">
        <li class="hotso">热门搜索</li>
        <li
          v-for="(item, index) in Htadata"
          :key="index"
          class="titl"
          @click="
            something = item.first;
            record();
          "
        >
          <span>{{ item.first }}</span>
        </li>
      </ul>
      <ul>
        <li
          v-for="(item, index) in SearchEecords"
          :key="index"
          class="searchee"
        >
          <span class="record"></span>
          <span @click="something = item" class="spanit">{{ item}}</span>
          <span class="delete" @click="dele(index)">X</span>
        </li>
      </ul>
    </div>

    <ul class="list" v-if="inputing && suggests.length">
      <li class="suo">搜索“{{ something }}”</li>
      <li
        v-for="(item, index) in suggests"
        :key="index"
        @click="
          something = item.keyword;
          inputing = false;
          record();
        "
      >
        <span class="iconfont icon-fangdajing"></span>{{ item.keyword }}
      </li>
    </ul>

    <ul v-if="!inputing && something">
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', MatchingSearch)"
        v-for="(song, index) in MatchingSearch"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";

export default {
  components: {
    SongItem,
  },
  data: function () {
    return {
      Htadata: [],
      something: "",
      suggests: [],
      inputing: false,
      MatchingSearch: [],
      SearchEecords: [],
    };
  },
  created() {
    this.$root.isShowLoading = true;
    this.axios.get("/search/hot").then((response) => {
      this.Htadata = response.data.result.hots;
      this.$root.isShowLoading = false;
    });
  },
  methods: {
    record: function () {
      this.SearchEecords.push(this.something);
    },
    dele: function (e) {
      this.SearchEecords.splice(e, 1);
    },
  },
  watch: {
    something: function (n) {
      this.$root.isShowLoading = true;
      if (n) {
        // console.log(!this.inputing);
        // console.log(this.suggests.length);
        if (this.inputing) {
          this.axios
            .get("/search/suggest?keywords= " + this.something + "&type=mobile")
            .then((response) => {
              // console.log("123", response.data.result.allMatch);
              this.suggests = response.data.result.allMatch;
              this.$root.isShowLoading = false;
            });
          // console.log(66);
        } else {
          this.axios
            .get("/search?keywords=" + this.something)
            .then((response) => {
              // console.log("123", response.data.result.songs[0].album.artist.img1v1Url);
              // console.log(
              //   "123",
              //   response.data.result.songs[0].artists[0].img1v1Url
              // );
              this.MatchingSearch = response.data.result.songs;
              this.$root.isShowLoading = false;
            });
          // console.log(55);
        }
      } else {
        this.inputing = false;
        this.suggests = [];
        this.$root.isShowLoading = false;
      }
    },
  },
};
</script>

<style lang="less">
.sea {
  .list {
    margin-left: 20px;
    // height: 270px;
    // overflow: hidden;
    li {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #f1f1f1;
      span {
        color: #d7d8d8;
        margin-right: 5px;
      }
    }
  }
  .suo {
    color: rgb(4, 0, 255);
  }
  .hottitl {
    padding: 15px 0 0 15px;
    display: inline-block;
    .hotso {
      margin-bottom: 8px;
      font-size: 10px;
    }
    .titl {
      // float: left;
      display: inline-block;
      padding: 0 15px;
      border-radius: 15px;
      border: 1px solid #d3d4da;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
  .record {
    width: 15px;
    height: 15px;
    margin: 0 10px;
    display: inline-block;
    background-image: url("../assets/下载.svg");
  }
  .delete {
    float: right;
    margin-right: 10px;
    color: #d0d0d0;
  }
  .spanit{
    display: inline-block;
    width: 80%;
  }
  .sou {
    // position: relative;
    .inp {
      background-color: #ebecec;
      border-radius: 15px;
      margin: 15px 10px;
      padding: 0 10px;
      span {
        color: #b9b9b9;
        height: 25px;
        line-height: 25px;
      }
      .text {
        width: 90%;
        height: 25px;
        border: 0;
        outline: none;
        background-color: #ebecec;
      }
    }
  }
  .searchee {
    margin: 10px 0;
  }
}
</style>