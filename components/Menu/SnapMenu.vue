<template>
  <ul class="snap-menu">
    <!-- get menu info.. ajax -->
    <li v-for="route in routes" :key="route.name">
      <p class="parent-list" @click="route.flag = !route.flag">
        <i class="fas fa-caret-down rotate" :class="{ down: !route.flag }"></i
        ><span>{{ route.name.toUpperCase() }}</span>
      </p>
      <ul v-if="route.flag" class="child-list">
        <nuxt-link
          v-for="childrenRoute in route.children"
          :key="childrenRoute.name"
          :to="childrenRoute.path"
          tag="li"
        >
          {{ childrenRoute.name }}
        </nuxt-link>
      </ul>
    </li>
    <!-- <nuxt-link v-for="route in routes" :key="route.name" tag = "li" :to="route.name">{{route.name}}</nuxt-link> -->
  </ul>
</template>

<script>
// has to bring json data of menu list
export default {
  data() {
    return {
      routes: [],
    }
  },
  created() {
    // console.log("created");
    const execptionList = ['Signup']
    this.$router.options.routes.forEach((route) => {
      if (route.path !== '/' && route.path.match(/[/]/g).length === 1) {
        // console.log("이름:" + route.name);
        this.routes.push({
          name: route.name,
          path: route.path,
          flag: true,
          children: [],
        })
      }
    })

    for (let i = 0; i < this.routes.length; i++) {
      for (let j = 0; j < execptionList.length; j++) {
        if (this.routes[i]) {
          if (this.routes[i].name === execptionList[j]) {
            this.routes.splice(i, 1)
          }
        }
      }
    } // eliminates specific root routers

    this.$router.options.routes.forEach((route) => {
      if (route.path.match(/[/]/g).length > 1) {
        for (let i = 0; i < this.routes.length; i++) {
          if (this.routes[i].name === route.name.split('-')[0]) {
            if (route.name.split('-').length < 3) {
              this.routes[i].children.push({
                name: route.name.split('-')[1],
                path: route.path,
              })
            }
          }
        }
      }
    })
    // adding child routes to the rightful root routes
    this.routes.sort((a, b) => {
      return a.name.charAt(0) < b.name.charAt(0)
        ? -1
        : a.name.charAt(0) > b.name.charAt(0)
        ? 1
        : 0
    })
    // order by alphabetical order with the first char
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.rotate {
  -moz-transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.down {
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.snap-menu {
  background-color: #383838;
  .parent-list {
    color: #c7cccc;
    font-weight: normal;
    // border-bottom: 1px solid #252526;
  }
  .child-list {
    color: #cccccc;
    background-color: #252526;
  }
  &:hover {
    cursor: pointer;
  }
}
@media screen and (min-width: 1500px) {
  .snap-menu {
    font-size: 18px;
    .parent-list {
      padding: 15px;
      span {
        padding-left: 15px;
      }
    }
    .child-list {
      & > li {
        margin-left: 30px;
        padding: 15px;
      }
    }
  }
}
@media screen and (max-width: 1500px) {
  .snap-menu {
    font-size: 1.2vw;
    .parent-list {
      padding: 1vw;
      span {
        padding-left: 1vw;
      }
    }
    .child-list {
      & > li {
        margin-left: 2vw;
        padding: 1vw;
      }
    }
  }
}
</style>
