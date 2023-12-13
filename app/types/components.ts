import {ReactNode} from 'react';
import {
  TextProps,
  TextStyle,
  ViewStyle,
  ColorValue,
  TextInputProps,
} from 'react-native';

export type PrimaryTextProps = {
  style?: any;
  children?: ReactNode;
  props?: TextProps;
};

export type PrimaryButtonProps = {
  style?: any;
  title: string;
  addMargin?: number;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
  textStyle?: TextStyle;
};

export type HomeHeaderProps = {
  onPressTab1?: () => void;
  onPressTab2?: () => void;
  tab?: string;
  verificationTitle?: boolean;
};

export type FieldInputProps = {
  inputViewStyles?: ViewStyle;
  inputStyles?: TextStyle;
  type?: string;
  label: string;
  onChangeText: (a: string) => void | undefined;
  onBlur: (a: any | null) => void;
  value?: string | any;
  blurOnSubmit?: boolean;
  maxLength?: number;
  onSubmitEditing?: () => void;
  keyboardType?: 'numeric' | 'default';
  multiline?: boolean;
  inputProps?: TextInputProps;
};

export type UserAddPhotoContainerProps = {
  currentPage: number;
  onPressCamera?: () => void | any;
  onPress: (values?: any) => void;
  backgroundImage?: any;
  data: any;
  isEdit?: boolean;
};

export type UserAddPhotoImageProps = {
  onPressCamera?: () => void;
  backgroundImage?: any;
};

export type FieldDropDownProps = {
  label?: string;
  data?: Array<Object> | any;
  listMode?: 'SCROLLVIEW' | 'MODAL';
  searchable?: boolean;
  style?: ViewStyle;
  searchPlaceholder?: string;
  onChangeValue: (a: any) => void | undefined;
  defaultValue?: any;
};

export type PrimaryHeaderProps = {
  title: string;
  left: 'menu' | 'back';
  search?: boolean;
  onSearchPress?: () => void;
};

export type backgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
};

export type SocialPlatformsProps = {
  onPressfacebook?: () => void;
  onPressgoogle?: () => void;
};

export type AuthFooterProps = {
  type: string;
  onPress?: () => void;
};
export type CardProps = {
  title?: string;
  description?: string;
  imageUrl: string;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
};
export type DropDownProps = {
  label?: string;
  data: [];
  onSelect: ({}) => void;
  value?: string;
  openTopSide?: boolean;
  theme?: string;
};
export type ImageSliderProps = {
  files: {
    id: number;
    service_order_id: number;
    file_type: string;
    filename: string;
    created_at: string;
    full_file_path: string;
  }[];
};

export type DoctorVerifyProps = {
  title?: string;
  description?: string;
  imageUrl: string;
  errorMessage: string;
  textColor: ColorValue;
};
export type FeedCardProps = {
  title?: string;
  imageUrl: string;
};
export type LoaderProps = {};

export type UserAddPhotoProps = {
  onAddValue: () => void;
  data?: any;
  isEdit?: boolean;
};

export type NoInternetProps = {};
export type FeedDataProps = {
  id: string;
  title: string;
  description: string;
  views: number;
  status: number;
  created_at: string;
  updated_at: string;
  comment_count: number;
  is_my_order: number;
  is_vote: number;
  user: {
    id: string;
    full_name: string;
    profile_image: string;
  };
  category: {
    id: number;
    slug: string;
    title: string;
    image: string;
  };
  files: {
    id: number;
    service_order_id: number;
    file_type: string;
    filename: string;
    created_at: string;
    full_file_path: string;
  }[];
  answer_data: {
    id: number;
    question: string;
    type?: 'radio' | 'slider' | undefined;
    answers?: {
      name: string;
      count: number;
    }[];
    avg_vote?: number;
    count: number;
    sum: number;
  }[];
  onEdit: () => void;
  onDelete: () => void;
};

export type StripePaymentProps = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
};

export type WebViewProps = {
  url: string;
  returnurl?: string;
};
