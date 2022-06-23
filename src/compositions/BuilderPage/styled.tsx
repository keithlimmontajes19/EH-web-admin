import styled from "styled-components";
import { Button, Layout } from "antd";
import { theme } from "utils/colors";

export const Container = styled.div``;

export const StyledButton: any = styled(Button)`
  background: #635ffa;
  color: #fff;
  width: 166px;
  height: 48px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
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

export const MenuContainer = styled.div`
  box-shadow: -6px -6px 64px -59px rgba(0, 0, 0, 1);
  -webkit-box-shadow: -6px -6px 64px -59px rgba(0, 0, 0, 1);
  -moz-box-shadow: -6px -6px 64px -59px rgba(0, 0, 0, 1);
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  margin: 15px;
`;
export const EditorContainer = styled(Layout)`
  margin-left: 20px;
  background: none;
  
  .rdw-editor-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }

  .demo-editor {
    background: ${theme.WHITE_MID};
    height: 100vh;
    width: 100%;
  }

  .rdw-editor-toolbar {
    border: none;
    background: none;
    align-items: flex-start;
    justify-content: center;
    height: 500px;
    width: 200px;
    margin-top: 20px;

    a {
      color: ${theme.PRIMARY};
    }

    .rdw-embedded-modal, .rdw-image-modal, .rdw-link-modal, .rdw-unlink-modal {
      margin-left: -200px;
    }
    .rdw-colorpicker-modal {
      margin-left: -150px;
    }
  }

  .rdw-inline-wrapper {
    height: 80px;
    justify-content: center;
    margin-bottom: -5px;
  }

  .rdw-block-wrapper, .rdw-dropdown-wrapper {
    width: 80px;
    height: 30px;
    margin
  }

  .rdw-fontfamily-wrapper {
    margin-top: -20px;
  }
`;
export const ItemContainer = styled.div``;

export const FontStyleContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
