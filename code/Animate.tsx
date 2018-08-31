import * as React from 'react'
import {
  PropertyControls,
  ControlType,
  Frame,
  Animatable,
  animate,
} from 'framer'
import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const BasicFrame = styled(Frame)`
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
  }
  scale = Animatable(1)

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== this.props.playing) {
      this.scale.set(0.6)
      animate.spring(this.scale, 1)
    }
  }

  render() {
    return (
      <BasicFrame onTap={this.props.onTap} scale={this.scale}>
        {this.props.text}
      </BasicFrame>
    )
  }
}
