import styled from 'styled-components';
import {theme} from 'utils/colors';
import {Input, Button} from 'antd';

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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(25px);
  border-radius: 550px;
  margin-top: 20px;
  height: 50px;
  width: 404.29px;
`;

export const StyledPassword = styled(Input.Password)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(25px);
  border-radius: 550px;
  height: 50px;
  width: 404.29px;
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(
    89.48deg,
    #4ab9e7 1.41%,
    #635ffa 52.72%,
    #ab70f1 96.82%
  );
  box-shadow: 0px 6px 12px rgba(35, 34, 47, 0.02);
  border-radius: 50px;
  color: white;
  height: 50px;
  width: 404.29px;
`;

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 233px;
`;

export const StyledTextlink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #635ffa;
  margin-top: 10px;
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
`;

export const TitleStyled = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(0deg, #2b2e4a, #2b2e4a),
    linear-gradient(
      90.43deg,
      #4ab9e7 6.89%,
      #635ffa 28.13%,
      #ab70f1 48.02%,
      #ff755b 72.88%,
      #ff4545 93.67%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-top: 50px;
`;

export const InputContaier = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
`;

export const LabelStyled = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  color: #635ffa;
`;
