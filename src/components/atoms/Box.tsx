import { CircularProgress } from "@material-ui/core"
import styled from "styled-components"
import {
  background,
  space,
  color,
  layout,
  display,
  border,
  SpaceProps,
  ColorProps,
  BackgroundProps,
  DisplayProps,
  LayoutProps,
  BorderProps,
} from "styled-system"

type BoxProps = SpaceProps &
  ColorProps &
  DisplayProps &
  BorderProps &
  SpaceProps &
  BackgroundProps &
  LayoutProps

export const NeumoBox = styled("div")`
  display: flex;
  border-radius: 7px;
  background: #bfd2df;
  box-shadow: 8px 8px 16px #a6b7c2, -8px -8px 16px #d8edfc;
  border: none;
  outline: none;
`

export const FlexBox = styled("div")`
  display: flex;
`
export const Box = styled.div<BoxProps>(
  color,
  display,
  border,
  space,
  background,
  layout
)

export const Loading = styled(CircularProgress)`
  position: absolute;
  top: 48.7%;
  right: 48.7%;
`

export const LoadingBox = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: rgba(20, 20, 20, 0.35);
  position: absolute;
`
