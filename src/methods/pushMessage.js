import emitter from '@/methods/emitter'

export default function (style, title) {
  emitter.emit('pushMsg', {
    style: style,
    title: title
  })
}
