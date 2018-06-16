module.exports = {
    indexOf(arr, item){
        if(arr.indexOf){
            return arr.indexOf(item);
        }else{
            for(let i=0, l=arr.length; i<l; i++)
                if(arr[i] === item) return i;
            return -1;
        }
    },
    isTouch(){
        return 'ontouchstart' in document;
    },
    addClass(el, cls){
        if(el.classList){
            el.classList.add(cls);
        }else{
            let utils = this,
                list = el.className.split(/\s+/);
            if(utils.indexOf(list, cls) === -1){
                list.push(cls);
            }
            el.className = list.join(' ');
        }
    },
    removeClass(el, cls){
        if(el.classList){
            el.classList.remove(cls);
        }else{
            let utils = this,
                list = el.className.split(/\s+/),
                index;
            if((index = utils.indexOf(list, cls)) !== -1){
                list.splice(index, 1);
            }
            el.className = list.join(' ');
        }
    },
    hasClass(el, cls){
        if(el.classList){
            return el.classList.contains(cls);
        }else{
            let utils = this,
                list = el.className.split(/\s+/);
            return utils.indexOf(list, cls) !== -1;
        }
    },
    addEvent(el, evt, fn, capture=false){
        if(window.addEventListener){
            el.addEventListener(evt, fn, capture);
        }else if(window.attachEvent){
            el.attachEvent('on'+evt, fn);
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
    setTransformY(el, v, bool){
        if('transform' in document.documentElement.style){
            el.style.webkitTransform =
                el.style.mozTransform =
                    el.style.msTransform =
                        el.style.oTransform =
                            el.style.transform = 'translateY('+ (bool ? v+'px' : '-'+v+'00%') + ')';
        }else{
            el.style.top = bool ? v+'px' : '-'+v+'00%';
        }
    },
    time(timemat){
        let arr = timemat.split(/[:：]+/);
        if(arr.length === 3){
            return parseInt(arr[0])*3600 + parseInt(arr[1])*60 + parseFloat(arr[2]);
        }else{
            return parseInt(arr[0])*60 + parseFloat(arr[1]);
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
    },
    calced(node, attr){
        if(node && node.nodeType === 1 && window.getComputedStyle){
            return window.getComputedStyle(node)[attr];
        }else{
            return 0;
        }
    },
    parent(el, cls, context = document.documentElement){
        while (el !== context){
            if(!el) return false;
            if(el.className && (el.className.split(/\s+/).indexOf(cls) !== -1)){
                return el;
            }else{
                el = el.parentNode;
            }
        }
    },
    eventGroup(els, fn1, fn2, fn3){
        let utils = this,
            events = utils.isTouch() ? ['touchstart','touchmove','touchend'] : ['mousedown','mousemove','mouseup'],
            el1, el2, el3;
        if(!els || !fn1 || !fn2 || !fn3) return;
        el1 = els[0];
        el2 = els[1] || el1 || document;
        el3 = els[2] || document;
        utils.addEvent(el1, events[0], startFn);
        function startFn(e){
            fn1.call(this, e);
            utils.addEvent(el2, events[1], moveFn);
            utils.addEvent(el3, events[2], endFn);
        }
        function moveFn(e){
            fn2.call(this, e);
        }
        function endFn(e){
            utils.removeEvent(el2, events[1], moveFn);
            utils.removeEvent(el3, events[2], endFn);
            fn3.call(this, e);
        }
    },
    options(target, source, bool = true){
        for(let k in source)
            if(source.hasOwnProperty(k)) {
                if ((bool && target.hasOwnProperty(k)) || !bool) {
                    target[k] = source[k];
                }
            }
        return target;
    },
    contains(target, context){
        if(context.contains){
            return context.contains(target);
        }else{
            if(target === context){
                return true;
            }else{
                let children = context.getElementsByTagName('*'),
                    len = children.length,
                    i = 0;
                for(; i<len; i++){
                    if(target === children[i]) return true;
                }
            }
        }
        return false;
    }
};
