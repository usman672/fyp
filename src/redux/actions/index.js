// export action creators
import * as UserActions from './userActions';
import * as LoaderActions from './loaderActions';
import * as AddressActions from './addressAction';
import * as BankActions from './bankAction';
import * as ProductActions from './productAction';
import * as ImageUploadActions from './imageUploadAction';
import * as CategoriesActions from './categoriesAction';
import * as AddHelpQueryActions from './helpQueryAction';
import * as CartAction from './cartAction';
import * as OrderAction from './orderAction';
import * as NotificationAction from './notificationAction';

const Actions = Object.assign(
  {},
  UserActions,
  LoaderActions,
  AddressActions,
  BankActions,
  ProductActions,
  ImageUploadActions,
  CategoriesActions,
  AddHelpQueryActions,
  CartAction,
  OrderAction,
  NotificationAction,
);
export default Actions;
