<template>
    <div class="pa-3 primary"
     >
    <h2>
      {{title}}
      <v-btn
        icon
        fixed
        right
        @click="$emit('icon-clicked')"
      >
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </h2>
  </div>
</template>

<script>
export default {
    name: 'HeadBar',
    props: {
        title: '',
        icon: '',
    }
}
</script>

<style>

</style>