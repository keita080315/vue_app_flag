<template>
  <div class="content">
    <div>
      <div class="title">
        <p v-show="startDisplay">- Flag Game -</p>
        <div class="question" v-if="gameDisplay">
          <p>Q{{ numQue }}.「{{ color }}」{{ moveArr[moveParam] }}</p>
          <div class="count-bar">
            <div class="bar-content" v-bind:class="{active:countBar}"></div>
          </div>
          <p>{{ score }}</p>
        </div>
        <div class="game-result-modal" v-if="resultDisplay">
          <button v-on:click="gameResult">×</button>
          <P>あなたのスコア<br><span>{{ score }}点</span></P>
        </div>
      </div>
      <div class="content-center">
        <ul class="level-content" v-show="startDisplay">
          <li v-on:click="startGame">初級</li>
          <li v-on:click="startGame">中級</li>
          <li v-on:click="startGame">上級</li>
        </ul>
        <div class="tap-button left" v-on:click="leftClick">
          <p class="font-bold text-lg">Tap!</p>
        </div>
        <div class="person">
          <img class="img-flag left" src="../assets/flag_red.svg"
               v-bind:class="{'active': leftStatus === 1, '':leftStatus === 0 }">
          <img class="img-shoulder left" src="../assets/left_shoulder.svg"
               v-bind:class="{'active': leftStatus === 1, '':leftStatus === 0 }">
          <img class="img-person" src="../assets/person.svg">
          <img class="img-shoulder right" src="../assets/right_shoulder.svg"
               v-bind:class="{'active': rightStatus === 1, '':rightStatus === 0 }">
          <img class="img-flag right" src="../assets/flag_white.svg"
               v-bind:class="{'active': rightStatus === 1, '':rightStatus === 0 }">
        </div>
        <div class="tap-button right" @click="rightClick()">
          <p>Tap!</p>
        </div>
        <div class="result" v-if="gameDisplay">
          <font-awesome-icon v-if="successIcon" class="success" icon="fa-regular fa-circle"/>
          <font-awesome-icon v-if="failureIcon" class="false" icon="fa-solid fa-xmark"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlagGame',
  data () {
    return {
      startDisplay: true,
      gameDisplay: false,
      color: 'あか',
      moveParam: 0,
      moveArr: ['あげて', 'さげて', 'さげないで', 'あげないで'],
      leftStatus: 0,
      rightStatus: 0,
      numQue: 1,
      count: 3,
      startCoun: null,
      score: 0,
      successIcon: false,
      failureIcon: false,
      countBar: false,
      resultDisplay: false
    }
  },
  methods: {
    judgeLeftFlag: function () {
      if (this.color === 'あか' && this.leftStatus !== this.moveParam % 2) {
        this.successIcon = true
        this.score += 10
        setTimeout(() => {
          this.successIcon = false
        }, 500)
      } else if (this.color === 'あか') {
        this.failureIcon = true
        setTimeout(() => {
          this.failureIcon = false
        }, 500)
      }
    },
    judgeRightFlag: function () {
      if (this.color === 'しろ' && this.rightStatus !== this.moveParam % 2) {
        this.successIcon = true
        this.score += 10
        setTimeout(() => {
          this.successIcon = false
        }, 500)
      } else if (this.color === 'しろ') {
        this.failureIcon = true
        setTimeout(() => {
          this.failureIcon = false
        }, 500)
      }
    },
    setQue: function () {
      this.numQue++
      const colorArr = ['あか', 'しろ']
      this.color = colorArr[Math.floor(Math.random() * colorArr.length)]
      this.moveParam = Math.floor(Math.random() * this.moveArr.length)
    },
    startCount: function () {
      let self = this
      if (this.count === 1) {
        self.judgeLeftFlag()
        self.judgeRightFlag()
        self.setQue()
        this.count = 4
      }
      this.count--
    },
    startGame: function () {
      let self = this
      this.score = 0
      this.numQue = 1
      this.startDisplay = !this.startDisplay
      this.gameDisplay = !this.gameDisplay
      this.startCoun = setInterval(function () {
        self.startCount()
      }, 1000)
      this.countBar = true
    },
    gameResult: function () {
      this.resultDisplay = false
    },
    leftClick: function () {
      this.leftStatus = this.leftStatus === 0 ? 1 : 0
    },
    rightClick: function () {
      this.rightStatus = this.rightStatus === 0 ? 1 : 0
    },
    reset: function () {
      Object.assign(this.$data, this.$options.data())
    }
  },
  watch: {
    leftStatus: function () {
      let self = this
      self.judgeLeftFlag()
      self.setQue()
      this.count = 4
    },
    rightStatus: function () {
      let self = this
      self.judgeRightFlag()
      self.setQue()
      this.count = 4
    },
    numQue: function () {
      let self = this
      if (this.numQue === 6) {
        clearInterval(this.startCoun)
        let scoreCopy = this.score
        self.reset()
        this.score = scoreCopy
        this.resultDisplay = true
      }
      this.countBar = false
      setTimeout(() => {
        this.countBar = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&family=Zen+Kaku+Gothic+New:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
}

.content {
  width: 100%;
  height: 100vh;
  background-color: #FF8C68;
}

.title {
  font-size: 150px;
  font-weight: bold;
  font-family: "American Typewriter";
  padding-top: 50px;
}

.question {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 80px;
}

.level-content {
  width: 400px;
  position: absolute;
  z-index: 10;
  margin: 9% auto 0;
}

.level-content li {
  list-style: none;
  font-weight: bold;
  font-size: xx-large;
  background-color: #fff;
  border: 4px solid #2c3e50;
  padding: 15px 40px;
  border-radius: 20px;
  margin: 20px auto;
}

.content-center {
  display: flex;
  justify-content: center;
  position: relative;
}

.tap-button {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: table;
  margin-top: 15%;
}

.tap-button p {
  font-size: 60px;
  font-weight: bold;
  display: table-cell;
  vertical-align: middle;
  font-family: "Arial Black";
  padding-bottom: 10px;
}

.tap-button.left {
  background-color: #BE1C1C;
  box-shadow: 6px 12px 0 #982929;
  margin-left: 10%;
}

.tap-button.right {
  background-color: #fff;
  box-shadow: 6px 12px 0 #DDDADA;
  margin-right: 10%;
}

.tap-button:active {
  box-shadow: none;
  transform: translateY(5px);
}

.person {
  padding-top: 5%;
  position: relative;
  width: 600px;
  margin: auto;
}

.img-person {
  width: 200px;
  height: auto;
  margin: auto;
  text-align: center;
}

.img-shoulder {
  width: 130px;
  height: auto;
  position: absolute;
  transition: 200ms;
}

.img-flag {
  width: 210px;
  height: auto;
  position: absolute;
  transition: 200ms;
}

.img-flag.left {
  top: 214px;
  left: 10px;
}

.img-flag.left.active {
  top: 112px;
  left: 5px;
  transform: rotate(50deg);
}

.img-flag.right {
  top: 214px;
  right: 10px;
}

.img-flag.right.active {
  top: 112px;
  right: 5px;
  transform: rotate(-50deg);
}

.img-shoulder.left {
  top: 192px;
  left: 165px;
}

.img-shoulder.left.active {
  top: 182px;
  left: 155px;
  transform: rotate(30deg);
}

.img-shoulder.right {
  top: 192px;
  right: 165px;
}

.img-shoulder.right.active {
  top: 182px;
  right: 155px;
  transform: rotate(-30deg);
}

.result {
  display: block;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

.result .success {
  display: block;
  color: #8CEC9B;
  font-weight: bold;
  font-size: 250px;
}

.result .false {
  display: block;
  color: #2c3e50;
  font-size: 350px;
  margin: auto;
}

.count-bar {
  margin: 30px auto;
  border-radius: 20px;
  width: 400px;
  height: 30px;
  border: solid 5px #2c3e50;
}

.bar-content {
  border-radius: 20px;
  height: 30px;
  background-color: #2c3e50;
}

.bar-content.active {
  animation: count 2.5s ease;
}

@keyframes count {
  0% {
    width: 400px;
  }
  100% {
    width: 0;
  }
}

.game-result-modal {
  width: 500px;
  height: 320px;
  background-color: #294298;
  border-radius: 20px;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border: #2c3e50 solid 8px;

}

.game-result-modal p {
  margin-top: 100px;
  color: orange;
  font-size: 30px;
  font-family: 'Noto Sans JP', sans-serif;
}

.game-result-modal span {
  font-size: 60px;
}

.game-result-modal button {
  background-color: inherit;
  border: solid 2px #294298;
  width: 20px;
  height: 20px;
  color: #DDDADA;
  font-size: 45px;
  float: right;
  margin-right: 40px;
  margin-top: 10px;
}
</style>
