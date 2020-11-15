import styled from "styled-components"

export const Button = styled("button")`
  border-radius: 7px;
  background: #bfd2df;
  font-family: tbudgothic-std, sans-serif;
  box-shadow: 8px 8px 16px #a6b7c2, -8px -8px 16px #d8edfc;
  border: none;
  outline: none;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background: #abcde3;
    color: #111111;
    box-shadow: 8px 8px 16px #b4c5d2, -8px -8px 16px #cadfec;
  }
`

export const Input = styled("input")`
  background: #bfd2df;
  width: 300px;
  padding: 5px 15px;
  border-radius: 20px;
  height: 45px;
  font-family: tbudgothic-std, sans-serif;
  box-shadow: inset 8px 8px 16px #a6b7c2, inset -8px -8px 16px #d8edfc;
  border: none;
  outline: none;
  transition: 0.4s;
`

export const Block = styled("div")`
  border-radius: 10px;
  background: #bfd2df;
  box-shadow: inset 2px 2px 4px #9baab5, inset -2px -2px 4px #e3faff;
`
