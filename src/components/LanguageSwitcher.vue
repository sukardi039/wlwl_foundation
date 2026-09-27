<template>
<div>
    <select v-model="$i18n.locale" @change="languageChanged($i18n.locale)" :class="fontColor">
      <option v-for="(lang, i) in this.langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
</div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      langs: this.$i18n.availableLocales
    }
  },
  props:{
    fontColor: null,
  },
  methods: {
      languageChanged(locale){
      this.$router.push({
        params: { lang: locale }
      })
      document.cookie = "language = "+this.$i18n.locale
    }
  },
  mounted() {
//    console.log(this.langs)
  }
}
</script>

<style>

</style>