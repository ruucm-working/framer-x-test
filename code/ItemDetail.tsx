import * as React from 'react'

import {
  Frame,
  animate,
  Animatable,
  PropertyControls,
  ControlType,
  FramerAnimation,
  PropertyStore,
  RenderTarget,
} from 'framer'

import styled from 'styled-components'

const StyledFrame = styled(Frame)`
  background: red;
  width: 100% !important;
`

const Wrap = styled.div``
const Label = styled.div``
const Title = styled.div``
const MainImg = styled.img`
  width: 100%;
`

// Define type of property
interface Props {
  title: string
  label: string
  mainImg: string
}

export class ItemDetail extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    title: '',
    label: '',
    mainImg:
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/55159829/12.0.jpg',
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: 'Title' },
    label: { type: ControlType.String, title: 'Label' },
    mainImg: { type: ControlType.String, title: 'Main Image' },
  }

  left = Animatable(0)
  onClick = async () => {
    await animate(this.left, 200).finished
    await animate(this.left, 0).finished
  }
  componentDidMount = async () => {
    // await animate(this.left, 200).finished
    // await animate(this.left, 0).finished
  }

  render() {
    return (
      <StyledFrame left={this.left} onClick={this.onClick}>
        <Wrap>
          <Label>{this.props.label}</Label>
          <Title
            dangerouslySetInnerHTML={{
              __html: this.props.title,
            }}
          />
          <MainImg src={this.props.mainImg} />
        </Wrap>
      </StyledFrame>
    )
  }
}
