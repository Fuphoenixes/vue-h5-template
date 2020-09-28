import vue from 'vue';

export const store = vue.observable({cachedViews: []});

export function setCachedViews( cachedViews ){
  store.cachedViews = cachedViews;
}

export function getViewInstanceByName(name){
  const cachedView = store.cachedViews.filter(item=>item.name === name)[0];
  if(cachedView && cachedView.instance) return cachedView.instance;
}