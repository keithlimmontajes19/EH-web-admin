import styled from "styled-components";

export const Container = styled.div``;

export const SelectWrapper = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }
  .ant-select:not(.ant-select-customize-input).ant-select:focused:not(.ant-select-disabled)
    .ant-select-selector {
    position: relative;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    border-color: #fff;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;
