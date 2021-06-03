//插件需要实现install
const Myplugin = {
    install(Vue,options){
        //heading组件
        //<heading :level="1" :title="title" icon="cart">{{title}}</heading>
        //<h2 title=""><svg><use x:href="#icon-cart"></svg></h2>
        Vue.component('heading', {
            props: {
                level: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    default: ''
                },
                icon: String
            },
            render(h) {
                //子节点数组
                let children = [];

                //icon属性处理逻辑
                if (this.icon) {
                    //<svg class="icon"><use xlink="#icon-cart"></svg>
                    children.push(h(
                        'svg',
                        { class: 'icon' },
                        [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
                    ))
                }

                //拼接子节点
                children = children.concat(this.$slots.default);
                //snabbdom
                const Vnode = h(
                    'h' + this.level,//参数1 tagname
                    { attrs: { title: this.title } },//参数2 {....}
                    children//参数3：子节点VNode数组
                );
                //返回createElement返回的VNode
                return Vnode;
            }
        })
    }
}
if(typeof window != 'undefined' && window.Vue){
    //使用插件使用Vue.use()
    window.Vue.use(Myplugin);
}