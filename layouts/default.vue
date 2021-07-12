<template>
  <div class="wrapper" :style="{ height: windowHeight - 40 + 'px' }">
    <main class="content">
      <section class="content-section" :class="{ move: flagMenu }">
        <ul class="line-number">
          <li v-for="n in 20" :key="n">{{ n + 122 }}</li>
        </ul>
        <section class="main-header">
          <div class="btn-menu" @click="openMenu">
            <i class="fas fa-bars"></i>
          </div>
          <div class="auth-info">
            <template v-if="$store.state.auth.authUser">
              <template v-if="$store.state.auth.authUser.emailVerified">
                <span class="text">
                  {{ `${$store.state.auth.authUser.email}님 안녕하세요` }}
                </span>
              </template>
              <template v-else>
                <span class="text" @click="sendVerification()">
                  {{
                    `이메일(${$store.state.auth.authUser.email}) 인증해주세요`
                  }}
                </span>
              </template>
              <span class="button" @click="logout()"> 로그아웃 </span>
            </template>
            <template v-else>
              <span class="button" @click="flagModal = true">로그인</span>
              <nuxt-link
                v-if="!$store.state.auth.authUser"
                tag="span"
                to="/Signup"
                class="button"
                >회원가입</nuxt-link
              >
            </template>
          </div>
          <!-- <div class="btn-lang">
          <span :class="{}">한글</span>      
          <span>ENGLISH</span>      
        </div> -->
        </section>
        <section class="main-section">
          <div class="main-content">
            <nuxt />
          </div>
        </section>
        <section v-if="flagModal" class="modal-section">
          <div class="modal-wrapper" @click.self="flagModal = false">
            <login-modal :flag.sync="flagModal"></login-modal>
          </div>
        </section>
      </section>
      <section class="snap-section" :class="{ open: flagMenu }">
        <SnapLogo></SnapLogo>
        <SnapMenu v-if="flagMenu"></SnapMenu>
      </section>
    </main>
  </div>
</template>

<script>
import SnapMenu from '@/components/Menu/SnapMenu'
import SnapLogo from '@/components/Logo/SnapLogo'
import LoginModal from '@/components/Modal/LoginModal'
export default {
  components: {
    SnapMenu,
    SnapLogo,
    LoginModal,
  },

  data() {
    return {
      windowHeight: 0,
      flagMenu: false,
      flagModal: false,
      selectedLang: 'kor',
      // loginUser: auth.currentUser,
    }
  },
  watch: {
    $route() {
      this.flagMenu = false
      if (this.$route.name === 'index') {
        this.flagModal = false
      }
      if ('query' in this.$route) {
        if (this.$route.query.login === 'false') {
          this.flagModal = true
        }
      }
    },
    flagModal(val) {
      if (!val || val === 'false') {
        this.$router.push('/')
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowHeight)
      this.getWindowHeight()
    })
  },
  methods: {
    getWindowHeight(e) {
      this.windowHeight = document.documentElement.clientHeight
    },
    openMenu(e) {
      this.flagMenu = !this.flagMenu
    },
    closeMenu(e) {
      this.flagMenu = false
    },
    sendVerification() {
      // auth.currentUser.sendEmailVerification().then(function () {
      //   alert('인증 이메일이 전송됐습니다.\n')
      // })
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.$nuxt.$router.push('/')
      } catch (e) {
        // this.formError = e.message
      }
    },
  },
}
</script>

<style lang="scss">
html {
  width: 100%;
}
body {
  font-family: 'Ubuntu', 'Nanum Gothic', sans-serif;
  margin: 0;
  height: 100%;
}
p {
  padding: 0;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
a {
  text-decoration: none;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
  &:hover {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
}
.bold {
  font-weight: 1000;
}
.text {
  font-size: 13px;
}
.button {
  cursor: pointer;
  display: inline-block;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
  &:hover {
    text-decoration: underline;
  }
}
$max-width: 1500px;

.wrapper {
  max-width: $max-width;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

$aspect-ratio: 6/10;
$ratio-percent: $aspect-ratio * 100%;
$background-color: #1e1e1e;
.content {
  background-color: $background-color;
  position: relative;
  margin: auto;
  width: 100%;
  padding-top: $ratio-percent;
  overflow: hidden;
  .snap-section {
    position: absolute;
    top: 0;
    background-color: #252526;
    height: 100%;
    width: 20%;
    z-index: 999;
    -webkit-transition: 300ms ease margin-left;
    -moz-transition: 300ms ease margin-left;
    -ms-transition: 300ms ease margin-left;
    -o-transition: 300ms ease margin-left;
    transition: 300ms ease margin-left;
    margin-left: -20%;
  }
  .content-section {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: 100%;
    overflow: hidden;
    color: white;
    -webkit-transition: 300ms ease left;
    -moz-transition: 300ms ease left;
    -ms-transition: 300ms ease left;
    -o-transition: 300ms ease left;
    transition: 300ms ease left;
    .line-number {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 0;
      font-family: 'Nanum Gothic', sans-serif;
      font-weight: 500;
      list-style-type: none;
      height: 100%;
      li {
        color: #474747;
        line-height: 1;
      }
    }
    .main-header {
      display: flex;
      max-width: $max-width;
      width: calc(100% - 40px);
      //40px for margin...
      z-index: 999;
      // background-color: $background-color;
      position: fixed;
      .btn-menu {
        // border: 1px solid #bfbfbf;
        display: inline-block;
        left: 0;
        background-color: $background-color;
        .fa-bars {
          color: #bfbfbf;
        }
        &:hover {
          cursor: pointer;
          // border: 1px solid #7a7a7a;
          .fa-bars {
            color: #7a7a7a;
          }
        }
      }
      .auth-info {
        margin-left: auto;
        display: flex;
        align-items: center;
        span {
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }
    .main-section {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      .main-content {
        // padding: 2vw;
        height: calc(100% - 100px);
      }
    }
    .modal-section {
      position: absolute;
      z-index: 9999;
      vertical-align: middle;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      .modal-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
  .move {
    left: 20%;
  }
  .open {
    margin-left: 0;
  }
}

@media screen and (min-width: 1500px) {
  .line-number {
    padding-left: 28.5px;
    li {
      padding-top: 15px;
      padding-bottom: 15px;
      font-size: 22.5px;
    }
  }
  .btn-menu {
    padding: 24px;
    .fa-bars {
      font-size: 52.5px;
    }
  }
  .auth-info {
    padding: 24px;
    font-size: 18px;
    span {
      margin-right: 18px;
    }
  }
  .main-header {
    height: 100px;
  }
  .main-section {
    margin-top: 100px;
    margin-left: 100px;
  }
}

@media screen and (max-width: 1500px) {
  .line-number {
    padding-left: 1.9vw;
    li {
      padding-top: 1vw;
      padding-bottom: 1vw;
      font-size: 1.5vw;
    }
  }
  .btn-menu {
    padding: 1.6vw;
    .fa-bars {
      font-size: 3.5vw;
    }
  }
  .auth-info {
    padding: 1.6vw;
    font-size: 1.5vw;
  }
  .main-header {
    height: 6.66vw;
  }
  .main-section {
    margin-top: 6.66vw;
    margin-left: 6.66vw;
  }
}
</style>
