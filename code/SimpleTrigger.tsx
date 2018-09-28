import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'

// Define type of property
interface Props {
  text: string
}

export class SimpleTrigger extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: 'Hello World!',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: 'Text' },
  }

  render() {
    return <Frame onTap={() => this.props.onTap()}>tab me</Frame>
  }
}
