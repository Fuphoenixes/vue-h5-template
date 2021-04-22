/**
 * 获取被keep-alive缓存的页面的实例
 * @param name
 * @returns vm || undefined
 */
export const getCachedViewByName = (name) => {
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

/**
 * 清除keep-alive缓存的页面
 * @param names
 */
export const clearCachedView = (names) => {
  const VueNavigationVm = window.__KEEP_ALIVE__.componentInstance.$parent.$parent
  if (!names) {
    VueNavigationVm.cachedViews = []
  }
  if (typeof names === 'string') {
    const index = VueNavigationVm.cachedViews.findIndex(item => item === names)
    if (index !== -1) {
      VueNavigationVm.cachedViews.splice(index, 1)
    }
  }
  if (names instanceof Array) {
    VueNavigationVm.cachedViews = VueNavigationVm.cachedViews.filter(item => names.every(name => item !== name))
  }
}

