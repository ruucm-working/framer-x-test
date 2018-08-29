import * as React from 'react'

import { PropertyControls, ControlType } from 'framer'

import styled from 'styled-components'

import { Frame, Animate, Hover } from 'ruucm-blocks/animation'

const Wrap = styled.div``
const Label = styled.div``
const Title = styled.div``
const MainImg = styled.img`
  width: 100%;
`
const Desc = styled.div`
  background: white;
`
const CloseButton = styled.button`
  position: absolute;
`

// Define type of property
interface Props {
  title: string
  label: string
  mainImg: string
  desc: string
}

export class AnimTest extends React.Component<Props> {
  state = {
    show: false,
  }
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
    mainImg:
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/55159829/12.0.jpg',
    desc: '',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
    mainImg: { type: ControlType.String, title: 'Main Image' },
    desc: { type: ControlType.String, title: 'Description' },
  }

  render() {
    return (
      <Wrap>
        <Label>{this.props.label}</Label>
        <Title
          dangerouslySetInnerHTML={{
            __html: this.props.title,
          }}
        />
        {/* <Frame> */}
        <MainImg src={this.props.mainImg} />
        {/* </Frame> */}

        {this.state.show ? <Desc>{this.props.desc}</Desc> : ''}
      </Wrap>
    )
  }
}
