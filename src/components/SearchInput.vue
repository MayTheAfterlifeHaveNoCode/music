<template>
  <div class="box">
    <SearchList 
       @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
    />
  </div>
</template>

<script>
import SearchList from "@/components/SearchList.vue";

export default {
  components: {
    SearchList,
  },

  
};
</script>

<style lang="less">
.box {
  width: 100%;
  
 
}
</style>