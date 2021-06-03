import React, { useEffect } from 'react';
import { connect } from 'umi';
import '../theme';
import '@/styles/styles.scss';
import '@/styles/nprogress.scss';
import { get } from 'lodash';
import WizardAlert from '@/pages/utils/WizardAlert';

interface IProps {
  children: any;
  auth: () => void;
  location: {
    pathname: string;
  };
  Account: any;
}

const SecurityLayout = ({ children, auth, location, Account }: IProps) => {
  const roles = get(Account, 'roles', []);
  const isAlertVisible = roles.includes('new') && location.pathname !== '/wizard';
  console.log(roles, '++++++++++++++++++++++++');
  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      {isAlertVisible && <WizardAlert />}
      {children}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  auth: () => dispatch({ type: 'Account/auth' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityLayout);
