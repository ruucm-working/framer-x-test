import * as React from 'react'
import { PropertyControls, ControlType } from 'framer'
import styled, { css } from 'styled-components'

const style = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#8855FF',
  background: 'rgba(136, 85, 255, 0.1)',
  overflow: 'hidden',
}
const Wrap = styled.div`
  ${props =>
    props.isComming &&
    css`
      background: red;
    `};
`

export class Pure extends React.Component {
  // Set default properties
  static defaultProps = {
    text: 'He!',
  }

  // Items shown in property panel
  static propertyControls = {
    text: { type: ControlType.String, title: 'Text' },
  }

  render() {
    return <Wrap isComming={true}>{this.props.text}</Wrap>
  }
}
