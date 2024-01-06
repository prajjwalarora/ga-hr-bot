<template>
  <v-main>
    <v-divider />

    <v-list
      height="100%"
      width="100%"
      bg-color="transparent"
      class="px-4 d-flex flex-column justify-end"
    >
      <template v-for="chat in chatHistory">
        <MessageGreetings
          v-if="chat.type === 'greetings'"
          :adminPage="!queryType"
          @query-type="handleQueryType"
        />
        <MessageSent
          v-else-if="chat.type === 'sent'"
          :message="chat.text || ''"
        />
        <MessageReceive
          v-else-if="chat.type === 'received'"
          :message="chat.isProcessing ? 'Searching...' : chat.text || ''"
        />
      </template>
    </v-list>
  </v-main>

  <v-navigation-drawer location="right">
    <v-divider />
    <!-- <v-list>
        <v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link>
        </v-list-item>
      </v-list> -->
  </v-navigation-drawer>

  <v-footer app height="72">
    <v-form
      style="width: 100%"
      class="d-flex"
      @submit.prevent="querySentHandler"
      :disabled="
        !queryType || !!(chatHistory.at(-1) && chatHistory.at(-1)?.isProcessing)
      "
    >
      <v-text-field
        v-model.trim="query"
        label="Ask anything..."
        bg-color="grey-lighten-3"
        class="rounded-pill overflow-hidden mr-2"
        density="compact"
        hide-details
        single-line
        flat
        variant="solo"
      />
      <v-btn
        type="submit"
        icon="mdi-send"
        width="100"
        rounded="pill"
        variant="flat"
        color="red"
        size="small"
        :disabled="query.length === 0"
      ></v-btn>
    </v-form>
  </v-footer>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
const config = useRuntimeConfig();

interface IChat {
  type: "sent" | "received" | "greetings";
  text: string | null;
  isProcessing: Boolean;
}
const chatHistory = reactive<IChat[]>([]);

const query = ref("");
const queryType = ref<null | "normal" | "operation">(null);

onMounted(() => {
  setTimeout(() => {
    chatHistory.push({
      type: "greetings",
      isProcessing: false,
      text: "",
    });
  }, 500);
});

const handleQueryType = (val: any) => {
  queryType.value = val;
  chatHistory.push({
    type: "received",
    isProcessing: false,
    text: `Enter below for ${val} query`,
  });
};

const querySentHandler = async () => {
  if (!queryType) return;
  chatHistory.push({ type: "sent", text: query.value, isProcessing: false });
  const reqBody = { query: query.value };
  query.value = "";
  chatHistory.push({ type: "received", text: null, isProcessing: true });
  const resp = await $fetch<{ output: string; message: string }>(
    `${config.public.backendUrl}/${
      queryType.value === "normal" ? "dbread" : "db"
    }`,
    {
      method: "POST",
      body:
        queryType.value === "normal"
          ? { query: `${reqBody.query}. use reference table.` }
          : reqBody,
    }
  );
  chatHistory[chatHistory.length - 1] = {
    type: "received",
    isProcessing: false,
    text: queryType.value === "normal" ? resp.message : resp.output,
  };
};
</script>
