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

  const [operator, setOperator] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(0);
  const [hasCalculatedResult, setHasCalculatedResult] = useState(false)

  function formatWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const calculationHandler = (type, value) => {
    switch (type) {
      case "number":
        const convertStringToNumber = (item) => {
          return Number(`${item}${value}`);
        };

        if (hasCalculatedResult && !operator) {
          setOperator("+");
          setHasCalculatedResult(false);
        }

        if (!hasCalculatedResult && !operator) {
          setResult((prev) => convertStringToNumber(prev));
        } else {
          setNumber((prev) => convertStringToNumber(prev));
        }
        break;
      case "operator":
        if (result) {
          calculateHandler();
        }

        setNumber("");
        setOperator(value);
        break;
      case "AC":
        let text = '';

        if (!operator) {
          text = String(result);

          setResult(Number(text.substring(0, text.length - 1)));
        } else {
          text = String(number);

          setNumber(Number(text.substring(0, text.length - 1)));
        }
        break;
      default:
        alert("calculationHandler error");
    }
  }

  const calculateHandler = () => {
    if (result && operator && !number) {
      alert("연산자 뒤에 숫자가 없어 계산이 어렵습니다.");
      return;
    }

    const calculationResult = Math.ceil(eval(`${result}${operator}${number}`));

    setResult(String(calculationResult).length > 10 ? "infinity" : calculationResult)
    setNumber("");
    setOperator("");
    setHasCalculatedResult(true)
  }

  const resetHandler = () => {
    setOperator("");
    setNumber("");
    setResult(0)
  }

  return (
    <div className="calculation">
      <div className="resultInput">{formatWithCommas(result)}{operator}{formatWithCommas(number)}</div>
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

              if (types.number.includes(item) || item === ".") {
                type = "number";
              } else if (types.operator.includes(item)) {
                type = "operator";
              } else if (item === "←") {
                type = "AC";
              }

              calculationHandler(type, item)
            }} style={
              item === "=" ? {
                height: "143px",
                lineHeight: "143px"
              } : item === 0 ? { width: "260px", position: "absolute", bottom: "50px" }
                : undefined}>{item}</div>
          })}</div>
        })}
      </div>
    </div >
  );
}

export default App;
