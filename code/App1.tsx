import { Data, animate, Override, Animatable } from 'framer'

const data = Data({ scale: Animatable(1) })

// export const Scale: Override = () => {
//   return {
//     scale: data.scale,
//     onTap() {
//       data.scale.set(0.6)
//       animate.spring(data.scale, 1)
//     },
//   }
// }

export const Animate: Override = () => {
  return {
    playingOnTap: data.playingOnTap,
  }
}

export const Trigger: Override = () => {
  return {
    // scale: data.scale,
    onTap() {
      data.playingOnTap = !data.playingOnTap
      //   data.scale.set(0.6)
      //   animate.spring(data.scale, 1)
    },
  }
}
