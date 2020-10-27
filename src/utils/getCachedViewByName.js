/**
 * 获取被keep-alive缓存的页面的实例
 * @param name
 * @returns {*}
 */
const getCachedViewByName = function(name) {
  if (!name) return
  const cache = window.__KEEP_ALIVE__.componentInstance.cache
  const cacheList = []
  for (const key in cache) {
    const item = cache[key]
    if (item && item.componentInstance) {
      cacheList.push(item.componentInstance)
    }
  }
  return cacheList.find(vm => vm.$options.name === name)
}

export default getCachedViewByName
