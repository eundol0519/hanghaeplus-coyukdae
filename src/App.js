import { useState } from "react";
import "./App.css";

function App() {
  const buttons = [
    ["+", "-", "*", "/"],
    [7, 8, 9, "←"],
    [4, 5, 6, "C"],
    [1, 2, 3, "="],
    [0],
  ]

  const [formula, setFormula] = useState(0) // 계산식
  const [result, setResult] = useState(0) // 계산 결과
  const [resultClickYN, setResultClickYN] = useState(0) // 계산 결과 유무

  const calculationHandler = (e, type) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (type) {
      case "number":
        console.log(name, value);
        break;
      case "operator":
        // 끝 자리가 연산자면 연산자 교체
        // 끝 자리가 숫자라면 연산자 붙이기
        console.log(name, value);
        break;
      case "AC":
        console.log("AC");
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
    setFormula(0)
    setResult(0)
    setResultClickYN(false)
  }

  return (
    <div className="calculation">
      <div className="resultInput">{resultClickYN ? result : formula}</div>
      <div className="buttonWrap">
        {buttons.map((arr) => {
          return <div className="row">{arr.map((item) => {
            return <div className="button" onClick={(e) => {
              if (item === "C") {
                return resetHandler()
              } else if (item === "=") {
                return calculateHandler()
              }

              const types = {
                'number': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                'operator': ["+", "-", "/", "*"],
              }

              let type = '';

              if (types.number.includes(item)) {
                type = "number";
              } else if (types.operator.includes(item)) {
                type = "operator";
              } else if (item === "←") {
                type = "AC";
              }

              calculationHandler(e, type)
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
