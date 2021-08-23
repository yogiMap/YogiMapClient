import React, { useEffect } from 'react';
import { connect } from 'umi';
import '../theme';
import '@/styles/styles.scss';
import '@/styles/nprogress.css';
import Sidepanel from '@/pages/utils/sidepanel/Sidepanel';

interface IProps {
  children: any;
  auth: () => void;
}

const EntryLayout = ({ children, auth }: IProps) => {
  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      {children}
      <Sidepanel />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  auth: () => dispatch({ type: 'User/auth' }),
});

export default connect(null, mapDispatchToProps)(EntryLayout);
