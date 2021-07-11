<template>
    <nuxt-link tag="section" to="/" class="snap-logo">
        <div>
            <p><span class="p1">Gdev219s' </span> </p>
            <p><span class="p2">Private Archive</span></p>
        </div>
    </nuxt-link>
</template>

<style lang="scss" scoped>
$background-color: #1e1e1e;
p {
  padding: 0;
  margin: 0;
}
.snap-logo {
  color: white;
  overflow: hidden;
  width: 100%;
  display: table;
  font-weight: 600;
  div {
    display: table-cell;
    vertical-align: middle;
    &:hover {
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 1500px) {
  .snap-logo {
    height: 100px;
    div {
      padding: 15px;
      .p1 {
        font-size: 33px;
      }
      .p2 {
        font-size: 13.5px;
      }
    }
  }
}
@media screen and (max-width: 1500px) {
  .snap-logo {
    height: 6.66vw;
    div {
      padding: 1vw;
      .p1 {
        font-size: 2.2vw;
      }
      .p2 {
        font-size: 0.9vw;
      }
    }
  }
}
</style>