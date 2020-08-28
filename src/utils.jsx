export const debounce = (a,b=250,c)=>(...d)=>clearTimeout(c,c=setTimeout(()=>a(...d),b))
