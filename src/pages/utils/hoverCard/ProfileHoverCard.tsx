import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Popover, Button } from 'antd';

interface IProps {
  name: string;
  id: string;
  // Sidepanel: ISidepanel;
  // close: () => void;
}

const ProfileHoverCard = (props: IProps) => {
  const name = get(props, 'name');
  const id = get(props, 'id');

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const onVisibleChange = () => {
    console.log('onVisibleChange');
  }

  return (
    <div>
      <Popover content={content} title={name} trigger="hover" onVisibleChange={onVisibleChange}>
        <Link to={`/profile/${id}`}>
          {name}
        </Link>;
      </Popover>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  // Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  // close: () => dispatch({ type: 'ProfileHoverCard/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHoverCard);
