<template>
  <nuxt-link :to="'/Work/Portfolio/' + title">
    <figure :style="{ backgroundImage: 'url(' + thumbnailUrl + ')' }">
      <figcaption>
        <div class="caption-wrapper">
          <h3>{{ title }}</h3>
          <h5>
            {{
              date.start.year +
              '.' +
              date.start.month +
              ' ~ ' +
              date.end.year +
              '.' +
              date.end.month
            }}
          </h5>
          <!-- <h6>{{ comment }}</h6> -->
        </div>
      </figcaption>
    </figure>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    // comment:{
    //   type: Number,
    //   required: true
    // },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
figure {
  margin: 0;
  width: 100;
  height: 0;
  position: relative;
  padding-top: 56.25%; //16:9
  // padding-top: 75%; //4:3
  background-size: cover;
  background-position: center;
  &:hover {
    cursor: pointer;
  }
  figcaption {
    background: rgba(50, 51, 59, 0.7);
    position: absolute;
    width: 100%;
    bottom: 0;
    font-size: 0.85em;
    white-space: nowrap;
    z-index: 1;
    margin: 0;
    .caption-wrapper {
      padding: 1em;
      h3,
      h5,
      h6 {
        margin: 0;
      }
    }
  }
}
</style>
