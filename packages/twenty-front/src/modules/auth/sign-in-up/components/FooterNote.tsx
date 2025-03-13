import styled from '@emotion/styled';
import { Trans } from '@lingui/react/macro';

const StyledContainer = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
  max-width: 280px;
  text-align: center;

  & > a {
    color: ${({ theme }) => theme.font.color.tertiary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterNote = () => (
  <StyledContainer>
    <Trans>By using Spaces, you agree to the</Trans>{' '}
    <a
      href="https://spacesos.com/terms"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Trans>Terms of Service</Trans>
    </a>{' '}
    <Trans>and</Trans>{' '}
    <a
      href="https://spaces.com/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Trans>Privacy Policy</Trans>
    </a>
    .
  </StyledContainer>
);
