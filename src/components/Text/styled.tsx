import styled from "styled-components";
import { theme } from "utils/colors";

export const StyledSpan: any = styled.span`
  font-style: normal;
  font-family: ${({ fontStyle }: any) =>
      fontStyle === "DM" ? "DM Sans" : "Red Hat Display"},
    sans-serif;
  color: ${({ fC }: any) => fC || theme.PRIMARY};
  font-size: ${({ fS }: any) => fS || 28}px;
  font-style: ${({ fStyle }: any) => fStyle || `normal`};
  font-weight: ${({ fW }: any) => fW || 700};
  line-height: ${({ fS, fLH }: any) => (fLH ? fLH : fS || 28)}px;
  opacity: ${({ o }: any) => o || 1};
  margin: ${({ m }: any) => m || `0 0`};
  ${({ u }: any) => u && `text-decoration:underline; cursor: pointer;`};
`;
