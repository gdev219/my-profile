<template>
  <section>
    <ul>
      <li v-for="(n, i) in currentYear - birthYear + 1" :key="i">
        <span class="timeline-year" :class="{ on: yearIndex[i] }">{{
          birthYear + i
        }}</span>
        <div class="timeline-content">
          <p
            v-for="item in data[birthYear + i]"
            :key="item.month"
            :class="{ 'no-issue': !item.detail }"
          >
            <span class="content-date"
              >{{ item.month + '월'
              }}<span v-if="item.day != 0">{{ item.day + '일' }}</span></span
            >
            <span class="content-title">{{ item.title }}</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      data: [],
      currentYear: new Date().getFullYear(),
      birthYear: null,
      years: [],
      yearIndex: [],
    }
  },
  created() {
    this.$fire.firestore
      .collection('History')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const year = doc.id.substring(0, 4)
          // store first year index;

          if (!this.years.includes(year)) this.years.push(year)

          if (!this.data[year]) {
            this.data[parseInt(year)] = []
          }
          this.data[parseInt(year)].push(doc.data())
        })
        // set birthYear
        this.birthYear = parseInt(Object.keys(this.data)[0])

        // set yearIndex
        for (let i = 0; i < this.years.length; i++) {
          this.yearIndex[this.years[i] - this.birthYear] = true
        }
      })
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  border-left: 4px solid #35373c;
  margin-left: 100px;
  li {
    position: relative;
    bottom: -10px;
    cursor: default;
    z-index: 1;
    .timeline-content {
      padding-left: 20px;
      min-height: 50px;
      .content-date {
        padding-right: 20px;
        color: #b1b1b1;
        display: inline-block;
        text-align: center;
        width: 50px;
        font-size: 0.8em;
      }
    }
    .no-issue {
      color: #585858;
      .content-date {
        color: inherit;
      }
    }
    .timeline-year {
      position: absolute;
      left: -54px;
      top: 0;
      width: 60px;
      color: #35373c;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
      -ms-transition: all 0.3s;
      transition: all 0.3s;
      &:before {
        position: absolute;
        bottom: 2px;
        left: 46px;
        width: 12px;
        height: 12px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #35373c;
        content: '';
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        -ms-transition: all 0.3s;
        transition: all 0.3s;
      }
    }
    .on {
      color: white;
      &:before {
        background: white;
      }
    }
  }
  .active {
    &:before {
      background: #fff;
      -webkit-animation: pulse 0.8s infinite;
      -moz-animation: pulse 0.8s infinite;
      -o-animation: pulse 0.8s infinite;
      -ms-animation: pulse 0.8s infinite;
      animation: pulse 0.8s infinite;
    }
  }
}
</style>
