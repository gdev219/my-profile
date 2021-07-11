<template>
  <section>
    <h2>기본 정보</h2>
    <div class="info-container general">
      <div>
        <P class="container bio">
          <span class="name">{{ summarayData.general.name }}</span>
          <span class="sub">{{ summarayData.general.sex }}</span>
          <span class="sub">{{ summarayData.general.birth + '년' }}</span>
          <span class="sub"
            >{{ currentYear - summarayData.general.birth + 1 }}세</span
          >
        </P>
      </div>
      <div>
        <p class="container head-to-tail">
          <span>
            <span class="head">휴대전화</span>
            <span class="tail">{{ summarayData.general.phoneNumber }}</span>
          </span>
          <span>
            <span class="head">이메일</span>
            <span class="tail">{{ summarayData.general.email }}</span>
          </span>
          <span>
            <span class="head">주소</span>
            <span class="tail">{{ summarayData.general.addr }}</span>
          </span>
        </p>
        <p class="container head-to-tail">
          <span>
            <span class="head">병역</span>
            <span class="tail">{{ summarayData.general.service }}</span>
          </span>
        </p>
      </div>
    </div>
    <h2>학력</h2>
    <div class="info-container edu">
      <div
        v-for="eduData in summarayData.edu"
        :key="eduData.title"
        class="edu-wrapper flex"
      >
        <div class="date">
          <p>
            <span class="enter-year">{{ eduData.date.start.year }}</span
            >. <span class="enter-month">{{ eduData.date.start.month }}</span> ~
            <span class="grad-year">{{ eduData.date.end.year }}</span
            >. <span class="grad-month">{{ eduData.date.end.month }}</span>
          </p>
          <p class="stat">
            {{ eduData.stat }}
          </p>
        </div>
        <div class="info-content">
          <p>
            <span class="title">{{ eduData.title }}</span
            ><span class="sub-title">{{ eduData.subTitle }}</span>
          </p>
          <p
            v-for="detailData in eduData.detail"
            :key="detailData.key"
            class="container head-to-tail"
          >
            <span>
              <span class="head">{{ detailData.key }}</span>
              <span class="tail">{{ detailData.value }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <h2>경력</h2>
    <div class="info-container career">
      <div
        v-for="careerData in summarayData.career"
        :key="careerData.title"
        class="career-wrapper flex"
      >
        <div class="date">
          <p>
            <span class="enter-year">{{ careerData.date.start.year }}</span
            >.
            <span class="enter-month">{{ careerData.date.start.month }}</span> ~
            <span class="end-year">{{ careerData.date.end.year }}</span
            >. <span class="end-month">{{ careerData.date.end.month }}</span>
          </p>
          <p class="stat">1년 7개월</p>
        </div>
        <div class="info-content">
          <p>
            <span class="title">{{ careerData.title }}</span
            ><span class="sub-title">{{ careerData.role }}</span>
          </p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="careerData.content"></p>
        </div>
      </div>
    </div>

    <h2>인턴/대외활동</h2>
    <h2>해외경험</h2>
  </section>
</template>
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      summarayData: {
        general: {
          name: '',
          birth: '',
          sex: '',
          email: '',
          phoneNumber: '',
          service: '',
          addr: '',
        },
        edu: [
          {
            date: {
              start: { year: '', month: '' },
              end: { year: '', month: '' },
            },
            stat: '',
            title: '',
            subTitle: '',
            detail: [],
          },
        ],
      },
    }
  },
  beforeCreate() {},
  created() {
    this.$fire.firestore
      .collection('Summary')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.summarayData = doc.data()
        })
      })
  },
}
</script>
<style lang="scss" scoped>
.general {
  .bio {
    .name {
      font-size: 1.1em;
    }
    .sub {
      color: #888;
      margin-left: 7px;
      font-size: 0.8em;
    }
  }
}
.flex {
  display: -webkit-flex; /* Safari */
  display: flex;
}
.stat {
  color: #3399ff;
  font-size: 0.8em;
}
.info-container {
  padding: 10px;
  margin-left: 10px;
  .date {
    min-width: 142px;
    margin-right: 10px;
    text-align: center;
  }
  .info-content {
    margin-left: 20px;
    .title {
      font-size: 1.2em;
    }
    .sub-title {
      margin-left: 10px;
      font-size: 0.8em;
      color: #888;
    }
  }
}

.head-to-tail {
  .head {
    width: 70px;
    color: #888;
  }
  .tail {
    min-width: 200px;
    margin-right: 20px;
  }
}
.container {
  font-size: 0.9em;
  span {
    display: inline-block;
  }
}
</style>
