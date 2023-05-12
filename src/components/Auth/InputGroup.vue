<template>
  <div class="input-group">
    <UIInput
      v-if="typeof inputFields?.name !== 'undefined'"
      @input="handleInput($event, 'name')"
      :errors="errors.name"
      type="text"
      icon="person"
      placeholder="Name"
      name="name"
    />
    <UIInput
      v-if="typeof inputFields?.email !== 'undefined'"
      @input="handleInput($event, 'email')"
      :errors="errors.email"
      type="email"
      icon="email"
      placeholder="Work e-mail"
      name="email"
    />
    <UIInput
      v-if="typeof inputFields?.password !== 'undefined'"
      @input="handleInput($event, 'password')"
      type="password"
      icon="password"
      placeholder="Password"
      :errors="errors.password"
      name="password"
      :password="true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import UIInput from "@/components/UI/Input.vue";

const props = defineProps({
  inputFields: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:inputFields"]);

function handleInput(e: Event, key: any) {
  emit("update:inputFields", { ...props.inputFields, [key]: (e.target as HTMLInputElement).value });
}
</script>

<style scoped lang="scss">
.input-group {
  display: flex;
  flex-direction: column;
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
  width: 26rem;
}
</style>
