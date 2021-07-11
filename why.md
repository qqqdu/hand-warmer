
## 为什么有这个项目  

受 [云空调](https://github.com/YunYouJun/air-conditioner) 启发，我想做一个云暖手宝。重点是，我的暖手宝真的能暖手！  

### 大夏天的为什么要暖手？

各位大佬的办公室空调温度开的一定很低，此时云空调显得不重要了。

为什么呢？

![](./public/cold.webp)  
因为我们特么的冷啊！！隔壁同事偷偷把空调调到 16 摄氏度......而你只能用仅有的毛毯盖住大腿，娇嫩的双手还在被刺骨的空调风无情的吹着。这你能忍？？

你又社交恐惧，也不想因为调高温度和同事多说一句话。那你能咋，总不能戴个手套吧。这样不会被当成变态吗。

你需要一个暖手宝，但又不能被别人看见你在用暖手宝。是吧，那多奇怪，外面将近 40 度呢。

所以 `Cloud Hand-Warmer` 诞生了！它小巧甚至隐形，它随时随地温暖着你娇贵的玉手！

### 绝美的思路

回忆一下你在被子里用电脑刷 b 站 看视频的时候，看不了几分钟 `电脑就变的烫手` 了，这个场景很明显是电脑散热不正常。等等？？！......

散热？我们的生产工具会散热？那何不让它的热量 `散发的更大些`，以至于让它来温暖我们瑟瑟发抖的双手？看到没有，这不就解决以上的需求了吗？

我们的思路就来了，让电脑持续发热！用 `资本家的电脑` 温暖我们 `无产阶级`！  

## 产品设计  

用 `Javascript` 将 `cpu` 跑满很简单，我们在日常工作中经常这么干（老板，不是我bug多，当时手真的冷），但 `Javascript` 一直在阻塞运行时，视图层是操作不了的。这就可能导致网页崩溃：暖手宝启动但关不掉了......  

这肯定是不行的，所以我使用 `Web Worker` 来做大数运算，这样即使我们的 CPU 利用率很高了，但我们还是可以停止 暖手宝的作业，使 CPU 回到正常水平。  
```javascript
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
```
在主进程中，当开关切换时，将 是否开始 `isStart` 和 挡位 `level` 变量传入子线程中。
```javascript
self.addEventListener('message', function (e) {
    const level = e.data.level || 1
    if (e.data.isStart) {
        startTimer(level)
    } else {
        stopTimer()
    }
}, false);

```
在 `work.js` 中，监听主线程发来的消息，`isStart` 为 `true` 时，开启大数计算定时器，疯狂侵占 `CPU` 资源。