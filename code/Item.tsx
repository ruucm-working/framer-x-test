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

import styled, { css } from 'styled-components'
import { log } from 'ruucm-util'

// import { constants } from '../toolbox'

// const { color, animation } = constants
// const { fadeIn, fadeOut } = animation

const Wrap = styled.div`
  position: relative;
  ${props => props.isShowing && css``};
`
const Label = styled.div``
const Title = styled.div``
const StyledFrame = styled(Frame)`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100% !important;
  ${props =>
    props.isShowing &&
    css`
      ${MainImg} {
        width: 100vw;
      }
    `};
`
const MainImg = styled.div`
  width: 80vw;
  height: 400px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 25px;
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

// Define type of property
interface Props {
  title: string
  label: string
  mainImg: string
  desc: string
}

export class Item extends React.Component<Props> {
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
  top = Animatable(0)
  left = Animatable(0)
  scale = Animatable(1)
  opacity = Animatable(0)

  showDetail = async () => {
    await animate(this.top, -100).finished
    await animate(this.scale, 2).finished
    this.setState({ show: true })
    await animate(this.opacity, 1).finished
  }
  closeDetail = async () => {
    await animate(this.opacity, 0).finished
    this.setState({ show: false })
    await animate(this.scale, 1).finished
    await animate(this.top, 0).finished
  }

  render() {
    return (
      <Wrap
        isShowing={this.state.show}
        onClick={this.state.show ? void 0 : this.showDetail}
      >
        {this.state.show ? (
          <CloseButton onClick={this.closeDetail}>close</CloseButton>
        ) : (
          ''
        )}

        <StyledFrame top={this.top} isShowing={this.state.show}>
          <MainImg src={this.props.mainImg}>
            <Label>{this.props.label}</Label>
            <Title
              dangerouslySetInnerHTML={{
                __html: this.props.title,
              }}
            />
          </MainImg>
        </StyledFrame>

        {this.state.show ? (
          <Frame opacity={this.opacity}>
            <Desc>{this.props.desc}</Desc>
          </Frame>
        ) : (
          ''
        )}
      </Wrap>
    )
  }
}
