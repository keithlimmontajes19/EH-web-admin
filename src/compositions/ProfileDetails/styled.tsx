import styled from "styled-components";
import { theme } from "utils/colors";
import { Table, Input } from "antd";

export const Container = styled.div`
  padding: 85px;
`;

export const StyledBack = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #a2a1bd;
  line-height: 18px;
  text-decoration-line: underline;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 237px;
  padding: 30px;
  margin-top: 71px;
  background: ${theme.HEADER};
  border-radius: 15px 15px 0px 0px;
`;

export const StyledTable: any = styled(Table).attrs((props: any) => ({
  ...props,
  size: "small",
}))`
  .ant-table-thead > tr > th {
    background: ${theme.HEADER};
  }
  border: none;
`;

export const StyledHeader: any = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: #635ffa;
  line-height: 28px;
`;

export const ConfirmContainer = styled.div`
  opacity: 0.8;
  display: flex;
  color: #4c4b7b;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  margin-right: 25px;
  align-items: center;
  flex-direction: row;
`;

export const EditStyles = {
  color: "#635ffa",
  fontSize: "18px",
  padding: "10px 10px",
};

export const DeleteStyles = {
  color: "#635ffa",
  fontSize: "18px",
  padding: "10px 10px",
};

export const MoreStyles = {
  fontSize: 25,
  color: "#635FFA",
  paddingLeft: "5px",
  fontWeight: "bolder",
};

export const overlayStyles = { borderRadius: "15px" };

export const PopoverContainer = styled.div`
  font-size: 18px;
`;

export const StyledTitle = styled.p`
  color: #4c4b7b;
  margin-top: 5px;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  margin-left: 15px;
`;

export const StyledInput: any = styled(Input)`
  width: 497px;
  height: 48px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  padding-left: 20px;
  border-radius: 20px;
  margin-bottom: 40px;
`;

export const StyledInvite = styled.button`
  width: 160px;
  height: 44px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  box-shadow: none;
  font-weight: 700;
  border-radius: 8px;
  background: #635ffa;
`;

export const StyledCancel = styled.button`
  border: none;
  color: #635ffa;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  text-align: right;
  margin-right: 20px;
  background: transparent;
`;
