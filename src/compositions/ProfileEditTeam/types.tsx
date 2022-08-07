export type PropsType = {
  testID?: string;
  visible: boolean;
  org_id?: string;
  org_title?: string;
  org_avatar?: string;
  org_description?: string;
  modalCreateHandler?: () => void;
  setVisible: (value: boolean) => void;
};
