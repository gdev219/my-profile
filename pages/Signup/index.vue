<template>
  <div class="signup">
    <div>
      <h2>회원가입 페이지</h2>
    </div>
    <p class="bold">가입전 꼭 읽어주세요!!</p>
    <div class="signup-agreement">
      <p>
        회원가입후 이메일 인증 하는것은 제작자(박혜성)의 개인정보를 안전하게
        사용하는것에 동의하는것으로 간주됩니다. 저의 소중한 개인정보를 안전하게
        취급해주세요! :)
        <br />
        <span class="bold">
          가입된 이메일은 확인 후 최대한 빠른 시간안에 수동 삭제됩니다.
        </span>
      </p>
    </div>
    <div class="signup-form">
      <p>
        <input
          v-model="email"
          type="text"
          placeholder="이메일"
          @keyup="emainValidator()"
        />
      </p>
      <p class="validate-msg">
        {{ emailValidMsg }}
      </p>
      <p>
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          @keyup="passwordValidator()"
        />
      </p>
      <p class="validate-msg">
        {{ pwValidMsg }}
      </p>
      <p>
        <input
          class="button btn-signup"
          type="submit"
          value="가입"
          @click="signUp()"
        />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailValidMsg: '',
      pwValidMsg: '',
    }
  },
  methods: {
    emainValidator() {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (emailRegex.test(this.email)) {
        this.emailValidMsg = ''
      } else {
        this.emailValidMsg = '올바른 이메일 형식을 입력해주세요'
      }
    },
    passwordValidator() {
      if (this.password.length < 6) {
        this.pwValidMsg = '비밀번호는 6자리 이상이어야 합니다.'
      } else {
        this.pwValidMsg = ''
      }
    },
    signUp() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$fire.auth.currentUser.sendEmailVerification().then(() => {
              this.email = ''
              this.password = ''
              alert('인증 이메일이 전송됐습니다.\n')
              this.$nuxt.$router.push('/')
            })
          },
          (err) => {
            if (err.code === 'auth/invalid-email')
              alert('정확한 이메일을 입력해주세요')
            else if (err.code === 'auth/email-already-in-use')
              alert('이미 가입된 이메일 주소입니다.')
            else {
              alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.')
            }
          }
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.signup {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  .signup-agreement {
    background: white;
    color: black;
    font-size: 0.8em;
    p {
      padding: 10px;
    }
  }
  input {
    width: calc(100% - 23px);
    height: 18px;
    padding: 10px;
  }
  .validate-msg {
    color: #ff3838;
    margin: 0;
    padding: 0;
    font-size: 0.8em;
    text-align: left;
  }
  .btn-signup {
    background-color: #e4e4e4;
    padding: 0;
    border: 0;
    width: 100%;
    height: 38px;
  }
}
</style>
