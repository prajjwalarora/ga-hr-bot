<template>
  <v-list-item class="chat-item mb-4 align-self-end" max-width="75%">
    <template #append>
      <v-avatar color="red" size="30"> @ </v-avatar>
    </template>
    <v-card :text="message"></v-card>
  </v-list-item>
</template>
<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style lang="scss">
.chat-item > .v-list-item__append {
  align-self: start !important;
}
</style>
