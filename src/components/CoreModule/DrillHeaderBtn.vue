<template>
<v-btn outlined rounded height="20px" :class="gold?'header-btn':''" @click.stop="$emit('Btn-Clicked')">
                    <span :class="icon" small style="font-size: 0.8em;">{{
                      text
                    }}</span>
                  </v-btn>
</template>

<script>
export default {
  name: "DrillHeaderBtn",
  props: {
    icon: "",
    text: "",
    gold: false,
  },
};
</script>

<style></style>
