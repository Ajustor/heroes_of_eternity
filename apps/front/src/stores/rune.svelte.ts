import { getContext, hasContext, setContext } from 'svelte'

export const rune = <T>(startValue: T, context = 'default'): { value: T } => {
  if (hasContext(context)) {
    return getContext<{ value: T }>(context)
  }

  let _state = $state(startValue)

  const _rune = {
    get value(): T {
      return _state
    },
    set value(newState: T) {
      _state = newState
    }
  }

  setContext(context, _rune)
  return _rune
}