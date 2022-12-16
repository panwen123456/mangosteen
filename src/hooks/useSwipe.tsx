import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
}

//挂载到元素监听touch事件
export const useSwipe = (element: Ref<HTMLElement | null>) => {
  //触碰开始结束与是否处于移动状态
  const start = ref<Point | null>(null)
  const end = ref<Point | null>(null)
  const swiping = ref(false)
  //触碰距离
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  //触碰方向,x投影距离大于y为水平方向
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    swiping.value = true
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
  }
  const onMove = (e: TouchEvent) => {
    if (!start.value) { return }
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
  }
  const onEnd = (e: TouchEvent) => {
    swiping.value = false
  }

  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  //不挂载时取消

  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return {
    swiping,
    direction,
    distance,
  }
}