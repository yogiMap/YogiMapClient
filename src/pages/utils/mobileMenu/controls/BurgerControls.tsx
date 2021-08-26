import React from 'react';
import { connect, Link } from 'umi';
import { Button } from 'antd';
import { IUser } from '@/pages/user/userSearch/types';
import { IMobileMenu } from '@/pages/utils/mobileMenu/types';
import logoSmall from '@/icons/logo_yogymap_small.svg';

interface IProps {
  open: (arg: IMobileMenu) => void;
  User: IUser;
}

const BurgerControls = (props: IProps) => {
  const burgerCreate = () => {
    props.open({
      title: 'Menu Open',
      component: 'BurgerFormCreate',
      place: 'Navbar',
      width: 800,
    });
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={burgerCreate}>
        <Link to="/" className="logo-burger">
          <img src={logoSmall} alt="Yogi Map LogoSmall" height={35} />
        </Link>
      </Button>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  User: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: IMobileMenu) => dispatch({ type: 'MobileMenu/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerControls);
