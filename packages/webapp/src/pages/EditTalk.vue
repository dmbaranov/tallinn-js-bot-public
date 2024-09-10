<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Talk } from 'shared/types/talk';
import TalkEditor from '../components/TalkEditor.vue';

const route = useRoute();
const talkId = route.params.id;

const talk = ref<Talk | null>(null);

onMounted(() => {
  fetch(`/api/talks/${talkId}`)
    .then((talk) => talk.json())
    .then((talkResponse) => {
      talk.value = talkResponse;

      Telegram.WebApp.MainButton.text = 'Save';
      Telegram.WebApp.MainButton.enable();
      Telegram.WebApp.MainButton.show();
      Telegram.WebApp.MainButton.onClick(() => {
        Telegram.WebApp.sendData(JSON.stringify({ id: talkId, talk: talk.value }));
      });
    });
});
</script>

<template>
  <v-progress-circular v-if="!talk" indeterminate />
  <talk-editor v-else :talk="talk" @update="talk = $event" />
</template>
