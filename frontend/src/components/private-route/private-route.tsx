import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks/';
import {getIsAuth, getIsUnknown} from '../../store/user-data/selectors';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const isAuth = useAppSelector(getIsAuth);
  const isUnknown = useAppSelector(getIsUnknown);

  if (isAuth) {
    return children;
  }

  if (isUnknown) {
    return <Spinner />;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
