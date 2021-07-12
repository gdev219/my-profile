<template>
  <div class="Portfolio-admin">
    <h3 class="Portfolio-admin-header">
      <span
        class="btn-mode"
        v-bind:class="{ insert: modeFlag }"
        v-on:click="onChangeMode()"
        >{{ modeFlag ? '수정 모드' : '입력 모드' }}</span
      >
    </h3>
    <form
      v-on:submit.prevent="onSubmit(portfolioPreview)"
      @keydown.enter.prevent.self="onSubmit(portfolioPreview)"
    >
      <label>프로젝트</label>
      <p v-if="!modeFlag">
        <input
          type="text"
          name="title"
          v-model="portfolioPreview.title"
          id="title"
          placeholder="프로젝트 이름"
        />
      </p>
      <p v-else>
        <select v-model="portfolioPreview.title" v-on:change="onChangeselect()">
          <option
            v-for="(title, index) in titleList"
            :value="title"
            v-bind:key="index"
          >
            {{ title }}
          </option>
        </select>
      </p>
      <label>종류</label>
      <p>
        <input
          type="text"
          name="text"
          v-model="portfolioPreview.type"
          id="type"
          placeholder="종류"
        />
      </p>
      <label>개발 기간</label>
      <p>
        <select v-model="portfolioPreview.date.start.year" id="date-start-year">
          <option value="" disabled selected>시작년</option>
          <option v-for="index in yearCount" :key="index">
            {{ 2010 + index }}
          </option>
        </select>

        <select
          v-model="portfolioPreview.date.start.month"
          id="date-start-month"
        >
          <option value="" disabled selected>시작월</option>
          <option v-for="index in 12" :key="index">{{ index }}</option>
        </select>

        <select v-model="portfolioPreview.date.end.year" id="date-end-year">
          <option value="" disabled selected>종료년</option>
          <option value="진행중">{{ 0 }}</option>
          <option v-for="index in yearCount" :key="index">
            {{ 2010 + index }}
          </option>
        </select>

        <select v-model="portfolioPreview.date.end.month" id="date-end-month">
          <option value="" disabled selected>종료월</option>
          <option>{{ 0 }}</option>
          <option v-for="index in 12" :key="index">{{ index }}</option>
        </select>
      </p>
      <label>설명</label>
      <p>
        <textarea rows="4" cols="50" v-model="portfolioPreview.desc"></textarea>
      </p>

      <label>주요 기능</label>
      <div>
        <input
          type="text"
          v-on:keydown.enter="onEnterPointlist(pointText)"
          v-model="pointText"
        />
        <ul>
          <li v-for="point in portfolioPreview.pointlist" v-bind:key="point">
            {{ point }}
          </li>
        </ul>
      </div>

      <label>기술</label>
      <div>
        <input
          type="text"
          v-on:keydown.enter="onEnterTechlist(techText)"
          v-model="techText"
        />
        <ul class="Portfolio-admin-techlist">
          <li
            v-for="(tech, index) in portfolioPreview.techlist"
            v-bind:key="tech.text"
            v-bind:class="{ 'my-work': tech.duty }"
            @click="addTeclistClass(index)"
          >
            {{ tech.text }}
          </li>
        </ul>
      </div>
      <label>이미지 *The first image is a thumbnail</label>
      <p>
        <input
          type="file"
          name="이미지"
          @change="uploadImage($event.target.files)"
          accept="image/*"
        />
      </p>

      <ul class="Portfolio-admin-imglist">
        <li v-for="imgSrc in portfolioPreview.images" v-bind:key="imgSrc">
          <img v-bind:src="imgSrc" />
        </li>
      </ul>

      <input class="btn-submit" type="submit" value="전송" />

      <ul>
        <li v-for="imgSrc in portfolioPreview.images" :key="imgSrc"></li>
      </ul>
    </form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      portfolioPreview: {
        title: '',
        type: '',
        date: { start: { year: '', month: '' }, end: { year: '', month: '' } },
        desc: '',
        pointlist: [],
        techlist: [],
        images: [],
        timestamp: '',
      },
      dataList: [],
      titleList: [],
      pointText: '',
      techText: '',
      modeFlag: false,
      uploading: false,
      yearCount: new Date().getFullYear() - 2010,
    }
  },
  methods: {
    onSubmit(data) {
      if (this.uploading) {
        alert('이미지가 업로드중입니다. 잠시 후 다시 해라')
        return -1
      }
      this.portfolioPreview.timestamp = new Date().getTime();
      const batch = this.$fire.firestore.batch()
      let snippetData = {}
      let postData = {}
      snippetData = {
        title: data.title,
        date: data.date,
        type: data.type,
        thumbnailUrl: data.images[0],
      }
      postData = Object.assign({}, data)
      const snippetRef = this.$fire.firestore
        .collection('Snippets')
        .doc(data.title)
      const postsRef = this.$fire.firestore
        .collection('Portfolio')
        .doc(data.title)

      console.log('sending data...')

      if (this.modeFlag) {
        batch.update(postsRef, postData)
        batch.update(snippetRef, snippetData)
      } else {
        batch.set(postsRef, postData)
        batch.set(snippetRef, snippetData)
      }

      batch.commit().then(function (snapshot) {
        console.log('data is succesfully saved..')
        console.log(snapshot)
      })
    },
    getTitlelist() {},
    onChangeMode() {
      const postsRef = this.$fire.firestore.collection('Portfolio')
      // modeFlag insert: false update: true;
      this.modeFlag = !this.modeFlag
      // clear object
      this.portfolioPreview = {
        title: '',
        type: '',
        date: { start: { year: '', month: '' }, end: { year: '', month: '' } },
        desc: '',
        pointlist: [],
        techlist: [],
        images: [],
      }
      this.titleList = []

      if (this.modeFlag) {
        postsRef.get().then(function (snapshot) {
          snapshot.forEach((doc) => {
            this.titleList.push(doc.data().title)
            this.dataList[doc.data().title] = doc.data()
          })
          console.log(this.titleList)
        })
      }
    },
    onChangeselect() {
      this.portfolioPreview = this.dataList[this.portfolioPreview.title]
    },
    onEnterPointlist(text) {
      this.portfolioPreview.pointlist.push(text)
      this.pointText = ''
    },
    onEnterTechlist(text) {
      this.portfolioPreview.techlist.push({ text, duty: false })
      this.techText = ''
    },
    addTeclistClass(index) {
      console.log(index)
      this.portfolioPreview.techlist[index].duty =
        !this.portfolioPreview.techlist[index].duty
    },
    uploadImage(fileList) {
      // upload image
      if (fileList) {
        this.uploading = true // prevent submit while its uploading
        const ref = this.$fire.storage.ref()
        const thumbnailFile = fileList[0]
        const name = +new Date() + '_' + thumbnailFile.name // prevent duplicated data with current time
        ref
          .child('portfolio/thumbnails/' + name)
          .put(thumbnailFile)
          .then((snapshot) => {
            this.uploading = false
            alert('업로드 성공!')
            snapshot.ref.getDownloadURL().then((url) => {
              // console.log(this.portfolioPreview);
              if (url) this.portfolioPreview.images.push(url)
            })
          })
      }
    },
  },
  mounted() {
    //   this.onSubmit(this.history);
  },
}
</script>
<style lang="scss" scoped>
.Portfolio-admin {
  width: 465px;
  margin: 0 auto;
  overflow-y: scroll;
  .Portfolio-admin-header {
    text-align: right;
    .btn-mode {
      padding: 2px;
      background-color: black;
      color: white;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
    }
    .insert {
      background-color: white;
      color: black;
    }
  }
  p {
    margin: 0;
    input,
    textarea {
      border: 0;
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
  .Portfolio-admin-techlist {
    li {
      display: inline-block;
      margin-left: 0.3vw;
      margin-right: 0.3vw;
      color: #222;
      background-color: #666;
      padding: 0.3vw;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        background-color: #fff;
      }
    }
    .my-work {
      background-color: #ddd;
      color: #000;
      &:hover {
        cursor: pointer;
        background-color: #fff;
      }
    }
  }
  .Portfolio-admin-imglist {
    li {
      display: inline-block;
      img {
        width: 10vw;
      }
    }
  }
  .btn-submit {
    float: right;
  }
}
</style>
