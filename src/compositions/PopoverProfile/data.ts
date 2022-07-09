import USER_PROFILE_ICON from 'assets/icons/profile-user.png';
import LOGOUT_PROFILE_ICON from 'assets/icons/profile-logout.png';
import SETTING_PROFILE_ICON from 'assets/icons/profile-setting.png';
import ORGANIZATION_PROFILE_ICON from 'assets/icons/profile-organization.png';

export const POPOVER_PROFILE = [
  {title: 'My Profile', icon: USER_PROFILE_ICON, url: '/profile/user'},
  {
    title: 'Account Settings',
    icon: SETTING_PROFILE_ICON,
    url: '/profile/account',
  },
  {
    title: 'My Organization',
    icon: ORGANIZATION_PROFILE_ICON,
    url: '/profile/organization',
  },
  {title: 'Log Out', icon: LOGOUT_PROFILE_ICON, url: '/logout'},
];
