import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { css } from 'styled-components'

const TriggerFrame = styled(Frame)`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100% !important;
  height: 100% !important;

  color: #75be8e;
  background: rgba(117, 190, 142, 0.6) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

// Define type of property
interface Props {
  text: string
}

export class Trigger extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Trigger',
    playType: 'play',
    triggerType: 'onTap',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
    playType: {
      type: ControlType.Enum,
      options: ['play', 'reverse'],
      optionTitles: ['Play', 'Reverse'],
      title: 'Play Type',
    },
    triggerType: {
      type: ControlType.Enum,
      options: ['onTap', 'onMouseDown', 'onMouseUp'],
      optionTitles: ['onTap', 'onMouseDown', 'onMouseUp'],
      title: 'Trigger Type',
    },
  }

  render() {
    return (
      <TriggerFrame
        onTap={() =>
          this.props.triggerType == 'onTap'
            ? this.props.trigger(this.props.playType)
            : void 0
        }
        onMouseDown={() =>
          this.props.triggerType == 'onMouseDown'
            ? this.props.trigger(this.props.playType)
            : void 0
        }
        onMouseUp={() =>
          this.props.triggerType == 'onMouseUp'
            ? this.props.trigger(this.props.playType)
            : void 0
        }
      >
        {this.props.playType}
      </TriggerFrame>
    )
  }
}
