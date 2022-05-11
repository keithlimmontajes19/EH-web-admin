import styled from 'styled-components';
import { Button, Layout } from 'antd';
import { theme } from 'utils/colors';
export const Container = styled.div``;


export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: auto;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;
export const StyledButtonCancle = styled(Button)`
  background: #fff;
  color: #635ffa;
  width: auto;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  justify-contet: center;
  cursor: pointer;
  border: none;
`;
export const MainScreenContainer = styled(Layout)`
display:flex;
flex-direction:column;
align-items:center;
padding-bottom:100px;
`

export const StyledText = styled.span`


height: 25px;

/* Headline 4 */
font-family: 'Red Hat Display';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
color: #1D2D3A;
opacity: 0.5;
margin:20px 0px;
`
export const ScreenContainer = styled.div`
display:flex;
margin-top:0px;
margin-bottom:40px;
flex-direction:column;
align-items:center;
background: #FFFFFF;
box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
border-radius: 20px;
`
export const ContainerImg = styled.div`
display:flex;
flex-direction:column;
align-items:center;
padding:80px 80px 40px 80px;
background:#f8f8f8;

`
export const ImgaeContainer = styled.img`
height:126px;
width:auto;
opacity:0.5;
`
export const TitleContainer = styled.div`
padding:5px;
margin:5px;
`
export const DescreptionContainer = styled.div`
margin-bottom:65px`

export const UploadButton = styled(Button)`
margin-top:80px;
border-radius:15px;
font-weight:700;
border-color:${theme.PRIMARY};
color:${theme.PRIMARY};

`