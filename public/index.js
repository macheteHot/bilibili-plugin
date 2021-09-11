/* eslint-disable no-undef */
// ==UserScript==
// @name         myBilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @grant        none
// ==/UserScript==

async function loadResource (urls) {
  if (!urls || urls.length === 0) {
    throw new Error('must set remote resource url list!!!')
  }
  async function loadByUrl (url) {
    const type = url.match(/^.*\.([\w]+)$/)[1]
    if (!['js', 'css'].includes(type)) {
      throw new Error('不是正确的URL或类型')
    }
    let needInject = null
    if (type === 'js') {
      needInject = document.createElement('script')
      needInject.setAttribute('type', 'text/javascript')
      needInject.setAttribute('src', url)
    }
    if (type === 'css') {
      needInject = document.createElement('link')
      needInject.setAttribute('rel', 'stylesheet')
      needInject.setAttribute('href', url)
    }
    document.head.appendChild(needInject)
    return new Promise(resolve => { needInject.addEventListener('load', resolve) })
  }
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    await loadByUrl(url)
  }
  return null
}

async function main () {
  await loadResource([
    'https://cdn.jsdelivr.net/npm/vue@3.2.11/dist/vue.global.min.js',
    'http://127.0.0.1:5500/lib/BilibiliTam.umd.js'
  ])
  // do you thing
  const div = document.createElement('div')
  document.body.appendChild(div)
  Vue.createApp(BilibiliTam).mount(div)
}

main()
