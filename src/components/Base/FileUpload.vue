<template>
    <v-card noscroll>
        <v-form>
            <v-row>
                <v-col cols="flex">
                    <v-file-input
                            :accept="accept"
                            prepend-icon="mdi mdi-camera"
                            show-size
                            v-model="myfile"
                            :disabled="uploading"
                            @change="errorMessage = ''"
                    >
                    </v-file-input>
                </v-col>
                <v-col cols="auto">
                    <v-progress-circular v-if="uploading" indeterminate size="20" />
                    <v-icon v-else class="mdi mdi-upload" @click="uploadFile()"></v-icon>
                    <span class="mdi mdi-restore" @click="abort()"></span>
                </v-col>
            </v-row>
            <v-alert v-if="errorMessage" type="error" dense text class="mx-3">{{ errorMessage }}</v-alert>
        </v-form>
    </v-card>
</template>

<script>
import {mapState} from 'vuex'
import {uploadStaffPhoto, MAX_STAFF_PHOTO_BYTES, STAFF_PHOTO_ACCEPT} from '../../utils/staffPhoto'

export default {
    name: 'FileUpload',
    data() {
        return{
            myfile: null,
            uploading: false,
            errorMessage: '',
            accept: STAFF_PHOTO_ACCEPT,
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods:{
        async uploadFile() {
            if (this.uploading || !this.myfile || !this.myfile.size) return
            if (this.myfile.size > MAX_STAFF_PHOTO_BYTES) {
                this.errorMessage = this.$t('general.fileTooBig')
                return
            }
            this.uploading = true
            this.errorMessage = ''
            try {
                const data = await uploadStaffPhoto(this.myfile, this.signedinuser.restkey)
                this.$emit("Uploaded-File", data)
                this.myfile = null
            } catch (e) {
                this.errorMessage = this.errorText(e)
            } finally {
                this.uploading = false
            }
        },
        errorText(e) {
            switch (e.status) {
                case 401: return this.$t('general.sessionExpired')
                case 413: return this.$t('general.fileTooBig')
                case 415: return this.$t('general.fileType')
                default: return this.$t('general.uploadFailed') + (e.message ? ': ' + e.message : '')
            }
        },
        abort() {
            if (this.uploading) return
            this.myfile = null
            this.errorMessage = ''
            this.$emit('Abort-Clicked')
        },
    },
}
</script>

<style>

</style>