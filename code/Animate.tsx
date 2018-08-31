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
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100% !important;
  height: 100% !important;

  color: sandybrown;
  background: rgba(244, 164, 96, 0.6) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

// Define type of property
interface Props {
  text: string
}

export class Animate extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Animate',
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
    left: { type: ControlType.Number, title: 'X (From Left)' },
    top: { type: ControlType.Number, title: 'Y (From Top)' },
    scale: { type: ControlType.Number, title: 'Scale' },
    tension: { type: ControlType.Number, title: 'Tension' },
    friction: { type: ControlType.Number, title: 'Friction' },
    children: { type: ControlType.Children, title: 'Children' },
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== this.props.playing) {
      const springOptions = {
        tension: this.props.tension,
        friction: this.props.friction,
      }

      const left = this.props.left
      const top = this.props.top
      const scale = this.props.scale

      animate.spring(this.switch, { left, top, scale }, springOptions)
    }
  }

  render() {
    return (
      <AnimateFrame
        onTap={this.props.onTap}
        scale={this.switch.scale}
        left={this.switch.left}
        top={this.switch.top}
      >
        {this.props.text}
      </AnimateFrame>
    )
  }
}
