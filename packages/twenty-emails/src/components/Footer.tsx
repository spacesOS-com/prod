import { Column, Row } from '@react-email/components';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

export const Footer = () => {
  return (
    <>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://spaces.com/"
              value="Website"
              aria-label="Visit Spaces's website"
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://www.linkedin.com/company/spacesos"
              value="LinkedIn"
              aria-label="Visit Spaces's LinkedIn"
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://x.com/Spaces_OS"
              value="Twitter/X"
              aria-label="Visit Spaces's Twitter"
            />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>
        SpacesOS Inc.
        <br />
        20th Street, San Francisco
        <br />
        California, United States
      </ShadowText>
    </>
  );
};
