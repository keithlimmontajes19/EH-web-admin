import {Dropdown as AntDropdown, Menu} from 'antd';

/* Menu and Title Sample

const SampleMenu = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <DownOutlined />,
        disabled: true,
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

const SampleTitle = <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
Hover me <DownOutlined />
</a>

*/
const Dropdown = ({menu = [], title = <></>, disabled = false}) => {
  const menued = (
    <Menu>
      {menu.map((obj, i) => (
        <Menu.Item onClick={obj.action}>{obj.name}</Menu.Item>
      ))}
    </Menu>
  );

  return <AntDropdown overlay={menued} disabled={disabled}>{title}</AntDropdown>;
};

export default Dropdown;
