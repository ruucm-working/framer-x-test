import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { css } from 'styled-components'

const TriggerFrame = styled(Frame)`
  width: 100% !important;
  height: 100% !important;

  color: #75be8e;
  background: rgba(117, 190, 142, 0.6) !important;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${props =>
    !props.visibility &&
    css`
      opacity: 0.3;
    `};
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
    // triggerType: 'onTap',
    onTapTrigger: true,
    onMouseDownTrigger: false,
    onMouseUpTrigger: false,
    visibility: false,
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
    // triggerType: {
    //   type: ControlType.Enum,
    //   options: ['onTap', 'onMouseDown', 'onMouseUp'],
    //   optionTitles: ['onTap', 'onMouseDown', 'onMouseUp'],
    //   title: 'Trigger Type',
    // },
    onTapTrigger: { type: ControlType.Boolean, title: 'onTap Trigger' },
    onMouseDownTrigger: {
      type: ControlType.Boolean,
      title: 'onMouseDown Trigger',
    },
    onMouseUpTrigger: { type: ControlType.Boolean, title: 'onMouseUp Trigger' },
    visibility: {
      type: ControlType.Boolean,
      title: 'Visibility',
    },
  }

  render() {
    return (
      <TriggerFrame
        onTap={() =>
          this.props.onTapTrigger
            ? this.props.onTap(this.props.playType)
            : void 0
        }
        onMouseDown={() =>
          this.props.onMouseDownTrigger
            ? this.props.onMouseDown(this.props.playType)
            : void 0
        }
        onMouseUp={() =>
          this.props.onMouseUpTrigger
            ? this.props.onMouseUp(this.props.playType)
            : void 0
        }
        visibility={this.props.visibility}
      >
        {this.props.playType}
      </TriggerFrame>
    )
  }
}
