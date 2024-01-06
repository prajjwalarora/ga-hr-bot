<template>
  <v-list-item class="chat-item mb-4 align-self-start" max-width="75%">
    <template #prepend>
      <v-avatar size="30">
        <v-img src="/images/logo.svg" />
      </v-avatar>
    </template>
    <v-card text="How i can help you today?"></v-card>
    <v-container fluid v-if="adminPage">
      <v-row align="center" justify="center">
        <v-col cols="auto" class="px-0 mr-4">
          <v-btn @click="$emit('queryType', 'normal')">
            <v-icon left class="mr-2"> mdi-database-search </v-icon>
            Normal Query
          </v-btn>
        </v-col>
        <v-col cols="auto" class="px-0">
          <v-btn @click="$emit('queryType', 'operation')">
            <v-icon left class="mr-2">mdi-shield-crown</v-icon>
            Admin Operations
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps<{
  adminPage?: Boolean;
}>();
defineEmits(["queryType"]);
</script>

<style lang="scss">
.chat-item .v-list-item__prepend {
  align-self: start;
}
</style>
