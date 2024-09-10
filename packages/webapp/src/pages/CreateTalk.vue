<script lang="ts" setup>
import { ref } from 'vue';
import { Talk } from 'shared/types/talk';
import TalkEditor from '../components/TalkEditor.vue';

const talk = ref<Talk>({
  title: '',
  description: '',
  author: '',
});

const createTalk = () => {
  fetch('/api/talks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      talk: talk.value,
      telegram_init_data: Telegram.WebApp.initData,
    }),
  });
};
</script>

<template>
  <talk-editor :talk="talk" @update="talk = $event" />
  <v-btn block @click="createTalk">Create</v-btn>
</template>
