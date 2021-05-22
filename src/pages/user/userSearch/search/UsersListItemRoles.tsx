import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';

interface IProps {
  userRoles: string[];
  usersRolesList: string[];
  userId: string;
  onChange: (values: { roles: string[]; userId: string }) => void;
}

const UsersListItemRoles = (props: IProps) => {
  const { userRoles = [], usersRolesList = [], userId, onChange } = props;
  const [visible, setVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(userRoles);

  function handleSelection(selectedRoles: string[]) {
    onChange({ roles: selectedRoles, userId: userId });
    setSelectedRoles(selectedRoles);
  }

  function handleDeSelection(selectedRoles: string[]) {
    onChange({ roles: selectedRoles, userId: userId });
    setSelectedRoles(selectedRoles);
  }

  const handleClick = () => {
    setVisible(!visible);
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={userRoles}
      multiple={true}
      selectedKeys={selectedRoles}
      // @ts-ignore
      onSelect={({ selectedKeys }) => handleSelection(selectedKeys)}
      // @ts-ignore
      onDeselect={({ selectedKeys }) => handleDeSelection(selectedKeys)}
    >
      {usersRolesList.map((el) => (
        <Menu.Item key={el}>{el}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      {selectedRoles.length === 0 && <span>No roles</span>}
      {selectedRoles.map((role) => (
        <span key={role}>{role} </span>
      ))}

      <Dropdown trigger={['click']} overlay={() => menu} visible={visible}>
        <div className="pointer btn btn-link primary-link " onClick={() => handleClick()}>
          Change
        </div>
      </Dropdown>
    </div>
  );
};

export default UsersListItemRoles;
