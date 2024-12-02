<template>
  <div>
    <ul>
      <template v-for="(item,index) in list" :key="item.id">
        <li>
          {{item.content}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  list:{
    type:Array,
    default:()=> []
  }
});
</script>

<style>

 
</style>
