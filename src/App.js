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

  const [operator, setOperator] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(0);
  const [hasCalculatedResult, setHasCalculatedResult] = useState(false);

  const formatNumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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
      case "Clear":
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

  const calculateExpression = (expression) => {
    try {
      const result = new Function(`return ${expression}`)();

      if (isNaN(result)) {
        throw new Error("숫자 아님");
      }

      return result;
    } catch (error) {
      console.log("calculateExpression error", error);
      return "숫자 아님";
    }
  }

  const calculateHandler = () => {
    if (result && operator && !number) {
      alert("연산자 뒤에 숫자가 없어 계산이 어렵습니다.");
      return;
    }

    const calculationResult = calculateExpression(`${result}${operator}${number}`);
    const roundedResult = Math.ceil(calculationResult);

    if (String(roundedResult).length > 10) {
      setResult("Infinity");
    } else if (calculationResult === "숫자 아님") {
      setResult("숫자 아님");
    } else {
      setResult(roundedResult);
    }

    setNumber("");
    setOperator("");
    setHasCalculatedResult(true);
  }

  const resetHandler = () => {
    setOperator("");
    setNumber("");
    setResult(0);
  }

  return (
    <div className="calculation">
      <div className="resultInput">
        {formatNumberWithCommas(result)}{operator}{formatNumberWithCommas(number)}
      </div>
      <div className="buttonWrap">
        {buttons.map((arr, rowIndex) => (
          <div className="row" key={rowIndex}>
            {arr.map((item, columnIndex) => (
              <div
                className="button"
                key={columnIndex}
                onClick={() => {
                  if (item === "C") {
                    return resetHandler();
                  } else if (item === "=") {
                    return calculateHandler();
                  }

                  let type = "";

                  if (typeof item === "number" || item === ".") {
                    type = "number";
                  } else if (["+", "-", "/", "*"].includes(item)) {
                    type = "operator";
                  } else if (item === "←") {
                    type = "Clear";
                  }

                  calculationHandler(type, item);
                }}
                style={
                  item === "="
                    ? {
                      height: "143px",
                      lineHeight: "143px",
                    }
                    : item === 0
                      ? { width: "260px", position: "absolute", bottom: "50px" }
                      : undefined
                }
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
