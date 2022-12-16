import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import { useSwipe } from '../hooks/useSwipe';
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction, swiping } = useSwipe(main)
    //当前的变量发生改变，方向发生改变
    watchEffect(() => {
      console.log(swiping.value, direction.value)
    })
    return () => (
    <div class={s.wrapper}>
      <header>
        <svg>
          <use xlinkHref='#mangosteen'></use>
        </svg>
        <h1>山竹记账</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name='main'>
          {/* 用传参的形式(定义RouterView类型)实现路由动画过渡 
          同时使用局部组件的过渡样式*/}
          {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
              {X}
            </Transition>
          }
          
        </RouterView>
      </main>
      <footer>
        <RouterView name='footer'/>
      </footer>
    </div>
    )
  }
})