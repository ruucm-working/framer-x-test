import * as React from 'react'
import { PropertyControls, ControlType } from 'framer'
import styled from 'styled-components'

const Wrap = styled.div``
const Label = styled.div``
const Title = styled.div``

// Define type of property
interface Props {
  title: string
  label: string
}

export class Header extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
  }

  render() {
    return (
      <Wrap>
        <Label>{this.props.label}</Label>
        <Title>{this.props.title}</Title>
      </Wrap>
    )
  }
}
