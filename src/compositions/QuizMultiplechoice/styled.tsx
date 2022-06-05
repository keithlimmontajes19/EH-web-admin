import styled from 'styled-components';
import {theme} from 'utils/colors';

export const Container = styled.div`
  padding-horizontal: 20px;
`;

export const SubContainer = styled.div`
  padding: 15px;
`;

export const TextContainer: any = styled.div`
  padding: 10px;
  margin-top: 15px;
  border-radius: 15px;
  border: 1px solid ${theme.LINK_TEXT};
  background: ${(props: any) => props.background};
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
`;

export const FlexWrapContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
`;
