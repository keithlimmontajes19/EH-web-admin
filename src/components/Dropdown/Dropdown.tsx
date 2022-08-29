import { Dropdown as AntDropdown, Menu } from 'antd';

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
const Dropdown = ({ menu = [], title = <></>, disabled = false }) => {
  const menued = (
    <Menu style={{ borderRadius: 20, padding: 10 }}>
      {menu.map((obj, i) => (
        <Menu.Item
          key={i}
          color="#e0dffe"
          onClick={obj.action}
          style={{
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 16,
            color: '#4C4B7B',
          }}
        >
          {obj.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <AntDropdown
      placement="bottomRight"
      overlay={menued}
      disabled={disabled}
      overlayStyle={{
        boxShadow: '0px 0px 8px 1px rgba(99, 95, 250, 0.3)',
        minWidth: 185,
        borderRadius: 20,
      }}
    >
      {title}
    </AntDropdown>
  );
};

export default Dropdown;
