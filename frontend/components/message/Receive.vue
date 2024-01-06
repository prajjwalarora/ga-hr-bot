<template>
  <v-list-item class="chat-item mb-4 align-self-start" max-width="75%">
    <template #prepend>
      <v-avatar size="30">
        <v-img src="/images/logo.svg" />
      </v-avatar>
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
.chat-item .v-list-item__prepend {
  align-self: start;
}
</style>
