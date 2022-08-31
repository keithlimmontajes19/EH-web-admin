import styled from 'styled-components';
import { Button, Layout } from 'antd';
import { theme } from 'utils/colors';
export const Container = styled.div``;

export const StyledButton: any = styled(Button)`
  gap: 10px;
  width: 180px;
  height: 48px;
  background: #635ffa;
  border-radius: 8px;
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;

export const StyledButtonCancle = styled.button`
  background: transparent;
  gap: 10px;
  width: 180px;
  height: 48px;
  border: none;

  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #635ffa;
`;

export const MainScreenContainer = styled(Layout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

export const StyledText = styled.span`
  height: 25px;

  /* Headline 4 */
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #1d2d3a;
  opacity: 0.5;
  margin: 20px 0px;
`;

export const ScreenContainer = styled.div`
  display: flex;
  margin-top: 0px;
  margin-bottom: 40px;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  border-radius: 20px;
`;

export const ContainerImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f8f8;
  width: 280px;
  height: 280px;
`;

export const ImgaeContainer = styled.img`
  height: 100%;
  width: 100%;
`;

export const TitleContainer = styled.div`
  padding: 5px;
  margin: 5px;
`;

export const DescreptionContainer = styled.div`
  margin-bottom: 65px;
`;

export const UploadButton = styled(Button)`
  margin-top: 80px;
  border-radius: 15px;
  font-weight: 700;
  border-color: ${theme.PRIMARY};
  color: ${theme.PRIMARY};
`;

export const BackbuttonText = styled.a`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  text-decoration-line: underline;
  color: #a2a1bd !important;
`;
