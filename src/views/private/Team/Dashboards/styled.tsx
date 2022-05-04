import { Button, Layout } from "antd";
import styled from "styled-components";

export const RootContainer = styled.div`
  .ant-row ant-row-center {
    row-gap: 0px;
    display: flex;
    align-items: center;
  }
  .ant-row {
    display: flex;
    align-items: center;
  }
  .ant-layout ant-layout sc-cOFTSb eNnZcb {
    background: none !important;
  }
  .ant-layout-content {
    background: none !important;
  }
  #rootContainer {
    background: none !important;
  }
  .ant-row {
    justify-content: space-around;
  }
  .ant-layout* {
    background: none !important;
    padding-left: 15px;
  }
`;
export const StyledButtonCancle = styled(Button)`
  background: #fff;
  color: #635ffa;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  justify-contet: center;
  cursor: pointer;
  border: none;
`;
export const StyledButton = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  justify-contet: center;
  cursor: pointer;
  border: none;
`;

export const HeaderContainer = styled.div`
  font-weight: bold;
  background: #f6f6f6;
  padding: 25px;
  border-radius: 15px;
`;
export const AddContainer = styled.div`
  background: #e0dffe;

  @media screen and (max-width: 1600px) {
     {
      padding: 200px !important;
    }
  }
  padding: 300px;
  border-radius: 15px;
  align-items: center;
  margin-right: 15px;
`;
export const PlusImg = styled.img`
  height: 100%;
  width: 100%;
  max-height: 144px;
  cursor: pointer;
`;
