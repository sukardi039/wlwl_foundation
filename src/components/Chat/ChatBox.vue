<template>
  <v-container>
    <v-card cardHeight="cardHeight">
      <v-card-title>{{$t('Drill.chat')}}</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{
                message
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="chat-message">
        <v-row dense class="chat-message">
            <v-col cols="9">
        <v-text-field
          v-model="newMessage"
          label="Type a message"
        ></v-text-field>
            </v-col>
            <v-col cols="3">
        <v-btn small @click="sendMessage" color="primary">Send</v-btn>
            </v-col>
        </v-row>
        <v-row dense class="chat-message">
            <v-col cols="8">
        <v-select
          v-model="selectedUser"
          :items="users"
          label="Send to"
          v-if="isOneToOne"
        ></v-select>
            </v-col>
            <v-col cols="4">
        <v-checkbox class="chat-message" v-model="isOneToOne" label="One-to-One"></v-checkbox>

            </v-col>
        </v-row>
      </v-card-actions>
    </v-card> </v-container
></template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      users: ["All", "User1", "User2", "User3"],
      isOneToOne: false,
      selectedUser: "All",
    };
  },
  props:{
    cardHeight:0,
  },
  methods: {
    sendMessage() {
      if (this.isOneToOne) {
        // Send message to selected user
        this.messages.push(`[To ${this.selectedUser}] ${this.newMessage}`);
      } else {
        // Send message to all users
        this.messages.push(`[All] ${this.newMessage}`);
      }
      this.newMessage = "";
    },
  },
};
</script>

<style></style>
