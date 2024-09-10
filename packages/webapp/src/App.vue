<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row class="fill-height" align="start">
          <v-col cols="8" offset="2">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
