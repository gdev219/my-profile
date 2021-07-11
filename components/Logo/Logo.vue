<template>
  <div class="logo">
    <p class="logo-comment">/* 안녕하세요. 메뉴를 눌러 확인해보세요. */</p>
    <p class="logo-function">
      <span class="function-anot">#FrontendDeveloper </span>
      <span class="function-name">Name </span>
      <span class="function-bracket">{</span>
    </p>
    <p class="logo-title">박혜성</p>
    <p class="logo-function">
      <span class="function-bracket">}</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Ubuntu', 'Gothic A1', sans-serif;
  color: white;
  p {
    margin: 0px;
    line-height: 1;
  }
  .logo-comment {
    font-weight: 400;
    color: #7c7c7c;
  }
  .logo-function {
    font-weight: 600;
    .function-anot {
      color: #839456;
    }
    .function-name {
      color: #a13074;
    }
  }
  .logo-title {
    font-weight: 900;
    color: #3eade0;
  }
}
@media screen and (max-width: 1500px) {
  .logo {
    p {
      padding-top: 1vw;
      padding-bottom: 1vw;
    }
    .logo-comment {
      font-size: 1.3vw;
    }
    .logo-function {
      font-size: 1.8vw;
      padding-left: 0.1vw;
      span {
        margin-right: 0.5vw;
      }
    }
    .logo-title {
      font-size: 8vw;
      border-left: 0.1vw solid #505054;
      padding-left: 1vw;
    }
  }
}
@media screen and (min-width: 1500px) {
  .logo {
    p {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .logo-comment {
      font-size: 19.5px;
    }
    .logo-function {
      font-size: 27px;
      padding-left: 1.5px;
      span {
        margin-right: 7.5px;
      }
    }
    .logo-title {
      font-size: 120px;
      border-left: 1.5px solid #505054;
      padding-left: 15px;
    }
  }
}
</style>
