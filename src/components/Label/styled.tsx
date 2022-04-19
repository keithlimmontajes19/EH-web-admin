import styled from 'styled-components';

export const StyledLabel = styled.p<any>`
  font-family: 'Raleway', sans-serif;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold};
  margin-top: ${(props) => props.top}px;
  font-size: ${(props) => props.size}px;
  margin-left: ${(props) => props.left}px;
  margin-right: ${(props) => props.right}px;
  margin-bottom: ${(props) => props.bottom}px;
  line-height: ${(props) => props.lineHeight}px;
`;
