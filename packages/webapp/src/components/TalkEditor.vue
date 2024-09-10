<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash';
import { Talk } from 'shared/types/talk.ts';

const props = defineProps<{
  talk: Talk;
}>();

const emit = defineEmits<{
  (e: 'update', talk: Talk): void;
}>();

const localTalk = ref<Talk>(_.cloneDeep(props.talk));

const handleTalkUpdate = (updatedField: keyof Talk, updatedValue: string) => {
  localTalk.value = {
    ...localTalk.value,
    [updatedField]: updatedValue,
  };

  emit('update', localTalk.value);
};
</script>

<template>
  <v-form>
    <v-text-field
      variant="outlined"
      label="Title"
      :model-value="localTalk.title"
      @update:model-value="handleTalkUpdate('title', $event)"
    />
    <v-text-field
      variant="outlined"
      label="Author"
      :model-value="localTalk.author"
      @update:model-value="handleTalkUpdate('author', $event)"
    />
    <v-textarea
      no-resize
      variant="outlined"
      label="Description"
      :model-value="localTalk.description"
      @update:model-value="handleTalkUpdate('description', $event)"
    />
  </v-form>
</template>
