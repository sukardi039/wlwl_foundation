<template>
  <div>
    <MessageSummary
      :messageHead="messageHead"
      v-show="showHead"
      @msg-selected="getMessage($event)"
      @pen-clicked="broadcastMsg()"
    />
    <HeadBar
      v-if="!showHead"
      :title="studentName"
      :icon="'mdi-exit-to-app'"
      @icon-clicked="leaveMessageList()"
    />
    <MessageList
      v-show="!showHead"
      :messageList="messageList"
      :limit="limit"
      @pen-clicked="replyMsg()"
      @more-clicked="moreMessage()"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'

import MessageSummary from '../components/Messages/MessageSummary.vue'
import MessageList from '../components/Messages/MessageList'
import HeadBar from '../components/HeadBar'

export default {
  name: 'Message',
  components:{
    MessageSummary,
    MessageList,
    HeadBar,
  },
  data() {
    return {
      messageHead: [],
      messageList: [],
      studentList: [],
      fetchbuffer: {
        restkey: '',
        mod: "head",
        limit: 0,
        qdata: {},
        classes: "",
      },
      showHead: true,
      studentName: '',
      limit: 30,
      sendMode: 'broadcast',
      writeMessage: false,
    }
  },
  computed:{
    ...mapState({
      signedinuser: 'signedinuser'
    })
  },
  methods: {
    async GetMsg(mod, qry) {
      let qryStr = "/backend/messages/"
      this.fetchbuffer.restkey = this.signedinuser.restkey
      this.fetchbuffer.classes = this.signedinuser.classes
      this.fetchbuffer.mod=mod
      this.fetchbuffer.limit=this.limit
      if (qry) {
        qryStr = qryStr+"?"+qry
      }
      const res = await fetch(qryStr, {
          method: "POST",
          cache: 'no-cache',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.fetchbuffer),
      })
      if (res.status === 200){
        const msgData = await res.json()
        switch (mod){
            case 'head':
            this.messageHead = msgData
          break
          case 'list':
            this.messageList = msgData
          break
        }
      }
    },
    getMessage(ev) {
//      console.log('selected', ev)
      this.messageList = []
      this.limit=30
      this.studentName= ev.NameOfStudent
      this.fetchbuffer.qdata.SMSNumber=ev.SMSNumber
      this.GetMsg('list')
      this.showHead = false
    },
    moreMessage() {
      this.limit=0
      this.GetMsg('list')
    },
    leaveMessageList(){
      this.showHead=true
    },
    async GetStudent(mod, qry) {
      let qryStr = "/backend/student/"
      this.fetchbuffer.restkey = this.signedinuser.restkey
      this.fetchbuffer.classes = this.signedinuser.classes
      this.fetchbuffer.mod=mod
      this.fetchbuffer.limit=this.limit
      if (qry) {
        qryStr = qryStr+"?"+qry
      }
      const res = await fetch(qryStr, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.fetchbuffer),
      })
      if (res.status === 200){
        const msgData = await res.json()
        return msgData
      }
    },
    replyMsg(ev){
      console.log("Reply")
      this.fetchbuffer.limit=0
      this.studentList = this.GetStudent('current', ev.StudentId);
      this.sendMode = 'reply'
    },
    broadcastMsg(){
      console.log("Broadcast")
      this.fetchbuffer.limit=0
      this.studentList = this.GetStudent('current');
      this.sendMode = 'broadcast'
      this.writeMessage = true
    },
  },
  created() {
    this.limit=0
    this.GetMsg('head')
  },

}
</script>

<style></style>
