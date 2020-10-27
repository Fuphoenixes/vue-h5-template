/**
 * 延迟
 * @param delay
 * @returns {Promise<unknown>}
 */
export const timeout = delay => new Promise(resolve => setTimeout(resolve, delay))

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {Object} obj
 * @return {String}
 */
export function obj2Params(obj) {
  const str = []
  for (const p in obj) {
    str.push(
      encodeURIComponent(p) +
      '=' +
      encodeURIComponent(typeof obj[p] === 'object' ? JSON.stringify(obj[p]) : obj[p])
    )
  }
  return str.join('&')
}

/**
 * @param obj
 * @param delValueFn
 * @returns {{}}
 */
export function paramsDel(
  obj,
  delValueFn = (value) => typeof value === 'undefined' || value === null || value === ''
) {
  const query = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!delValueFn(obj[key])) {
        query[key] = obj[key]
      }
    }
  }
  return query
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
