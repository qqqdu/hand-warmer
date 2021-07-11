let timer = null
setInterval(() => {
    const now = new Date().getTime()
    new Promise.then(() => {
    self.postMessage(new Date().getTime() - now)
        
    })
}, 1000)
self.addEventListener('message', function (e) {
    const level = e.data.level || 1
    if (e.data.isStart) {
        startTimer(level)
    } else {
        stopTimer()
    }
}, false);


function startTimer(levelNum) {
    stopTimer();
    function cal() {
        let i = 9999999989999;
        let b = Math.random(22232323) * i
        console.log(b)
        return b
    }
    timer = setInterval(() => {
        for (let num = 0; num < 20000 * levelNum; num++) {
           cal();
        }
    }, 1000)
}
function stopTimer() {
    if(timer)
        clearInterval(timer)
}
