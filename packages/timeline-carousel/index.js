// packages/textarea/index.js

// 导入组件，组件必须声明 name
import timelineCarousel from './timelineCarousel.vue'

// 为组件添加 install 方法，用于按需引入
timelineCarousel.install = function (Vue) {
    Vue.component(timelineCarousel.name, timelineCarousel)
}

export default timelineCarousel