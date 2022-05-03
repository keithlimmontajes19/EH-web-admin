import { ReactElement } from "react";
import { Collapse } from "antd";
import { Checkbox } from "antd";

import type { PropsType } from "./types";
import { Container, CollapseTab } from "./styled";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
function callback(key: any) {
  console.log(key);
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const Collapsetab = (props: PropsType): ReactElement => {
  return (
    <Container>
      <CollapseTab>
        <Checkbox onChange={onChange}>
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Panel header="page 1" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Checkbox>
      </CollapseTab>
      <CollapseTab>
        <Checkbox onChange={onChange}>
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Panel header="page 1" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Checkbox>
      </CollapseTab>
      <CollapseTab>
        <Checkbox onChange={onChange}>
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Panel header="page 1" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Checkbox>
      </CollapseTab>
    </Container>
  );
};

export default Collapsetab;
