import React from 'react';
import { connect } from 'umi';
import Check from '@/pages/utils/Check';

interface IProps {}

interface ITask {
  title: string;
  isDone: boolean;
}

const Task = ({ title, isDone }: ITask) => (
  <div className="border-bottom mb-2 pb-2 d-flex align-items-center">
    <div className="me-2">
      <Check checked={isDone} />
    </div>
    {title}
  </div>
);

const OnboardingTasks = (props: IProps) => {
  return (
    <>
      <h3>Tasks</h3>

      <Task title="Set up your Teacher`s Account" isDone={true} />
      <Task title="Confirm email" isDone={false} />
      <Task title="Set up telephony" isDone={false} />
      <Task title="Invite a team members" isDone={false} />
      <Task title="Set up online payments" isDone={false} />
      <Task title="Get clients from Facebook" isDone={false} />
      <Task title="Get clients from Google" isDone={false} />
      <Task title="Create a Client" isDone={false} />
    </>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTasks);
