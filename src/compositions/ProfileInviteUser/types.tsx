export type PropsType = {
  testID?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  loading?: boolean;
  data?: Array<any>;
  organization_id?: string;
  getMembersOrganization?: any;
};
