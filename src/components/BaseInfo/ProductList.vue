<template>
  <v-container>
      <v-row style="background-color: lightgrey">
          <v-col>
            <v-row dense>
                <v-col cols="2">{{$t('Product.name')}}</v-col>
                <v-col cols="4">{{$t('Product.description')}}</v-col>
                <v-col cols="2" class="text-center">{{$t('Product.ordersPerDay')}}</v-col>
                <v-col cols="2" class="text-center">{{$t('Product.minValue')}}</v-col>
                <v-col cols="2" class="text-center">{{$t('Product.maxValue')}} <span class="text-end mdi mdi-plus" @click="$emit('AddClicked')"></span></v-col>
            </v-row>
          </v-col>
      </v-row>
      <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
          <v-col>
            <v-row dense>
                <v-col cols="2" class="font-weight-bold">{{Data.productShortName}}</v-col>
                <v-col cols="4">{{Data.productDescription}}</v-col>
                <v-col cols="2" class="text-center">{{Data.ordersPerDay}}</v-col>
                <v-col cols="2" class="text-center">{{Data.minOrderValue}}</v-col>
                <v-col cols="2" class="text-center">{{Data.maxOrderValue}}</v-col>
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