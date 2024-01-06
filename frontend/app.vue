<template>
  <v-app>
    <v-app-bar class="px-3" color="grey-darken-4" flat height="72">
      <v-sheet
        color="grey-darken-5"
        height="72"
        width="100%"
        class="d-flex align-center"
      >
        <v-avatar class="d-block text-center mr-2" size="36">
          <v-img src="/images/logo.svg" />
        </v-avatar>
        <h1>HR-Bot</h1>
      </v-sheet>
    </v-app-bar>
    <v-navigation-drawer width="244">
      <v-divider />
      <v-list class="pr-2" tag="nav">
        <v-list-item
          active-color="red"
          v-for="(type, index) in [
            // { text: 'Leaves Query', icon: 'mdi-box' },
            {
              text: 'Policies Query',
              icon: 'mdi-text-box-search-outline',
              link: '/',
            },
            {
              text: 'Administrative Tasks',
              icon: 'mdi-account-supervisor-circle',
              link: '/administrative',
            },
          ]"
          :key="index"
          :title="type.text"
          :prepend-icon="type.icon"
          :to="type.link"
          exact
          rounded="e-xl"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
