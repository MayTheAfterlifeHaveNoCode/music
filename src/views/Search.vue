<template>
  <div class="search">
    <SearchInput
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:playlist', $event)"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
    />
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
export default {
  components: {
    SearchInput,
  },
};
</script>

<style>
</style>