<template>
  <section>
    <div class="portfolio-header">
      <ul class="portfolio-filters">
        <li
          :class="{ 'filter-on': 1 == selected }"
          class="portfolio-filter-button button"
          @click="selected = 1"
        >
          시간순 보기
        </li>
        <li
          :class="{ 'filter-on': 2 == selected }"
          class="portfolio-filter-button button"
          @click="selected = 2"
        >
          종류별 보기
        </li>
      </ul>
    </div>
    <div
      v-for="(snippets, index) in filteredSnapshot"
      :key="index"
      class="portfolio"
    >
      <h3 class="portfolio-index" @click="clickIndex(index)">
        {{ index }}
      </h3>
      <ul class="portfolio-content grid" :class="toggleClass(index)">
        <li v-for="snippet in snippets" :key="snippet.title">
          <Figure
            :title="snippet.title"
            :date="snippet.date"
            :thumbnail-url="snippet.thumbnailUrl"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import Figure from '@/components/Post/Figure'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Figure,
  },
  data() {
    return {
      selected: 1,
      snippetData: [],
      endYearList: [],
      filterFlag: false,
      sortKey: '',
      selectedIndex: [],
    }
  },
  computed: {
    filteredSnapshot() {
      // eslint-disable-next-line prefer-const
      let arr = {}
      // eslint-disable-next-line prefer-const
      let orderedArr = {}
      if (this.selected === 1) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.snippetData.reverse().forEach((item) => {
          if (!arr[item.date.end.year.toString()])
            arr[item.date.end.year.toString()] = []
          arr[item.date.end.year.toString()].push(item)
        })
        return arr;
      } else if (this.selected === 2) {
        this.snippetData.forEach((item) => {
          if (!arr[item.type]) arr[item.type] = []
          arr[item.type].push(item)
        })
        Object.keys(arr)
          .reverse()
          .forEach((key) => {
            orderedArr[key] = arr[key]
          })
        return orderedArr
      }
      return arr
    },
  },
  mounted() {
    let endDate
    this.$fire.firestore
      .collection('Snippets')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.snippetData.push({
            title: doc.data().title,
            thumbnailUrl: doc.data().thumbnailUrl,
            type: doc.data().type,
            date: doc.data().date,
            endDate,
          })
        })
      })
  },
  methods: {
    clickIndex(index) {
      const foundedIndex = this.selectedIndex.findIndex((i) => i === index)
      if (foundedIndex >= 0) {
        this.selectedIndex.splice(foundedIndex, 1)
      } else {
        this.selectedIndex.push(index)
      }
    },
    toggleClass(index) {
      const isSelected = this.selectedIndex.includes(index)
      return {
        off: isSelected,
        on: !isSelected,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.portfolio {
  margin: 0 auto;
  .portfolio-index {
    cursor: pointer;
  }
  .portfolio-content {
    overflow: hidden;
  }
  .off {
    height: 0;
  }
}
.portfolio-header {
  color: #fff;
  border-bottom: 1px solid #333;
  max-height: auto;
  .portfolio-filters {
    .portfolio-filter-button {
      font-size: 15px;
      margin-left: 3px;
      padding: 10px 15px 10px 15px;
      background: inherit;
      color: #888;
    }
    .filter-on {
      color: #fff;
    }
  }
}

.grid {
  display: flex !important;
  display: -webkit-flex; /* Safari */
  flex-wrap: wrap;
  h3 {
  }
  li {
    // margin: 0 2% 25px 0;
    float: left;
    padding: 1em;
  }
}

@media screen and (min-width: 1500px) {
  .grid {
    li {
      flex-basis: calc(100% / 3 - 3vw);
    }
  }
}
@media screen and (max-width: 1500px) {
  .grid {
    li {
      flex-basis: calc(100% / 3 - 3vw);
    }
  }
}
@media screen and (max-width: 1200px) {
  .grid {
    li {
      flex-basis: calc(100% / 2 - 6vw);
    }
  }
}
@media screen and (max-width: 800px) {
  .grid {
    li {
      flex-basis: calc(100% - 6vw);
    }
  }
}
@media screen and (max-width: 1500px) {
}
</style>
