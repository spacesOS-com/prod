import {
  IconApi,
  IconApps,
  IconAt,
  IconCalendarEvent,
  IconColorSwatch,
  IconComponent,
  IconCurrencyDollar,
  IconDoorEnter,
  IconFlask,
  IconFunction,
  IconHierarchy2,
  IconKey,
  IconLock,
  IconMail,
  IconRocket,
  IconServer,
  IconSettings,
  IconUserCircle,
  IconUsers,
  IconWebhook,
} from 'twenty-ui';

import { SettingsPath } from '@/types/SettingsPath';
import { FeatureFlagKey } from '~/generated-metadata/graphql';
import { SettingsPermissions } from '~/generated/graphql';

import { useAuth } from '@/auth/hooks/useAuth';
import { currentUserState } from '@/auth/states/currentUserState';
import { billingState } from '@/client-config/states/billingState';
import { labPublicFeatureFlagsState } from '@/client-config/states/labPublicFeatureFlagsState';
import { useSettingsPermissionMap } from '@/settings/roles/hooks/useSettingsPermissionMap';
import { NavigationDrawerItemIndentationLevel } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { useFeatureFlagsMap } from '@/workspace/hooks/useFeatureFlagsMap';
import { t } from '@lingui/core/macro';
import { useRecoilValue } from 'recoil';

export type SettingsNavigationSection = {
  label: string;
  items: SettingsNavigationItem[];
  isAdvanced?: boolean;
};

export type SettingsNavigationItem = {
  label: string;
  path?: SettingsPath;
  onClick?: () => void;
  Icon: IconComponent;
  indentationLevel?: NavigationDrawerItemIndentationLevel;
  matchSubPages?: boolean;
  isHidden?: boolean;
  subItems?: SettingsNavigationItem[];
  isAdvanced?: boolean;
  soon?: boolean;
};

const useSettingsNavigationItems = (): SettingsNavigationSection[] => {
  const billing = useRecoilValue(billingState);

  const isFunctionSettingsEnabled = false;
  const isBillingEnabled = billing?.isBillingEnabled ?? false;
  const currentUser = useRecoilValue(currentUserState);
  const isAdminEnabled =
    (currentUser?.canImpersonate || currentUser?.canAccessFullAdminPanel) ??
    false;
  const labPublicFeatureFlags = useRecoilValue(labPublicFeatureFlagsState);

  const featureFlags = useFeatureFlagsMap();
  const permissionMap = useSettingsPermissionMap();
  const { signOut } = useAuth();
  return [
    {
      label: t`User`,
      items: [
        {
          label: t`Profile`,
          path: SettingsPath.ProfilePage,
          Icon: IconUserCircle,
        },
        {
          label: t`Experience`,
          path: SettingsPath.Experience,
          Icon: IconColorSwatch,
        },
        {
          label: t`Accounts`,
          path: SettingsPath.Accounts,
          Icon: IconAt,
          matchSubPages: false,
          subItems: [
            {
              label: t`Emails`,
              path: SettingsPath.AccountsEmails,
              Icon: IconMail,
              indentationLevel: 2,
            },
            {
              label: t`Calendars`,
              path: SettingsPath.AccountsCalendars,
              Icon: IconCalendarEvent,
              indentationLevel: 2,
            },
          ],
        },
      ],
    },
    {
      label: t`Workspace`,
      items: [
        {
          label: t`General`,
          path: SettingsPath.Workspace,
          Icon: IconSettings,
          isHidden: !permissionMap[SettingsPermissions.WORKSPACE],
        },
        {
          label: t`Members`,
          path: SettingsPath.WorkspaceMembersPage,
          Icon: IconUsers,
          isHidden: !permissionMap[SettingsPermissions.WORKSPACE_MEMBERS],
        },
        {
          label: t`Roles`,
          path: SettingsPath.Roles,
          Icon: IconLock,
          isHidden:
            !featureFlags[FeatureFlagKey.IsPermissionsEnabled] ||
            !permissionMap[SettingsPermissions.ROLES],
        },
        {
          label: t`Billing`,
          path: SettingsPath.Billing,
          Icon: IconCurrencyDollar,
          isHidden:
            !isBillingEnabled || !permissionMap[SettingsPermissions.WORKSPACE],
        },
        {
          label: t`Data model`,
          path: SettingsPath.Objects,
          Icon: IconHierarchy2,
          isHidden: !permissionMap[SettingsPermissions.DATA_MODEL],
        },
        {
          label: t`Integrations`,
          path: SettingsPath.Integrations,
          Icon: IconApps,
          isHidden: true,
        },
        {
          label: t`Security`,
          path: SettingsPath.Security,
          Icon: IconKey,
          isAdvanced: true,
          isHidden: !permissionMap[SettingsPermissions.SECURITY],
        },
      ],
    },
    {
      label: t`Developers`,
      isAdvanced: true,
      items: [
        {
          label: t`APIs`,
          path: SettingsPath.APIs,
          Icon: IconApi,
          isAdvanced: true,
          isHidden: !permissionMap[SettingsPermissions.API_KEYS_AND_WEBHOOKS],
        },
        {
          label: t`Webhooks`,
          path: SettingsPath.Webhooks,
          Icon: IconWebhook,
          isAdvanced: true,
          isHidden: !permissionMap[SettingsPermissions.API_KEYS_AND_WEBHOOKS],
        },
        {
          label: t`Functions`,
          path: SettingsPath.ServerlessFunctions,
          Icon: IconFunction,
          isHidden: !isFunctionSettingsEnabled,
          isAdvanced: true,
        },
      ],
    },
    {
      label: t`Other`,
      items: [
        {
          label: t`Server Admin`,
          path: SettingsPath.ServerAdmin,
          Icon: IconServer,
          isHidden: !isAdminEnabled,
        },
        {
          label: t`Lab`,
          path: SettingsPath.Lab,
          Icon: IconFlask,
          isHidden: true,
        },
        {
          label: t`Releases`,
          path: SettingsPath.Releases,
          Icon: IconRocket,
          isHidden: true,
        },
        {
          label: t`Logout`,
          onClick: signOut,
          Icon: IconDoorEnter,
        },
      ],
    },
  ];
};

export { useSettingsNavigationItems };
