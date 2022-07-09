import { Space } from "antd";
import styled from "styled-components";
import { theme } from "utils/colors";

export const Container = styled.div``;

export const ChartContainer = styled.div`
  background: ${theme.WHITE_MID};
  border-radius: 15px;
  height: 280px;
  padding: 15px 10px 10px 0;
  margin: 0 10px;
  box-shadow: 0px 3px 10px ${theme.PRIMARY_MID};
`;

export const DateSelectionSpace = styled(Space)`
  margin: 0 0 0 15px;

  .ant-picker-input > input,
  .ant-picker-input-placeholder > input,
  .ant-picker-suffix,
  .ant-picker-clear {
    background: none;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    color: ${theme.PRIMARY};
  }

  .ant-picker-date-fixed .ant-picker-header {
    display: none;
  }

  .ant-picker {
    background: none;
    height: 35px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid ${theme.PRIMARY};
    padding: 0;
    overflow: hidden;

    &:hover,
    &:active,
    &:focus {
      background: none;
      border: 1px solid ${theme.PRIMARY};
    }

    input {
      width: 70%;
      &::placeholder {
        color: ${theme.PRIMARY};
      }
    }
  }
`;
