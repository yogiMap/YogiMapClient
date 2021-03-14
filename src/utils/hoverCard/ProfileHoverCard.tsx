import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';

interface IProps {
  name: string;
  id: string;
  // Sidepanel: ISidepanel;
  // close: () => void;
}

const ProfileHoverCard = (props: IProps) => {
  const name = get(props, 'name');
  const id = get(props, 'id');

  return <Link to={`/profile/${id}`}>{name}</Link>;
};

const mapStateToProps = (state: any) => ({
  // Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  // close: () => dispatch({ type: 'ProfileHoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHoverCard);
