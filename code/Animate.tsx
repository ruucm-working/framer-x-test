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
  background: rgba(244, 164, 96, 0.6) !important;
`
const Label = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
`
const ChildFrame = styled(Frame)`
  left: 50%;
  transform: translateX(-50%) !important;
`

// Define type of property
interface Props {
  text: string
}

const screenWidth = 375
export class Animate extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Animate',

    firstWidth: 100,

    onTapLeft: 50,
    onTapTop: 50,

    onMDLeft: 50,
    onMDTop: 50,
    onMDWidth: 70,

    onMULeft: 50,
    onMUTop: 50,
    onMUWidth: 90,

    tension: 500,
    friction: 100,
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    firstWidth: { type: ControlType.Number, title: 'First Width' },

    onTapLeft: { type: ControlType.Number, title: 'onTap X' },
    onTapTop: { type: ControlType.Number, title: 'onTap Y' },

    onMDLeft: { type: ControlType.Number, title: 'onMD X' },
    onMDTop: { type: ControlType.Number, title: 'onMD Y' },
    onMDWidth: { type: ControlType.Number, title: 'onMD Width' },

    onMULeft: { type: ControlType.Number, title: 'onMU X' },
    onMUTop: { type: ControlType.Number, title: 'onMU Y' },
    onMUWidth: { type: ControlType.Number, title: 'onMU Width' },
  }

  switch = PropertyStore(
    { left: 0, top: 0, width: screenWidth * (this.props.firstWidth / 100) },
    true
  )

  componentWillReceiveProps(nextProps) {
    // Play onTap Animation
    // if (nextProps.playingOnTap !== this.props.playingOnTap) {
    //   let left
    //   let top
    //   let scale
    //   let springOptions = {
    //     tension: this.props.tension,
    //     friction: this.props.friction,
    //   }

    //   if (nextProps.playingOnTap) {
    //     log('play playingOnTap!')

    //     left = this.props.onTapLeft
    //     top = this.props.onTapTop
    //     scale = this.props.onTapScale / 100

    //     animate.spring(this.switch, { left, top, scale }, springOptions)
    //   } else {
    //     log('reverse playingOnTap!')
    //     left = 0
    //     top = 0
    //     scale = 1
    //     animate.spring(this.switch, { left, top, scale }, springOptions)
    //   }
    // }

    // Play onMouseDown Animation
    if (nextProps.playingOnMouseDown !== this.props.playingOnMouseDown) {
      let left
      let top
      let width
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseDown) {
        log('play playingOnMouseDown!')

        left = this.props.onMDLeft
        top = this.props.onMDTop
        width = (screenWidth * this.props.onMDWidth) / 100

        animate.spring(this.switch, { left, top, width }, springOptions)
      } else {
        log('reverse playingOnMouseDown!')
        left = 0
        top = 0
        width = (screenWidth * this.props.firstWidth) / 100
        log('this.props', this.props)
        animate.spring(this.switch, { left, top, width }, springOptions)
      }
    }

    // Play onMouseUp Animation
    if (nextProps.playingOnMouseUp !== this.props.playingOnMouseUp) {
      let left
      let top
      let width
      let springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }
      if (nextProps.playingOnMouseUp) {
        log('play playingOnMouseUp!')

        left = this.props.onMULeft
        top = this.props.onMUTop
        width = (screenWidth * this.props.onMUWidth) / 100

        log('width', width)

        animate.spring(this.switch, { left, top, width }, springOptions)
      } else {
        log('reverse playingOnMouseUp!')
        left = 0
        top = 0
        width = (screenWidth * this.props.firstWidth) / 100
        animate.spring(this.switch, { left, top, width }, springOptions)
      }
    }
  }

  render() {
    return (
      <AnimateFrame
        bg={this.props.bg}
        onTap={this.props.onTap}
        left={this.switch.left}
        top={this.switch.top}
        style={{
          display: 'block',
        }}
      >
        <Label>{this.props.text}</Label>
        <ChildFrame width={this.switch.width} height={400}>
          {React.Children.map(this.props.children, child => {
            // let newChildProps = {
            //   playing: this.props.playing,
            //   width: this.props.width,
            // }
            return child.props.children
          })}
        </ChildFrame>
      </AnimateFrame>
    )
  }
}
