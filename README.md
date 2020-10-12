一个基于vue的时间轴轮播图插件。

##DEMO演示
* [项目演示](https://chenfalse.github.io/timeline-carousel/#/)

##使用方式
* 安装
```javascript
npm i timeline-carousel --save
```
* 在main.js中使用
```javascript
import timelineCarousel from 'timeline-carousel'
Vue.use(timelineCarousel)
```
* 组件中使用
```javascript
<template>
  <timeline-carousel 
    :timelineList="[{
      id: 1,
      text: '2020-09-28'
    }]"
    :carouselList="[{
      id: 1,
      img: require('./images/1.jpg'),
      title: '陶渊明',
      info: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人。'
    }]"
  />
</template>

```

##属性

名称 | 默认值 | 类型 | 简介 | 注意
----------|-----------|---------|----------|----------
themeColor | #bd1622 | String | 主题色 |  |
timelineList | []  | Array | 时间轴列表 | 数量需与轮播图列表一致
carouselList | []  | Array | 轮播图列表 | 数量需与时间轴列表一致
carouseIsShow | true | Boolean | 是否显示轮播图 |  |
autoPlay | true | Boolean | 是否自动播放 | |
loop | true | Boolean | 是否循环播放 | |
timelineNum | 6 | Number | 时间轴显示数量 |  |
timelineWidth | 150 | Number | 时间轴item宽度 | 默认150宽度，如果更改宽度，组件中展示几个元素需要与timelineNum属性展示数量保持一致 |
enterActiveClass | animate__animated animate__fadeInLeft | String | 轮播图切换动画 | animate.css中的如何动画都可以使用 |
mouseEvent | false | Boolean | 鼠标移入轮播图禁止滚动 | |

##事件

名称 | 返回值 | 说明 
----------|-----------|---------
getCurrentItem | getCurrentItem(index, timelineItem, carouselItem){} | (索引值, 时间轴Item, 轮播图Item)


##作者信息
- 陈佳兵
- qq：1014984541
- 邮箱：1014984541@qq.com
- github: (https://github.com/chenfalse/timeline-carousel)
