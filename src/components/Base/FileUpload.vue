<template>
    <v-card noscroll>
        <v-form>
            <v-row>
                <v-col cols="flex">
                    <v-file-input
                            accept="image/*"
                            prepend-icon="mdi mdi-camera"
                            show-size
                            v-model="myfile"
                            :rule="rules"
                    >
                    </v-file-input>
                </v-col>
                <v-col cols="auto">
                    <v-icon class="mdi mdi-upload"  @click="uploadFile()"></v-icon>
                    <span class="mdi mdi-restore" @click="$emit('Abort-Clicked')"></span>
                </v-col>
            </v-row>
        </v-form>          
    </v-card>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'FileUpload',
    data() {
        return{
            myfile: '',
            rules: [
                
            ],
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods:{
        async uploadFile() {
            if (this.myfile.size) {
                if (this.myfile.size > 1500000) {
                    alert(this.$t('general.fileTooBig'))
                } else {
                    const formData = new FormData()
                     formData.append("upFile", this.myfile)
                     const res = await fetch("/backend/images/upload.php?"+this.signedinuser.restkey,  {
                         method: "POST",
                         body: formData
                     }).catch(console.error)
                     if (res.status === 200){
                         const data = await res.json()
                         this.$emit("Uploaded-File", data)
                         this.myfile = ''
                     }
                }
            }
        },
    },
}
</script>

<style>

</style>