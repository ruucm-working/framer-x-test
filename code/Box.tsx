import * as React from 'react'

import { Frame, PropertyControls, ControlType } from 'framer'

import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

const Wrap = styled.div`
  position: relative;

  width: 100% !important;
  height: 100% !important;

  ${props =>
    props.src &&
    css`
      background: center / cover no-repeat url(${props.src});
    `};
`
const Label = styled.div`
  font-family: Helvetica;
  color: rgba(0, 0, 0, 0.35);
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 12px;
`

const Title = styled.div`
  font-family: Helvetica;
  color: white;
  font-size: 25px;
  font-weight: 900;
`

const MainImg = styled(Frame)`
  position: relative !important;
  margin: 0 auto;
  transform: none !important;

  width: 100% !important;
  height: 100% !important;
  padding: 25px;
  background: transparent !important;
  ${props =>
    props.src &&
    css`
      background: center / cover no-repeat url(${props.src});
    `};
`

const Desc = styled.div`
  background: white;
`
const CloseButton = styled.button`
  position: absolute;
  right: 0;
`
const Child = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
`

// Define type of property
interface Props {
  title: string
  label: string
  mainImg: string
  desc: string
}

export class Box extends React.Component<Props> {
  state = {
    show: false,
  }
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
    mainImg: 'http://kaijupop.com/wp-content/uploads/2014/04/KWsub.png',
    desc: '',
    children: null,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
    mainImg: { type: ControlType.String, title: 'Main Image' },
    desc: { type: ControlType.String, title: 'Description' },
    children: { type: ControlType.Children, title: 'Children' },
  }

  render() {
    return (
      <Wrap src={this.props.mainImg}>
        {/* <CloseButton onClick={this.closeDetail}>close</CloseButton> */}
        <MainImg>
          <Label>{this.props.label}</Label>
          <Title
            dangerouslySetInnerHTML={{
              __html: this.props.title,
            }}
          />
          <Child>{this.props.children}</Child>
        </MainImg>
        {/* <Desc>{this.props.desc}</Desc> */}
      </Wrap>
    )
  }
}
