import styled from "@emotion/styled";

const Container = styled.main`
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.large} auto;
  padding: 0 ${({ theme }) => theme.spacing.medium};
  width: 95%;
`;

export default Container;
