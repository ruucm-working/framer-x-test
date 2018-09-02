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

    onTapLeft: 50,
    onTapTop: 50,
    onTapScale: 2,

    onMDLeft: 50,
    onMDTop: 50,
    onMDScale: 2,

    onMULeft: 50,
    onMUTop: 50,
    onMUScale: 2,

    tension: 500,
    friction: 100,
    children: null,
  }

  switch = PropertyStore({ left: 0, top: 0, scale: 1 }, true)

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    bg: { type: ControlType.Color, title: 'Background' },

    onTapLeft: { type: ControlType.Number, title: 'onTap X' },
    onTapTop: { type: ControlType.Number, title: 'onTap Y' },
    onTapScale: { type: ControlType.Number, title: 'onTap Scale' },

    onMDLeft: { type: ControlType.Number, title: 'onMD X' },
    onMDTop: { type: ControlType.Number, title: 'onMD Y' },
    onMDScale: { type: ControlType.Number, title: 'onMD Scale' },

    onMULeft: { type: ControlType.Number, title: 'onMU X' },
    onMUTop: { type: ControlType.Number, title: 'onMU Y' },
    onMUScale: { type: ControlType.Number, title: 'onMU Scale' },
  }

  componentWillReceiveProps(nextProps) {
    // Play onTap Animation
    if (nextProps.playingOnTap !== this.props.playingOnTap) {
      let left
      let top
      let scale
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }

      if (nextProps.playingOnTap) {
        log('play playingOnTap!')

        left = this.props.onTapLeft
        top = this.props.onTapTop
        scale = this.props.onTapScale

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse playingOnTap!')
        left = 0
        top = 0
        scale = 1
        animate.spring(this.switch, { left, top, scale }, springOptions)
      }
    }

    // Play onMouseDown Animation
    if (nextProps.playingOnMouseDown !== this.props.playingOnMouseDown) {
      let left
      let top
      let scale
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseDown) {
        log('play playingOnMouseDown!')

        left = this.props.onMDLeft
        top = this.props.onMDTop
        scale = this.props.onMDScale

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse playingOnMouseDown!')
        left = 0
        top = 0
        scale = 1
        animate.spring(this.switch, { left, top, scale }, springOptions)
      }
    }

    // Play onMouseUp Animation
    if (nextProps.playingOnMouseUp !== this.props.playingOnMouseUp) {
      let left
      let top
      let scale
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseUp) {
        log('play playingOnMouseUp!')

        left = this.props.onMULeft
        top = this.props.onMUTop
        scale = this.props.onMUScale

        animate.spring(this.switch, { left, top, scale }, springOptions)
      } else {
        log('reverse playingOnMouseUp!')
        left = 0
        top = 0
        scale = 1
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
