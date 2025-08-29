type MainContextProviderPropsType = {
  children: ReactNode;
};

type MainContextProviderValueType = {
  pageName: string;
  setPageName: React.Dispatch<React.SetStateAction<string>>;
};

type ModalValueType<T> = {
  isModalOpen: boolean;
  array: T[];
  arrayItem: T;
};

type TasksType = {
  id?: number;
  name: string;
  date: string;
  isImportant: boolean;
  isDone: boolean;
};

type RoutesType = {
  path: string;
  element: JSX.Element;
  children?: RoutesType[];
};

type AuthPagesPropsType = {
  pageTitle: string;
  titleIcon: IconDefinition;
  switchLinkText: string;
  switchLinkName: string;
  switchLinkAddress: string;
  isSignUp?: boolean;
};

type SignUpFetchBodyContentType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type LogInFetchBodyContentType = {
  username: string;
  password: string;
};

type AuthenticationErrorType = {
  emailErr: string;
  usernameErr: string;
  passwordErr: string;
  confirmPasswordErr: string;
};

type InputErrMessageProps = {
  errMessage: string;
  conditionState1: string;
  conditionState2?: string;
};

type ShowPassIconPropsType = {
  showPass: boolean;
  onToggle: (val: boolean) => void;
};

type AuthSwitchLinkProps = {
  text: string;
  linkAddress: string;
  linkName: string;
};

type AuthTitlePropsType = {
  title: string;
  icon: IconDefinition;
};

type TaskBoxType = {
  task: TasksType;
  index: number;
};

type sidebarItemsInfoType = {
  icon: IconDefinition;
  iconColor?: string;
  name: string;
  linkAddress?: string;
  disable?: boolean;
};

type WeatherType = {
  cityName: string;
  countryName: string;
  weatherImg: string;
  temp: number;
  lastUpdate: string;
};

type TasksSliceInitialStateType = {
  tasks: TasksType[];
};

type TasksSliceAddPayloadType = {
  id: number;
  taskName: string;
  taskDate: string;
  isImportant: boolean;
};

type ConfirmModalPropsType = {
  onSetNewListOfDeletedItem: (val: TasksType[]) => void;
};

export {
  MainContextProviderPropsType,
  MainContextProviderValueType,
  ModalValueType,
  TasksType,
  RoutesType,
  AuthPagesPropsType,
  SignUpFetchBodyContentType,
  LogInFetchBodyContentType,
  AuthenticationErrorType,
  InputErrMessageProps,
  ShowPassIconPropsType,
  AuthSwitchLinkProps,
  AuthTitlePropsType,
  TaskBoxType,
  sidebarItemsInfoType,
  WeatherType,
  TasksSliceInitialStateType,
  TasksSliceAddPayloadType,
  ConfirmModalPropsType,
};
