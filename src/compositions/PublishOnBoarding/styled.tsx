import styled from "styled-components";
import { Button, Modal } from "antd";

export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
`;

export const ModalContainer = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
    padding: 2px;
  }

  .ant-modal-header {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  .ant-modal-title {
    margin: 0;
    /* color: rgb(54 52 137); */
    color: #635ffa;
    font-weight: 700;
    font-size: 25px;
    line-height: 22px;
    word-wrap: break-word;
  }

  .ant-modal-body {
    width: auto;
    padding: 16px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }

  .ant-btn {
    background: #635ffa;
    color: #fff;
    width: auto;
    height: 48px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    justify-contet: center;
    cursor: pointer;
    border: none;
  }

  .ant-btn ant-btn-primary {
    background: #635ffa;
    color: #fff;
    width: auto;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    justify-contet: center;
    cursor: pointer;
    border: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`;

export const Contentdiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: 25px;
  opacity: 0.8;
  cursor: pointer;
  font-weight: 700;
  color: ;
`;

export const ImageContainer = styled.div`
  background: #f7f7f7;
  max-width: 201px;
  max-height: 149px;
  min-height: 149px;
`;

export const Img = styled.img``;

export const Heading = styled.div`
  text-align: center;
  max-width: 201px;
  min-width: 201px;
  background: #f7f7f7;
  min-height: 35px;
  margin: 10px 0px;
  padding: 2px;
  color: #4c4b7b;
  font-weight: 700;
  font-size: 20px;
`;

export const Description = styled.div`
  margin: 0px 10px;
  max-width: 201px;
  min-width: 201px;
  max-height 109px;
  min-height: 109px;
  text-align: center;
  background: #f7f7f7;
  color: #4C4B7B;
  font-weight: 400;
  font-size: 18px;
`;

export const ScreenTitle = styled.div`
  padding: 15px;
  text-align: center;
`;

export const ScreenContainer: any = styled.div`
  height: 381px;
  width: 244px;
  border-radius: 20px;
  margin-right: 18px;
  margin-top: 20px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  opacity: ${(props: any) => (props.isPublish ? 0.3 : 1)}px;
  background-color: ${(props: any) => (props.isPublish ? "#BDBDBD" : "#fff")}px;
`;

export const NameStyled = styled.p`
  font-weight: 400;
  font-size: 20px;
  color: #4c4b7b;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 27px;
  margin-left: -20px;
`;
