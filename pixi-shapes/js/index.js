(function () {

  const app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1
  })
  document.getElementById('screen').appendChild(app.view)

  const color = 0x4caf50
  const lineColor = 0x000000
  const types = [
    '3 sides',
    '4 sides',
    '5 sides',
    '6 sides',
    'circle',
    'ellipse',
    'star'
  ]
  let gravity = 1
  let figures = []
  let perSecond = 1
  let tickCount = 0
  let shapesLimit = 10

  let bgTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height)
  let bgSprite = new PIXI.Sprite(bgTexture)
  app.stage.addChild(bgSprite)
  app.stage.interactive = true
  app.stage.cursor = 'pointer'
  app.stage.on('click', (e) => {
    // console.log(e.data.global.x)
    let f = figure(types[random()])
    const getX = () => {
      if (e.data.global.x < 50) return 50
      if (e.data.global.x > 750) return 750
      return e.data.global.x
    }
    const getY = () => {
      let y = e.data.global.y
      if (y < 50) return 0
      if (y > 550) return 500
      return y - 50
    }
    f.position.x = getX()
    f.position.y = getY()
    figures.push(f)
    app.stage.addChild(f)
    refreshShapesCount(figures.length)
  })

  document.querySelector('.gen-minus-btn').addEventListener('click', () => {
    if (perSecond > 1) {
      perSecond -= 1
      refreshShapesPerSec()
    }

  })
  document.querySelector('.gen-plus-btn').addEventListener('click', () => {
    if (perSecond < 20) {
      perSecond += 1
      refreshShapesPerSec()
    }
  })

  document.querySelector('.gravity-minus-btn').addEventListener('click', () => {
    if (gravity > 1) {
      gravity -= 1
      refreshGravity()
    }
  })

  document.querySelector('.gravity-plus-btn').addEventListener('click', () => {
    if (gravity < 10) {
      gravity += 1
      refreshGravity()
    }
  })

  app.ticker.add((tick) => {
    if (tickCount > 60 / perSecond) {
      // console.log(figures)
      let f = figure(types[random()])
      console.log(f)
      let push = figures.push(f)
      app.stage.addChild(f)
      refreshShapesCount(figures.length)
      tickCount = 0
    } else {
      tickCount += tick
    }
    figures.forEach((f, idx) => {
      if (f._destroyed === true) {
        figures.splice(idx, 1)
        refreshShapesCount(figures.length)
      } else {
        if (f.position.y >= 500) {
          f.destroy()
          refreshShapesCount(figures.length)
        } else {
          f.position.y += gravity
        }
      }
    })
  })

  function figure(type) {
    switch (type) {
      case types[0]:
        let side3 = new PIXI.Graphics()
        side3.lineStyle(1, lineColor, 1)
        side3.beginFill(color)
        side3.drawPolygon([
          new PIXI.Point(0, 0),
          new PIXI.Point(+50, 100),
          new PIXI.Point(-50, 100)
        ])
        side3.endFill()
        side3.position.x = (app.screen.width - 100) * Math.random() + 50
        side3.position.y = 0
        side3.interactive = true
        side3.cursor = 'pointer'
        side3.on('click', () => {
          side3.destroy()
        })
        return side3
      case types[1]:
        let side4 = new PIXI.Graphics()
        side4.lineStyle(1, lineColor, 1)
        side4.beginFill(color)
        side4.drawPolygon([
          new PIXI.Point(-50, 0),
          new PIXI.Point(+50, 0),
          new PIXI.Point(+50, 100),
          new PIXI.Point(-50, 100)
        ])
        side4.endFill()
        side4.position.x = (app.screen.width - 100) * Math.random() + 50
        side4.position.y = 0
        side4.interactive = true
        side4.cursor = 'pointer'
        side4.on('click', () => {
          side4.destroy()
        })
        return side4
      case types[2]:
        let side5 = new PIXI.Graphics()
        side5.lineStyle(1, lineColor, 1)
        side5.beginFill(color)
        side5.drawPolygon([
          new PIXI.Point(0, 0),
          new PIXI.Point(+50, 42),
          new PIXI.Point(+32, 100),
          new PIXI.Point(-32, 100),
          new PIXI.Point(-50, 42)
        ])
        side5.endFill()
        side5.position.x = (app.screen.width - 100) * Math.random() + 50
        side5.position.y = 0
        side5.interactive = true
        side5.cursor = 'pointer'
        side5.on('click', () => {
          side5.destroy()
        })
        return side5
      case types[3]:
        let side6 = new PIXI.Graphics()
        side6.lineStyle(1, lineColor, 1)
        side6.beginFill(color)
        side6.drawPolygon([
          new PIXI.Point(-27, 0),
          new PIXI.Point(+27, 0),
          new PIXI.Point(+50, 50),
          new PIXI.Point(+27, 100),
          new PIXI.Point(-27, 100),
          new PIXI.Point(-50, 50),
        ])
        side6.endFill()
        side6.position.x = (app.screen.width - 100) * Math.random() + 50
        side6.position.y = 0
        side6.interactive = true
        side6.cursor = 'pointer'
        side6.on('click', () => {
          side6.destroy()
        })
        return side6
      case types[4]:
        let circle = new PIXI.Graphics()
        circle.lineStyle(1, lineColor, 1)
        circle.beginFill(color)
        circle.drawCircle(100, 50, 50)
        circle.endFill()
        circle.position.x = (app.screen.width - 100) * Math.random() + 50
        // circle.position.y = 0
        circle.interactive = true
        circle.cursor = 'pointer'
        circle.on('click', () => {
          circle.destroy()
        })
        return circle
      case types[5]:
        let ellipse = new PIXI.Graphics()
        ellipse.lineStyle(1, lineColor, 1)
        ellipse.beginFill(color)
        ellipse.drawEllipse((app.screen.width - 100) * Math.random() + 50, 20, 50, 40)
        ellipse.endFill()
        // ellipse.position.x = (app.screen.width - 100) * Math.random() + 50
        // ellipse.position.y = 0
        ellipse.interactive = true
        ellipse.cursor = 'pointer'
        ellipse.on('click', () => {
          ellipse.destroy()
        })
        return ellipse
      case types[6]:
        let star = new PIXI.Graphics()
        star.lineStyle(1, lineColor, 1)
        star.beginFill(color)
        star.drawStar((app.screen.width - 100) * Math.random() + 50, 50, 5, 50)
        star.endFill()
        // ellipse.position.x = (app.screen.width - 100) * Math.random() + 50
        // ellipse.position.y = 0
        star.interactive = true
        star.cursor = 'pointer'
        star.on('click', () => {
          star.destroy()
        })
        return star
      default:
        return null
    }
  }

  function refreshShapesCount(count) {
    let el = document.querySelector('.shapes-count__number')
    el.innerHTML = count
  }

  function refreshShapesPerSec() {
    let el = document.querySelector('.shapes-generation__number')
    el.innerHTML = perSecond
  }

  function refreshGravity() {
    let el = document.querySelector('.gravity__value')
    el.innerHTML = gravity
  }

  function random() {
    let r = 7
    while (r >= 7) {
      console.log('while')
      r = Math.round(Math.random() * 10)
    }
    console.log(r)
    return r
  }
}())
