import { useState } from "react";
import "./App.css";

function App() {
  const buttons = [
    ["+", "-", "*", "/"],
    [7, 8, 9, "←"],
    [4, 5, 6, "C"],
    [1, 2, 3, "="],
    [0, "."],
  ];

  const [extension, setExtension] = useState("");

  const formatNumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const calculationHandler = (type, value) => {
    switch (type) {
      case "number":
        const convertStringToNumber = (item) => {
          return String(`${item}${value}`);
        };

        setExtension((prev) => convertStringToNumber(prev));
        break;
      case "dot":
        setExtension((prev) => prev + ".");
        break;
      case "operator":
        const lastChar = extension.charAt(extension.length - 1);

        if (["+", "-", "/", "*"].includes(lastChar)) {
          setExtension((prev) => prev.slice(0, prev.length - 1) + value);
        } else {
          setExtension((prev) => prev + value);
        }
        break;
      case "Clear":
        setExtension((prev) => prev.slice(0, prev.length - 1));
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
    const lastChar = extension.charAt(extension.length - 1);

    if (["+", "-", "/", "*"].includes(lastChar)) {
      alert("연산자 뒤에 숫자가 없어 계산이 어렵습니다.");
      return;
    }

    const calculationResult = calculateExpression(extension);
    const roundedResult = String(Math.ceil(calculationResult));

    if (String(roundedResult).length > 10) {
      setExtension("Infinity");
    } else if (calculationResult === "숫자 아님") {
      setExtension("숫자 아님");
    } else {
      setExtension(roundedResult);
    }
  }

  const resetHandler = () => {
    setExtension("");
  }

  return (
    <div className="calculation">
      <div className="resultInput">
        {formatNumberWithCommas(extension) || 0}
      </div>
      <div className="buttonWrap">
        {buttons.map((arr, rowIndex) => (
          <div className="row" key={rowIndex}>
            {arr.map((item, columnIndex) => (
              <div
                className="button"
                key={columnIndex}
                onClick={() => {
                  if (extension === "Infinity" || extension === "숫자 아님") {
                    setExtension('');
                  };

                  if (item === "C") {
                    return resetHandler();
                  } else if (item === "=") {
                    return calculateHandler();
                  }

                  let type = "";

                  if (typeof item === "number") {
                    type = "number";
                  } else if (item === ".") {
                    type = 'dot'
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
                      ? { width: "170px", position: "absolute", bottom: "50px" }
                      : item === "."
                        ? { width: "80px", position: "absolute", bottom: "50px", left: "210px" }
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
