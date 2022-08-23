import styled from 'styled-components';
import { theme } from 'utils/colors';
import { Input, Button } from 'antd';

export const Container = styled.div`
  padding: 30px;
  align-content: center;
  align-items: center;
  overflow: hidden;
  margin-left: 50px;
  margin-right: 50px;
  overflow: hidden;
`;

export const StyledInput: any = styled<any>(Input)`
  backdrop-filter: blur(25px);
  margin-top: 20px;
  height: 50px;
  width: 100%;
  color: #a2a1bd;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const StyledPassword = styled(Input.Password)`
  backdrop-filter: blur(25px);
  height: 50px;
  width: 100%;

  color: #a2a1bd;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
  border-radius: 8px;

  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(
    89.48deg,
    #4ab9e7 1.41%,
    #635ffa 52.72%,
    #ab70f1 96.82%
  );
  box-shadow: 0px 6px 12px rgba(35, 34, 47, 0.02);
  border-radius: 8px;
  color: white;
  height: 50px;
  width: 100%;

  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

export const StyledTextlink = styled.a`
  font-weight: 400;
  line-height: 18px;
  text-align: right;
  margin-top: 10px;
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-size: 16px;
  color: #635ffa;
`;

export const SubtitledContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const AlertContainer = styled.div`
  border: 0 solid transparent;
  border-radius: 0.358rem;
  background: ${theme.LOGIN_ALERT};
  padding: 15px;
  color: ${theme.LOGIN_ALERT_FONT};
  margin-bottom: 20px;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 23px;
`;

export const TitleStyled = styled.div`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #4c4b7b;
`;

export const WelcomBack = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  color: #4c4b7b;
`;
export const InputContaier = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 57px;
`;

export const LabelStyled = styled.span`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  color: #635ffa;
`;

export const SignuptStyled = styled.span`
  font-family: 'DM Sans', sans-serfi;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #4c4b7b;
`;

export const StyledCancel = styled.button`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #635ffa;
  background: transparent;
  border: none;
  width: 100%;
`;

export const DividerButton = styled.div`
  margin-top: 33px;
`;

export const Subtitle = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #a2a1bd;
  width: 100%;
`;
