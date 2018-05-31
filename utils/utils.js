module.exports = {
    indexOf(arr, v){
        if(arr.indexOf){
            return arr.indexOf(v);
        }else{
            for(let i=0, len=arr.length; i<len; i++){
                if(arr[i] === v) return i;
            }
            return -1;
        }
    },
    addClass(el, cls){
        if(el.classList){
            el.classList.add(cls);
        }else{
            let list = el.className.split(/\s+/);
            if(this.indexOf(list, cls) === -1){
                list.push(cls);
            }
            el.className = list.join(' ');
        }
    },
    removeClass(el, cls){
        if(el.classList){
            el.classList.remove(cls);
        }else{
            let list = el.className.split(/\s+/),
                index;
            if((index = this.indexOf(list, cls)) !== -1){
                list.splice(index, 1);
            }
            el.className = list.join(' ');
        }
    },
    hasClass(el, cls){
        if(el.classList){
            return el.classList.contains(cls);
        }else{
            let list = el.className.split(/\s+/);
            return this.indexOf(list, cls) !== -1;
        }
    },
    addEvent(el, evt, fn){
        if(window.addEventListener){
            el.addEventListener(evt, fn);
        }else if(window.attachEvent){
            el.addEventListener('on'+evt, fn);
        }
    },
    removeEvent(el, evt, fn){
        if(window.removeEventListener){
            el.removeEventListener(evt, fn);
        }else{
            el.detachEvent('on'+evt, fn);
        }
    },
    toBottom(el, deviation) {
        if(!el)
            return false;
        return el.scrollHeight - el.offsetHeight - el.scrollTop <= deviation;
    },
    toTop(el, deviation){
        if(!el)
            return false;
        return el.scrollTop <= deviation;
    },
    setTransition(el, v) {
        el.style.webkitTransition =
            el.style.mozTransition =
                el.style.msTransition =
                    el.style.oTransition =
                        el.style.transition = v;
    },
    setTransform(el, v, bool){
        if('transform' in document.documentElement){
            el.style.webkitTransform =
                el.style.mozTransform =
                    el.style.msTransform =
                        el.style.oTransform =
                            el.style.transform = 'translateY('+ (bool ? v+'px' : '-'+v+'00%') + ')';
        }else{
            el.style.top = bool ? v+'px' : '-'+v+'00%';
        }
    },
    timemat(time, type=0){
        let h = !type ? 0 : Math.floor(time/3600),
            i = Math.floor((time - h*3600) / 60),
            s = Math.floor(time - h*3600 - i*60);

        h = h < 10 ? '0' + h : h;
        i = i < 10 ? '0' + i : i;
        s = s < 10 ? '0' + s : s;
        return (!type ? '' : (h + ':')) + i + ':' + s;
    },
    fullscreen(el){
        if(el.requestFullscreen) {
            el.requestFullscreen();
        } else if(el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if(el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        }else if(el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    },
    exitFullscreen(){
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitCancelFullScreen){
            document.webkitCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.msExitFullscreen){
            document.msExitFullscreen();
        }
    },
    isFullscreen() {
        return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || false;
    }
};
