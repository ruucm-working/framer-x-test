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

  width: 100% !important;
  height: 100% !important;
  ${props =>
    props.isShowing &&
    css`
      ${MainImg} {
        border-radius: 0;
      }
    `};
  ${props =>
    props.focused &&
    css`
      ${MainImg} {
        height: 700px !important;
      }
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

const StyledFrame = styled(Frame)`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100% !important;
`
const MainImg = styled(Frame)`
  position: relative !important;
  margin: 0 auto;
  transform: none !important;
  border-radius: 20px;
  -moz-transition: border-radius 2s;
  -o-transition: border-radius 2s;
  -webkit-transition: border-radius 2s;
  transition: border-radius 2s;

  width: 100% !important;
  height: 100% !important;
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
    mainImg:
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/55159829/12.0.jpg',
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
  screenWidth = 375
  top = Animatable(0)
  left = Animatable(0)
  scale = Animatable(1)
  opacity = Animatable(0)
  width = Animatable(this.screenWidth * 0.9)

  // componentDidMount() {
  //   log('window.screen', window.screen)
  //   log('screen', screen)
  //   log('screen.width * 0.9', screen.width * 0.9)
  // }

  shrink = async () => {
    animate(this.width, this.screenWidth * 0.76).finished
  }

  showDetail = async () => {
    animate(this.top, -100).finished
    animate(this.width, this.screenWidth * 1).finished
    this.setState({ show: true })
    animate(this.opacity, 1).finished
  }
  closeDetail = async () => {
    animate(this.opacity, 0).finished
    this.setState({ show: false })
    animate(this.top, 0).finished
    animate(this.width, this.screenWidth * 0.9).finished
  }

  render() {
    return (
      <Wrap>
        {/* <CloseButton onClick={this.closeDetail}>close</CloseButton> */}
        <MainImg src={this.props.mainImg}>
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
