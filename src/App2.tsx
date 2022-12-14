import { defineComponent, Fragment, ref } from 'vue'

export const App2 = defineComponent({
  setup() {
    const refCount = ref(0)
    const onClick = () => {
      refCount.value++
    }
    return () => (
    <Fragment>
      <div>{refCount.value}</div>
      <div>
        <button onClick={onClick}>+1</button>
      </div>
    </Fragment>
    )
  }
})