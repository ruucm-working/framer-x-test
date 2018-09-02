import * as React from 'react'
import {
  PropertyControls,
  PropertyStore,
  ControlType,
  Frame,
  Animatable,
  animate,
} from 'framer'
import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const AnimateFrame = styled(Frame)`
  width: 100% !important;
  height: 100% !important;

  color: sandybrown;
  display: block !important;

  ${props =>
    props.bg &&
    css`
      background: ${props.bg} !important;
    `};
`

// Define type of property
interface Props {
  text: string
}

export class Animate extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Animate',
    bg: 'rgba(244, 164, 96, 0.6)',
    left: 50,
    top: 50,
    scale: 2,
    tension: 500,
    friction: 100,
    children: null,
  }

  switch = PropertyStore({ left: 0, top: 0, scale: 1 }, true)

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    bg: { type: ControlType.Color, title: 'Background' },
    left: { type: ControlType.Number, title: 'X (From Left)' },
    top: { type: ControlType.Number, title: 'Y (From Top)' },
    scale: { type: ControlType.Number, title: 'Scale' },
    tension: { type: ControlType.Number, title: 'Tension' },
    friction: { type: ControlType.Number, title: 'Friction' },
    children: { type: ControlType.Children, title: 'Children' },
  }

  componentWillReceiveProps(nextProps) {
    log('nextProps', nextProps)
    log(' this.props', this.props)
    if (nextProps.playing !== this.props.playing) {
      const springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playing) {
        log('play!')

        const left = this.props.left
        const top = this.props.top
        const scale = this.props.scale

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse!')

        const left = 0
        const top = 0
        const scale = 1
        animate.spring(this.switch, { left, top, scale }, springOptions)
      }
    }

    // Play onTap Animation
    if (nextProps.playingOnTap !== this.props.playingOnTap) {
      const springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnTap) {
        log('play playingOnTap!')

        const left = this.props.left
        const top = this.props.top
        const scale = this.props.scale

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse!')

        const left = 0
        const top = 0
        const scale = 1
        animate.spring(this.switch, { left, top, scale }, springOptions)
      }
    }
  }

  render() {
    return (
      <AnimateFrame
        bg={this.props.bg}
        onTap={this.props.onTap}
        scale={this.switch.scale}
        left={this.switch.left}
        top={this.switch.top}
        style={{
          display: 'block',
        }}
      >
        {this.props.text}
        {React.Children.map(this.props.children, child => {
          // let newChildProps = {
          //   playing: this.props.playing,
          //   width: this.props.width,
          // }
          return React.cloneElement(child)
        })}
      </AnimateFrame>
    )
  }
}
