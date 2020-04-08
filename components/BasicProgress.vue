<!-- 基础组件 进度条 -->
<template>
  <div class="v-progress">
    <div class="v-progress-bar" v-if="type === 'line'">
      <div class="v-progress-outer" :style="{ width: `${width}px` }">
        <div
          class="v-progress-inner"
          :style="{ backgroundColor: `${strokeBackgroundColor}` }"
        >
          <div
            class="v-progress-bg"
            :style="{
              width: `${percentage}%`,
              height: `${strokeWidth}px`,
              background: `${lineColor}`,
            }"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="v-progress-circle"
      v-if="type === 'circle' || type === 'dashboard'"
    >
      <div
        class="v-progress-inner"
        :style="{ width: `${width}px`, height: `${width}px` }"
      >
        <svg viewBox="0 0 100 100">
          <defs v-if="colorIsObject">
            <linearGradient
              :id="linearGradientId"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" :stop-color="strokeColor.start"></stop>
              <stop offset="100%" :stop-color="strokeColor.end"></stop>
            </linearGradient>
          </defs>
          <path
            class="v-progress-circle-trail"
            :d="trackPath"
            :stroke-width="relativeStrokeWidth"
            fill="none"
            :style="trailPathStyle"
          ></path>
          <path
            class="v-progress-circle-path"
            :d="trackPath"
            :stroke="`url(#${linearGradientId})`"
            stroke-linecap="round"
            :stroke-width="percentage ? relativeStrokeWidth : 0"
            fill="none"
            :style="circlePathStyle"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
let id = 0;
export default {
  name: 'basic-progress',
  components: {},
  props: {
    type: {
      // 进度条类型 可选值：line/circle/dashboard  默认值 line
      type: String,
      default: 'line',
      validator: (val) => ['line', 'circle', 'dashboard'].indexOf(val) > -1,
    },
    percentage: {
      // 百分比（必填） 默认值 0
      type: Number,
      default: 0,
      required: true,
    },
    strokeColor: {
      // 进度条颜色（支持渐变色，只支持线性渐变）
      type: String | Object,
      default: '#4CECFD',
    },
    strokeBackgroundColor: {
      // 进度条背景色
      type: String,
      default: '#163660',
    },
    strokeWidth: {
      // 进度条的宽度 line: 指线性进度条高度；circle,dashboard：指环形进度条宽度
      type: Number,
      default: 10,
    },
    width: {
      // 进度条的大小 line: 指线性进度条宽度；circle,dashboard：指环形进度条画布宽度
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      id: id++,
    };
  },
  computed: {
    linearGradientId() {
      return `v-progress-gradient-${this.id}`;
    },
    colorIsObject() {
      return typeof this.strokeColor === 'object';
    },
    lineColor() {
      if (this.colorIsObject) {
        return `linear-gradient(to right, ${this.strokeColor.start}, ${this.strokeColor.end})`;
      } else {
        return this.strokeColor;
      }
    },
    // 转成相对svg画布大小
    relativeStrokeWidth() {
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    radius() {
      if (this.type === 'circle' || this.type === 'dashboard') {
        return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
      } else {
        return 0;
      }
    },
    trackPath() {
      const radius = this.radius;
      const isDashboard = this.type === 'dashboard';
      return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `;
    },
    perimeter() {
      return 2 * Math.PI * this.radius;
    },
    rate() {
      return this.type === 'dashboard' ? 0.75 : 1;
    },
    strokeDashoffset() {
      const offset = (-1 * this.perimeter * (1 - this.rate)) / 2;
      return `${offset}px`;
    },
    trailPathStyle() {
      return {
        stroke: this.strokeBackgroundColor,
        'stroke-dasharray': `${this.perimeter * this.rate}px, ${
          this.perimeter
        }px`,
        'stroke-dashoffset': this.strokeDashoffset,
      };
    },
    circlePathStyle() {
      return {
        'stroke-dasharray': `${
          this.perimeter * this.rate * (this.percentage / 100)
        }px, ${this.perimeter}px`,
        'stroke-dashoffset': this.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
      };
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.v-progress-outer {
  display: inline-block;
  width: 100%;
  margin-right: 0;
  padding-right: 0;
}
.v-progress-inner {
  position: relative;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 100px;
}
.v-progress-bg {
  transition: width 0.6s;
}
</style>
