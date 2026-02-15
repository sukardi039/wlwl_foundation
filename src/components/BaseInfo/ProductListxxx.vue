<template>
  <v-container>
      <v-row style="background-color: lightgrey">
          <v-col>
            <v-row>
                <v-col cols="3">{{$t('Product.name')}}</v-col>
                <v-col cols="9">{{$t('Product.description')}}</v-col>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="3">{{$t('Product.ordersPerDay')}}</v-col>
                <v-col cols="3">{{$t('Product.minValue')}}</v-col>
                <v-col cols="3">{{$t('Product.maxValue')}}</v-col>
            </v-row>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
            <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
                <v-col cols="3" class="font-weight-bold">{{Data.displayKey}}</v-col>
                <v-col cols="9">{{Data.productDescription}}</v-col>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="3">{{Data.ordersPerDay}}</v-col>
                <v-col cols="3">{{Data.minOrderValue}}</v-col>
                <v-col cols="3">{{Data.maxOrderValue}}</v-col>
            </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        BaseData: [],
    },
}
</script>

<style>

</style>