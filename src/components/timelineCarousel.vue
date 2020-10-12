<template>
  <div class="container" :style="changeThemeColor">
    <div class="full-width slider" v-if="carouseIsShow">
      <transition-group
        :enter-active-class="enterActiveClass"
        >
        <div
          class="slider-box"
          v-for="(item, index) in carouselList"
          :key="item.id"
          v-show="index === currentIndex"
          @mouseover="handleSliderMouseOver"
          @mouseleave="handleSliderMouseLeave"
        >
          <div class="slider-box__item">
            <img :src="item.img" alt="" />
          </div>
          <div class="slider-box__item">
            <div class="item-title-bg" v-if="timelineList[index]">
              {{ timelineList[index].text }}
            </div>
            <div class="item-title">{{ item.title }}</div>
            <div class="item-info">{{ item.info }}</div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="timeline" :class="{mt: !carouseIsShow}">
      <div class="line full-width"></div>
      <div class="timeline-container">
        <div class="item" @click="go(prevIndex, 'prev')">
          <button
            :class="{ 'item-disabled': !loop && currentIndex === 0 }"
            class="item-prev"
            :disabled="!loop && currentIndex === 0"
          >
            <span class="iconfont icon-jiantouarrow506"></span>
          </button>
        </div>
        <div class="item">
          <div
            class="list"
            v-for="(item, index) in timelineList"
            :key="item.id"
            @click="go(index, '')"
            @mouseover="handleMouseOver(item.text, index)"
            @mouseleave="handleMouseLeave(item.text, index)"
            :style="{
              transform: `translateX(${translateNum}px)`,
              width: `${timelineWidth}px`,
            }"
          >
            <div
              class="circle"
              :class="{ active: index === currentIndex }"
            ></div>
            <div
              class="line"
              :class="{
                on: index === currentIndex && onIsActive,
                go: index === currentIndex && !onIsActive,
              }"
            ></div>
            <div class="text">
              {{ item.text }}
            </div>
            <div ref="tip" class="tip">
              {{ item.text }}
              <div class="triangle"></div>
            </div>
          </div>
        </div>
        <div class="item" @click="go(nextIndex, 'next')">
          <button
            class="item-next"
            :disabled="!loop && currentIndex === timelineList.length - 1"
            :class="{
              'item-disabled':
                !loop && currentIndex === timelineList.length - 1,
            }"
          >
            <span class="iconfont icon-jiantouarrow484"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    timelineList: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            text: "2020-09-28",
          },
          {
            id: 2,
            text: "2020-09-28 12:00:002020-09-28 12:00:00",
          },
          {
            id: 3,
            text: "0333333333333333",
          },
          {
            id: 4,
            text: "04",
          },
          {
            id: 5,
            text: "05",
          },
          {
            id: 6,
            text: "06",
          },
          {
            id: 7,
            text: "07",
          },
          {
            id: 8,
            text: "08",
          },
          {
            id: 9,
            text: "09",
          },
          {
            id: 10,
            text: "10",
          },
        ];
      },
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    carouselList: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            img: require("../assets/images/1.jpg"),
            title: "陶渊明",
            info: "盛年不重来，一日难再晨。及时宜自勉，岁月不待人。",
          },
          {
            id: 2,
            img: require("../assets/images/2.jpg"),
            title: "老子",
            info: "千里之行，始于足下。",
          },
          {
            id: 3,
            img: require("../assets/images/3.jpg"),
            title: "朱熹",
            info: "少年易学老难成，一寸光阴不可轻。",
          },
          {
            id: 4,
            img: require("../assets/images/4.jpg"),
            title: "王勃",
            info: "海内存知已，天涯若比邻。",
          },
          {
            id: 5,
            img: require("../assets/images/5.jpg"),
            title: "高适",
            info: "莫愁前路无知已，天下谁人不识君。",
          },
          {
            id: 6,
            img: require("../assets/images/6.jpg"),
            title: "孟子",
            info: "穷则独善其身，达则兼济天下。",
          },
          {
            id: 7,
            img: require("../assets/images/7.jpg"),
            title: "杜甫",
            info: "读书破万卷，下笔如有神。",
          },
          {
            id: 8,
            img: require("../assets/images/1.jpg"),
            title: "陶渊明",
            info: "盛年不重来，一日难再晨。及时宜自勉，岁月不待人。",
          },
          {
            id: 9,
            img: require("../assets/images/2.jpg"),
            title: "老子",
            info: "千里之行，始于足下。",
          },
          {
            id: 10,
            img: require("../assets/images/3.jpg"),
            title: "朱熹",
            info: "少年易学老难成，一寸光阴不可轻。",
          },
        ];
      },
    },
    timelineNum: {
      type: Number,
      default: 6,
    },
    timelineWidth: {
      type: Number,
      default: 150,
    },
    themeColor: {
      type: String,
      default: "#bd1622",
    },
    enterActiveClass: {
      type: String,
      default: 'animate__animated animate__fadeInLeft'
    },
    mouseEvent: {
      type: Boolean,
      default: false
    },
    carouseIsShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null,
      timer2: null,
      onIsActive: true,
      translateNum: 0,
    };
  },
  computed: {
    prevIndex() {
      if (!this.loop) {
        if (this.currentIndex == 0) {
          return 0;
        } else {
          return this.currentIndex - 1;
        }
      } else {
        if (this.currentIndex == 0) {
          return this.timelineList.length - 1;
        } else {
          return this.currentIndex - 1;
        }
      }
    },
    nextIndex() {
      if (!this.loop) {
        if (this.currentIndex == this.timelineList.length - 1) {
          return this.timelineList.length - 1;
        } else {
          return this.currentIndex + 1;
        }
      } else {
        if (this.currentIndex == this.timelineList.length - 1) {
          return 0;
        } else {
          return this.currentIndex + 1;
        }
      }
    },
    changeThemeColor() {
      return {
        "--theme-color": this.themeColor,
      };
    },
  },
  methods: {
    go(index, str) {
      this.currentIndex = index;
      this.onIsActive = true;
      if (this.autoPlay) {
        this.setGo();
        this.setOnActive();
      }
      this.calcTranslateNum(str);
      this.$emit("getCurrentItem", index, this.timelineList[index], this.carouselList[index]);
    },
    setOnActive() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.onIsActive = false;
      }, 2800);
    },
    setGo() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.go(this.nextIndex);
        this.calcTranslateNum("next");
      }, 3600);
    },
    calcTranslateNum(str) {
      const length = this.timelineList.length - 1;
      if (str === "next") {
        if (this.currentIndex >= this.timelineNum) {
          this.translateNum = (length - this.timelineNum) * -this.timelineWidth;
        }
        if (this.currentIndex === 0) {
          this.translateNum = 0;
        }
      } else if (str === "prev") {
        if (this.currentIndex <= this.timelineNum) {
          this.translateNum = 0;
          return;
        }
        if (this.currentIndex >= this.timelineNum) {
          this.translateNum =
            (length - this.timelineNum) * -this.timelineWidth;
          return;
        }
        this.translateNum += this.timelineWidth;
      } else {
        if (this.currentIndex < this.timelineNum) {
          this.translateNum = 0;
          return;
        }
        if (this.currentIndex >= this.timelineNum) {
          this.translateNum =
            (length + 1 - this.timelineNum) * -this.timelineWidth;
          return;
        }
        this.translateNum += this.timelineWidth;
      }
    },
    handleMouseOver(text, index) {
      if (text.length >= 16) {
        this.$refs.tip[index].style = "display: block;";
      }
    },
    handleMouseLeave(text, index) {
      if (text.length >= 16) {
        this.$refs.tip[index].style = "display: none;";
      }
    },
    handleSliderMouseOver() {
      if (this.autoPlay && this.mouseEvent) {
        clearInterval(this.timer);
        clearTimeout(this.timer2);
      }
    },
    handleSliderMouseLeave() {
      if (this.autoPlay && this.mouseEvent) {
        this.setGo();
        this.setOnActive();
      }
    },
  },
  mounted() {
    if (this.autoPlay) {
      this.setGo();
      this.setOnActive();
    }
    this.$emit("getCurrentItem", 0, this.timelineList[0], this.carouselList[0]);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.timer2);
  },
};
</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  .slider {
    width: 100%;
    padding: 12% 15% 4% 15%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      height: 260px;
    }
    .leave-to {
      position: relative;
    }
    .enter-active-class {
      animation: 1s fadeIn linear;
    }
    .slider-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        animation: 1s fadeIn linear;
      }
      .slider-box__item {
        width: 50%;
        height: 100%;
        &:nth-child(2) {
          padding-left: 10%;
          box-sizing: border-box;
          position: relative;
          .item-title-bg {
            position: absolute;
            color: rgba(0, 0, 0, 0.05);
            right: 0;
            top: 0;
            font-size: 5rem;
            filter: blur(3px);
            opacity: 1;
            width: 100%;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .item-title {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin-bottom: 20px;
          }
          .item-info {
            font-size: 14px;
            color: #5a5b5b;
            line-height: 24px;
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
  .timeline {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    &.mt {
      margin-top: 80px;
    }
    .line {
      width: 100%;
      height: 1px;
      background: #ccc;
    }
    .timeline-container {
      width: 100%;
      .item {
        width: 12.5%;
        float: left;
        text-align: center;
        &:nth-child(2) {
          width: 75%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          padding-top: 150px;
          margin-top: -150px;
        }
        .list {
          position: relative;
          text-align: center;
          cursor: pointer;
          transition: 0.5s all linear;
          display: flex;
          justify-content: center;
          &:last-child {
            .line {
              display: none;
            }
          }
          .circle {
            position: absolute;
            left: 48%;
            width: 8px;
            height: 8px;
            background: #ccc;
            border-radius: 50%;
            margin: -4px auto 0;
            z-index: 2;
            &.active {
              background-color: var(--theme-color);
            }
            &:hover {
              background-color: var(--theme-color);
            }
          }
          .line {
            width: 100%;
            height: 1px;
            position: absolute;
            left: 48%;
            top: -1px;
            opacity: 0;
            z-index: 1;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: var(--theme-color);
              animation-fill-mode: both;
              animation-duration: 2.8s;
              animation-timing-function: linear;
            }
          }
          .line.on {
            opacity: 1;
            &::after {
              animation-name: line_1;
            }
          }
          .line.go {
            opacity: 1;
            &::after {
              right: 0;
              left: auto;
              animation-duration: 0.8s;
              animation-name: line_2;
            }
          }
          .text {
            margin-top: 14px;
            width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: relative;
          }
          .tip {
            position: absolute;
            top: -55px;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: var(--theme-color);
            color: #fff;
            width: max-content;
            display: none;
            .triangle {
              width: 0;
              height: 0;
              border-top: 8px solid var(--theme-color);
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
              position: absolute;
              left: 50%;
              bottom: -8px;
              margin-left: -3.5px;
            }
          }
        }
        .item-prev,
        .item-next {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          color: #909090;
          background-color: #e9e9e9;
          cursor: pointer;
          margin: -24px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          outline: none;
          &:hover {
            color: #fff;
            background-color: var(--theme-color);
          }
          &.item-disabled {
            background: #666;
            cursor: no-drop;
          }
        }
      }
    }
  }
}
@keyframes line_1 {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes line_2 {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>