import React, { useEffect } from 'react';
import { IClassTypeQueryParams } from '@/pages/classType/types';
import { connect, Link } from 'umi';
import { IState } from '@/pages/classType/dashboard/model';
import { get, omitBy } from 'lodash';

const initialSearchForm = {
  classTypeSearchParam1: '',
};

const initialSearchQuery = {
  limit: 100,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  classTypeSearch: (arg: IClassTypeQueryParams) => void;
  ClassTypeDashboard: IState;
}

const ClassTypeGuide = (props: IProps) => {
  const classTypeList = get(props, 'ClassTypeDashboard.classTypeList', []);
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };
  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.classTypeSearch(getSearchQuery());
  }, [queryParams]);

  return (
    <div id="class-type-guide" className="container">
      <h1 className="text-center my-4">Class Type Guide</h1>

      <div className="row">
        <div className="col">
          {classTypeList
            .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
            .map((el: any) => (
              <div key={el._id}>
                <h2>
                  <Link to={`/classType/${el._id}`}>{el.name}</Link>
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
  ClassTypeDashboard: state.ClassTypeDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  classTypeSearch: (payload: IClassTypeQueryParams) =>
    dispatch({ type: 'ClassTypeDashboard/classTypeSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypeGuide);
