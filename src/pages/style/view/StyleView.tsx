import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  styleId: string;
  name: string;
  styleGetById: (id: string) => void;
}

const StyleView = (props: IProps) => {
  const styleId = get(props, 'match.params.styleId');
  const name = get(props, 'StyleView.name', '');
  const description = get(props, 'StyleView.description', '');

  console.log(props);

  useEffect(() => {
    props.styleGetById(styleId);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center m-4">{name}</h1>
      <p>{description}</p>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StyleView: state.StyleView,
});

const mapDispatchToProps = (dispatch: any) => ({
  styleGetById: (payload: string) => dispatch({ type: 'StyleView/styleGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyleView);
