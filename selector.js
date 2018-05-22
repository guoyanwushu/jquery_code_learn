/**
 * $ 本身有一些属性和方法
 * $(selector) 返回的是一个jquery实例，这个实例也有自己的属性和方法。
 * $(selector) 是没有调用new的，所以想要$(selector)拥有原型属性和方法还是要改动一下
 */

var $ = jQuery = function(selector,context) {
    // 返回一个dom对象列表 或者就是一个封装后的dom对象
    return new $.prototype.init(selector);
 }
 $.prototype = {
    constructor:$,
    init:function(selector) {
        var doms = [].slice.call(document.querySelectorAll(selector)),
            i = 0;
            this.length = doms.length;
            this.selector = selector;
        for(;i<doms.length;i++) {
            this[i] = doms[i];
        }   
    },
    click:function(call) {
        for(var i=0;i<this.length;i++) {
            this[i].addEventListener('click',call,false);
        }  
    },
    text:function(val) {
        if(!val) {
            return this.innerText;
        }
        else {
            this.innerText = val;
        }
    },
    html:function(val) {
        if(!val) {
            return this.innerHtml
        }
        else {
            this.innerHtml = val;
        }
    },
    attr:function(name) {
        return this[0].attributes[name].value;
    },
    /*
        ??: 要把当前的this给保留下来，然后又要具有新节点属性的this返回出去。但是下面的方法肯定是不行的，因为this本身赋给prev的是指针，这个指针指向的this变了，prev肯定就不是以前那个this了
        目前想到的做法是新建一个空的jquery对象，然后挨个把this的节点赋给这个新的空jquey对象，目前是可以行的哦
    */
    parent:function() {
        var parents=[];
        for(var i=0;i<this.length;i++) {
            parents.push(this[i].parentNode);
        }
        return this.pushStack(parents);
    },
    pushStack:function(elems) {
        var tar = new this.init();
        for(var i =0;i<elems.length;i++) {
            tar[i] = elems[i]
        }
        tar.prev = this;
        tar.length = elems.length;
        return tar;
    },
    children:function(){
        return this.pushStack(this[0].children)
    },
    eq:function(index) {
        var length = this.length,
            j = index>=0?index:index+length;
        return this.pushStack(j>=0&&j<length?[this[j]]:[]);
    },
    find:function(_selector) {
        return this.pushStack(document.querySelectorAll); //
    },
    first:function() {
        return this.eq(0);
    },
    last:function() {
        return this.eq(-1);
    },
    end:function() {
        return this.prev;
    }

    
 }
$.prototype.init.prototype = $.prototype;