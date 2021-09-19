<template>
    {{ date }}
  <div>
    <d-picker v-model:date="date" :date="date" title="Select date"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import DPicker from "~/components/v-picker.vue";

export default defineComponent({
  components: {
    DPicker
  },
  setup() {
    const date = ref('')
    return {
      date
    }
  }
})
</script>
