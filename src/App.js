import { useState } from "react";
import "./App.css";

function App() {
  const buttons = [
    ["+", "-", "*", "/"],
    [7, 8, 9, "←"],
    [4, 5, 6, "C"],
    [1, 2, 3, "="],
    [0],
  ];
  const types = {
    'number': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'operator': ["+", "-", "/", "*"],
  };

  const [formula, setFormula] = useState("") // 계산식
  const [result, setResult] = useState(0) // 계산 결과
  const [resultClickYN, setResultClickYN] = useState(0) // 계산 결과 유무

  const calculationHandler = (type, value) => {
    switch (type) {
      case "number":
        setFormula((prev) => prev + value);
        break;
      case "operator":
        if (types.operator.includes(formula[formula.length - 1])) {
          setFormula((prev) => prev.slice(0, formula.length - 1) + value);
        } else {
          setFormula((prev) => prev + value);
        }
        break;
      case "AC":
        setFormula((prev) => prev.substring(0, prev.length - 1));
        break;
      default:
        alert("calculationHandler error");
    }
  }

  const calculateHandler = () => {
    // 계산식이 0 / 0인 경우 숫자 아님 출력
    // 연산자 다음에 숫자를 입력하지 않고 =을 입력하는 경우 alert 출력
    // 10자리를 넘어가는 결과값은 infinity로 표시
    // 연산 결과는 소수점 이하를 버림하여 정수로 표현

    console.log(result)
  }

  const resetHandler = () => {
    setFormula("")
    setResult(0)
    setResultClickYN(false)
  }

  return (
    <div className="calculation">
      <div className="resultInput">{resultClickYN ? result : formula}</div>
      <div className="buttonWrap">
        {buttons.map((arr) => {
          return <div className="row">{arr.map((item) => {
            return <div className="button" onClick={() => {
              if (item === "C") {
                return resetHandler()
              } else if (item === "=") {
                return calculateHandler()
              }

              let type = '';

              if (types.number.includes(item)) {
                type = "number";
              } else if (types.operator.includes(item)) {
                type = "operator";
              } else if (item === "←") {
                type = "AC";
              }

              calculationHandler(type, item)
            }} style={item === "=" ? {
              height: "143px",
              lineHeight: "143px"
            } : item === 0 ? { width: "260px", position: "absolute", bottom: "50px" } : undefined}>{item}</div>
          })}</div>
        })}
      </div>
    </div >
  );
}

export default App;
