import styled from 'styled-components';

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
export const FlexWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const AddContainer: any = styled.div`
  background: #e0dffe;
  // min-height: ${({ scalable = false }: any) => (scalable ? `90%` : `500px`)};
  min-height: 496px;
  margin: 36px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlusImg = styled.img`
  height: 80%;
  width: 80%;
  max-height: 144px;
  cursor: pointer;
`;
