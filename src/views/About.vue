<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{signedinuser.restkey}}</h2>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default ({
  name: 'About',
  computed: {
    ...mapState({
      signedinuser: 'signedinuser'
    })
  }
})
</script>

