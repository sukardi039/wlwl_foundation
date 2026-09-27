<template>
  <v-card outlined class="authentication-card ma-3">
    <v-card-text class="pa-4">
      <div class="d-flex align-start mb-4">
        <v-icon color="#434b5e" class="mr-2">mdi-shield-lock-outline</v-icon>
        <div>
          <div class="authentication-title">{{ $t("login.auth_title") }}</div>
          <div class="authentication-description">
            {{ $t("login.auth_instructions") }}
          </div>
        </div>
      </div>

      <v-alert v-if="error" type="error" dense text class="mb-3">
        {{ $t("login.auth_service_unavailable") }}
      </v-alert>
      <v-alert v-if="otpErrorMessage" type="error" dense text class="mb-3">
        {{ $t(otpErrorMessage, { remainingAttempts: 3 - failedAttempts }) }}
      </v-alert>

      <v-form v-if="key" @submit.prevent="submitOtp">
        <div class="otp-label">{{ $t("login.auth_code") }}</div>
        <v-row align="center" no-gutters class="mb-3">
          <v-col cols="auto" class="otp-key">{{ key }}-</v-col>
          <v-col>
            <v-text-field
              v-model="otp"
              type="text"
              outlined
              dense
              hide-details
              class="otp-input"
              autocomplete="one-time-code"
            />
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          block
          color="#ddbd82"
          class="submit-button"
          :loading="checking"
          :disabled="checking || otp === null || otp.trim() === ''"
        >
          {{ $t("login.authenticate") }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Authentication",
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      key: "",
      otp: null,
      error: false,
      otpErrorMessage: "",
      failedAttempts: 0,
      checking: false,
    };
  },
  created() {
    this.getAuthenticationKey();
  },
  methods: {
    async getAuthenticationKey() {
      try {
        const response = await fetch("backend/staffsignin/?method=GETAUTH", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userId: this.userId }),
        });
        const result = await response.json();
        const key = result.K == null ? "" : String(result.K).trim();

        if (!response.ok || !key || key === "0") {
          this.error = true;
          return;
        }

        this.key = key;
      } catch (error) {
        this.error = true;
      }
    },
    async submitOtp() {
      if (this.checking || this.otp === null || this.otp.trim() === "") {
        return;
      }

      this.checking = true;
      try {
        const response = await fetch("backend/staffsignin/?method=CHKAUTH", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            key: this.key,
            otp: this.otp,
          }),
        });
        const result = await response.json();

        if (response.ok && String(result.key) === this.key) {
          this.$emit("update:authenticated", true);
        } else {
          this.recordOtpFailure();
        }
      } catch (error) {
        this.recordOtpFailure();
      } finally {
        this.checking = false;
      }
    },
    recordOtpFailure() {
      this.failedAttempts += 1;
      this.otpErrorMessage =
        this.failedAttempts >= 3
          ? "login.auth_attempts_exceeded"
          : "login.auth_invalid_otp";

      if (this.failedAttempts >= 3) {
        this.$emit("signed-off");
      }
    },
  },
};
</script>

<style scoped>
.authentication-card {
  border-color: #d9dde3;
  border-radius: 4px;
}

.authentication-title {
  color: #303744;
  font-size: 16px;
  font-weight: 600;
}

.authentication-description {
  color: #68717e;
  font-size: 13px;
  line-height: 1.45;
  margin-top: 3px;
}

.otp-label {
  color: #434b5e;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
}

.otp-key {
  color: #434b5e;
  font-size: 16px;
  font-weight: 600;
  padding-right: 8px;
}

.otp-input {
  min-width: 0;
}

.submit-button {
  color: #303744;
  font-weight: 600;
}
</style>