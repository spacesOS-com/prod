import { useLingui } from '@lingui/react/macro';
import { useRecoilValue } from 'recoil';
import {
  H2Title,
  IconWorld,
  Section,
  UndecoratedLink,
  Status,
} from 'twenty-ui';

import { isMultiWorkspaceEnabledState } from '@/client-config/states/isMultiWorkspaceEnabledState';
import { SettingsCard } from '@/settings/components/SettingsCard';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { DeleteWorkspace } from '@/settings/profile/components/DeleteWorkspace';
import { NameField } from '@/settings/workspace/components/NameField';
import { ToggleImpersonate } from '@/settings/workspace/components/ToggleImpersonate';
import { WorkspaceLogoUploader } from '@/settings/workspace/components/WorkspaceLogoUploader';
import { SettingsPath } from '@/types/SettingsPath';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { getSettingsPath } from '~/utils/navigation/getSettingsPath';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';

export const SettingsWorkspace = () => {
  const isMultiWorkspaceEnabled = useRecoilValue(isMultiWorkspaceEnabledState);
  const { t } = useLingui();
  const currentWorkspace = useRecoilValue(currentWorkspaceState);
  return (
    <SubMenuTopBarContainer
      title={t`General`}
      links={[
        {
          children: t`Workspace`,
          href: getSettingsPath(SettingsPath.Workspace),
        },
        { children: t`General` },
      ]}
    >
      <SettingsPageContainer>
        <Section>
          <H2Title title={t`Picture`} />
          <WorkspaceLogoUploader />
        </Section>
        <Section>
          <H2Title title={t`Name`} description={t`Name of your workspace`} />
          <NameField />
        </Section>
        {isMultiWorkspaceEnabled && (
          <>
            <Section>
              <H2Title
                title={t`Domain`}
                description={t`Edit your subdomain name or set a custom domain.`}
              />
              <UndecoratedLink to={getSettingsPath(SettingsPath.Domain)}>
                <SettingsCard
                  title={t`Customize Domain`}
                  Icon={<IconWorld />}
                  Status={
                    currentWorkspace?.customDomain &&
                    currentWorkspace?.isCustomDomainEnabled ? (
                      <Status text={'Active'} color={'turquoise'} />
                    ) : currentWorkspace?.customDomain ? (
                      <Status text={'Inactive'} color={'orange'} />
                    ) : undefined
                  }
                />
              </UndecoratedLink>
            </Section>
            <Section>
              <H2Title
                title={t`Support`}
                adornment={<ToggleImpersonate />}
                description={t`Grant Spaces support temporary access to your workspace so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time.`}
              />
            </Section>
          </>
        )}
        <Section>
          <DeleteWorkspace />
        </Section>
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
