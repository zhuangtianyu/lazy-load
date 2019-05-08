const state = {}

const append = (selector, data) => {
  const container = document.querySelector(selector)
  data.map(src => {
    const img = document.createElement('img')
    Object.assign(img, { src: loading, data: src })
    img.classList.add('lazy-load-img')
    container.append(img)
  })
}

const scroll = (list, duration) => {
  if (Object.keys(state).length === list.length) {
    return
  }
  list.map((item, index) => {
    // 判断是否正在 load item
    if (state[`img-${index}`] !== undefined) { return }

    // 判断是否在 可视区域内
    const clientHeight = document.documentElement.clientHeight
    const { top, height } = item.getBoundingClientRect()
    if (top > clientHeight) { return }

    // 更换 src
    const { data: src } = item
    Object.assign(item, { src })

    // 设置 item start
    const property = { start: new Date().valueOf() }
    Object.assign(state, { [`img-${index}`]: property })

    // 输出 item load time
    if (!duration) { return }

    // 计算 item load time
    item.onload = () => {
      const end = new Date().valueOf()
      Object.assign(state[`img-${index}`], { end })
      const { start } = state[`img-${index}`]
      console.log(`img-${index} 的加载时间是 ${end - start} ms`)
    }
  })
}

const lazyLoad = (selector, data = [], loading = '', duration = true) => {
  // append dom
  append(selector, data)
  // get array list
  const list = Array.from(document.querySelectorAll('.lazy-load-img'))
  // init scroll
  window.addEventListener('load', () => scroll(list, duration))
  // window scroll
  window.addEventListener('scroll', () => scroll(list, duration))
}







