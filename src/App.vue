<template>
  <div>
    <div class="warmer">
      <div class="warmer-back" v-if="isStart"></div>
      <!-- <p>强度 : {{ nowLevel }}</p> -->
      <!-- <button @click="addWarm">+</button>
    <button @click="subWarm">-</button> -->
      <div class="warmer-warn"></div>
      <h3 class="warmer-title">Cloud Hand-Warmer</h3>
      <div class="warmer-level">
        <li
          v-for="(item, index) in maxLevel"
          :key="index"
          :style="{ background: item <= nowLevel && isStart ? '#fd4c24' : '' }"
        >
          {{}}
        </li>
      </div>
      <li>
        <span
          class="arrow arrow-top"
          :class="{ 'arrow-click': isStart }"
          @click="addWarm"
        ></span>
      </li>
      <li>
        <span
          class="arrow arrow-bottom"
          :class="{ 'arrow-click': isStart }"
          @click="subWarm"
        ></span>
      </li>
      <div class="btn btn-switch" @click="switchBtn"></div>
      <img src="./assets/bear.png" class="bg-img" />
      <!-- <div>CPU: {{durTime}}</div> -->
    </div>
    <ul class="warmer-tips">
      <li>说明：</li>
      <!-- <li>- <b style="color: red;">如果 <b style="color: black;">数值： {{durTime}} 大于100</b>，说明”电量“负载了，你要降档位或者关掉它了</b></li> -->
      <li>- 答应我，先把本地代码 push 掉！！！</li>
      <li>- 主板烧了别找我（问问老板算不算工伤）</li>
      <li>- 网页崩溃资料没保存别找我</li>
      <li>- 暖和吗，暖和就完事儿了</li>
      <li>- 为什么？为什么？为什么？<a href='https://github.com/qqqdu/hand-warmer/blob/master/README.md'>手册</a></li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const maxLevel = 8;
    const durTime = ref(0);
    const isStart = ref(false);
    const worker = new Worker("main.js");
    const nowLevel = ref(1);
    const switchBtn = () => {
      isStart.value = !isStart.value;
      worker.postMessage({
        isStart: isStart.value,
        level: nowLevel.value,
      });
    };
    worker.onmessage = (ev) => {
      durTime.value = new Date().getTime() - ev.data;
    };
    function addWarm() {
      if (nowLevel.value >= maxLevel || !isStart.value) {
        return;
      }
      nowLevel.value++;
      worker.postMessage({
        isStart: true,
        level: nowLevel.value,
      });
    }
    function subWarm() {
      if (nowLevel.value <= 1 || !isStart.value) {
        return;
      }
      nowLevel.value--;
      worker.postMessage({
        isStart: true,
        level: nowLevel.value,
      });
    }
    return {
      switchBtn,
      worker,
      isStart,
      nowLevel,
      durTime,
      maxLevel,
      addWarm,
      subWarm,
    };
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
.warmer {
  width: 500px;
  height: 300px;
  border-radius: 60px;
  background: #d7c4b6;
  box-shadow: 4px 4px 10px #805a4d;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.warmer-back {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 60px;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: breathe;
  -webkit-animation-duration: 2700ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}
@-webkit-keyframes breathe {
  0% {
    opacity: 0.5;
    box-shadow: 4px 4px 10px #805a4d;
  }
  100% {
    opacity: 1;
    box-shadow: 10px 8px 8px rgb(247, 125, 125);
  }
}

.warmer:before {
  content: "";
  display: block;
  border: 100px solid #9e715e;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 50%;
  box-shadow: 0 0 4px black;
}
.warmer:after {
  content: "";
  display: block;
  border: 90px solid white;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 50%;
}
.warmer p {
  display: block;
  width: 100%;
}
.warmer-title {
  color: #67453b;
  padding-top: 20px;
  font-size: 12px;
}
.btn-switch {
  width: 50px;
  height: 50px;
  border: 1px solid #67453b;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 3px black;
  cursor: pointer;
  z-index: 10;
  background: #996e5b;
}
.bg-img {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
}
.warmer-level {
  width: 20px;
  height: auto;
  position: absolute;
  left: 50px;
  top: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
}
.warmer-level li {
  width: 100%;
  height: 3px;
  margin-top: 5px;
  background: #996e5b;
}
/* .warmer-level li:hover {
  background: #fd4c24;
} */
li {
  list-style: none;
}
.arrow {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-top: 2px solid #d7c4b6;
  top: 50%;
  border-right: 2px solid #d7c4b6;
  position: absolute;
  left: 50%;
  z-index: 20;
}
.arrow-click {
  cursor: pointer;
}
.arrow-click:hover {
  border-color: #67453b;
}
.arrow-top {
  transform: rotate(-45deg);
  margin-top: -56px;
  margin-left: -8px;
}
.arrow-right {
  transform: rotate(45deg);
}
.arrow-bottom {
  transform: rotate(135deg);
  margin-left: -8px;
  top: 63%;
}
.arrow-left {
  transform: rotate(-135deg);
}
.warmer-tips {
  text-align: left;
  margin-top: 200px;
  font-size: 12px;
  color: #67453b;
}
.warmer-tips li {
  margin-top: 5px;
}
</style>
