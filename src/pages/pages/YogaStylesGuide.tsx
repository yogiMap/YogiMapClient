import React, { useEffect } from 'react';
import { connect, Link } from 'umi';
import { get, omitBy } from 'lodash';
import { IStyleQueryParams } from '@/pages/style/types';
import { IState } from '@/pages/style/dashboard/model';

const initialSearchForm = {
  styleSearchParam1: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  styleSearch: (arg: IStyleQueryParams) => void;
  StyleDashboard: IState;
}

const YogaStylesGuide = (props: IProps) => {
  const styleList = get(props, 'StyleDashboard.styleList', []);
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.styleSearch(getSearchQuery());
  }, [queryParams]);

  return (
    <div id="class-type-guide" className="container">
      <h1 className="text-center my-4">Class Type Guide</h1>

      <div className="row">
        <div className="col">
          {styleList
            .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
            .map((el: any) => (
              <div key={el._id}>
                <h2>
                  <Link to={`/style/${el._id}`}>{el.name}</Link>
                </h2>
                <p>{el.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StyleDashboard: state.StyleDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  styleSearch: (payload: IStyleQueryParams) => dispatch({ type: 'StyleDashboard/styleSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(YogaStylesGuide);
