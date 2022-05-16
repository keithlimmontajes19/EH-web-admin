import { ReactElement, useEffect, useRef, useState } from "react";

import { PlusCircleFilled } from "@ant-design/icons";
import { CustomDiv, InputStyle, LineInput, StyledText } from "./styled";
import { Col, Row, Space } from "antd";

const BuilderQuizFillBlanks = ({
  item,
  submitQ,
  deleteQ,
}: any): ReactElement => {
  const data = { ...item };
  const [splitText, setSplitText] = useState([]);
  const [toInput, setToInput] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const innerRef: any = useRef();

  useEffect(() => {
    const getText = data.body.match(/(?<=&lt;p&gt;)(.*)(?=&lt;[/]p&gt;)/);
    setSplitText(getText ? getText[0].split(/\s/) : []);
  }, []);

  useEffect(() => {
    if (!innerRef.current) return;
    let stringed = "";
    splitText.forEach((value, index) => {
      if (/^[{][\d+][}]$/g.test(value)) {
        const index = Number(value.replace(/\D/g, ""));
        const answer = data.resource.answer[index] || "";
        stringed += ` <input value='${answer}' style='width: ${
          answer.length + 5
        }ch;' key='${index}' readonly > `;
      } else {
        stringed += `<span>${value
          .replace(/</, "&lt;")
          .replace(/>/, "&gt;")} </span>`;
      }
    });
    innerRef.current.innerHTML = stringed;
    data.body = generateBody(data.description, splitText.join(" "));
    submitQ(data);
  }, [splitText]);

  const generateBody = (d, t) =>
    `&lt;html&gt; &lt;body&gt; &lt;h4&gt;${d}&lt;/h4&gt; &lt;p&gt;${t}&lt;/p&gt; &lt;/body&gt; &lt;/html&gt;`;

  const handleTextChange = (arr, addNew: any = false) => {
    let answer = [...data.resource.answer];
    let newAnswer = [];
    let count = -1;
    arr.forEach((val) => {
      if (val.includes("{")) {
        const index = Number(val.replace(/\D/g, ""));
        newAnswer.push(answer[index]);
      }
    });
    const reCount = arr.map((val) => {
      if (val.includes("{")) {
        count++;
        return `{${count}}`;
      } else return val;
    });

    if (addNew) {
      data.resource.answer = [...newAnswer, answerInput];
      setSplitText([...reCount, `{${newAnswer.length}}`]);
      setAnswerInput("");
    } else {
      data.resource.answer = newAnswer;
      setSplitText(reCount);
    }
  };

  const onPaste = (ev) => {
    ev.preventDefault();
    var text = ev.clipboardData.getData("text");
    document.execCommand(
      "insertText",
      false,
      text.replace(/(\r\n|\n|\r)/gm, "")
    );
  };

  const divInput = (e) => {
    if (e.target.localName === "div") {
      const { childNodes } = e.target;
      let tmp = "";
      let count = 0;
      for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];
        switch (node.nodeName) {
          case "INPUT":
            tmp += `{${node.attributes.key.value}} `;
            count++;
            break;
          case "SPAN":
            tmp += node.innerText;
            break;
          case "#text":
            tmp += node.textContent;
            break;
          default:
            break;
        }
      }
      setToInput(tmp.split(/\s/));
    }
  };

  return (
    <div className="question">
      <Row justify="start" style={{ marginBottom: 15 }}>
        <Col flex={1} style={{ justifyContent: "center", paddingRight: 35 }}>
          <LineInput
            value={data.title}
            placeholder="Fill Blanks Title"
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col flex={23} style={{ justifyContent: "center" }}>
          <LineInput
            defaultValue={data.description}
            placeholder="Fill Blanks Description"
            onChange={(e) => {
              data.description = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col span={3}>
          <Row justify="end">
            <StyledText fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </StyledText>
          </Row>
        </Col>
      </Row>
      <CustomDiv
        contentEditable={true}
        suppressContentEditableWarning={true}
        onPaste={onPaste}
        onChange={(e) => e.preventDefault()}
        onFocus={() => setToInput(splitText)}
        onBlur={() => handleTextChange(toInput)}
        ref={innerRef}
        onInput={divInput}
        className="custom-div"
      ></CustomDiv>
      <Space size={0} style={{ margin: "35px 0 50px 0" }}>
        <StyledText fS={30}>
          <InputStyle
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            placeholder="Add Answer"
            w="195px"
            m="0 10px 0 0"
          />
          <PlusCircleFilled
            onClick={() => {
              if (answerInput.length <= 0) return;
              handleTextChange(splitText, true);
            }}
          />
        </StyledText>
        <StyledText fS={18}>ANSWER</StyledText>
      </Space>
    </div>
  );
};

export default BuilderQuizFillBlanks;
