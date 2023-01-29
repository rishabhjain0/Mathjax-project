import "./styles.css";
import React, { useState, useEffect } from "react";
import Latex from "./Latex";

export default function App() {
  const [obj, setObj] = useState({
    Qid: "12345",
    Qtext:
      "A farmer sells his product at a loss of 25%. If his S.P. was Rs 45000, what was his actual loss? What was his cost price?",
    n_Steps: "5",
    Steps: [
      {
        id: "s1",
        n_params: "2",
        step_txt:
          "$$ \\text{ Let the C.P be } x $$$$ \\text{We have, S.P. = Rs } \\input[s1v1]{}, \\text{ Loss } = \\input[s1v2]{}\\% $$"
      },
      {
        id: "s2",
        n_params: "2",
        step_txt: `Loss $$= \\frac{input[s2v1]{}}{100}\\times x=\\frac{x}{input[s2v2]{}}$$ \\S.P. = C.P. - Loss\\ `
      },
      {
        id: "s3",
        n_params: "1",
        step_txt:
          "$$ 45000 = x - \\frac{input[s3v1]{}}{4} $$ $$ 45000 =\\frac{3x}{4} $$"
      },
      {
        id: "s4",
        n_params: 1,
        step_txt: "$$ x = Rs input[s4v1]{} $$"
      },
      {
        id: "s5",
        n_params: 2,
        step_txt: "Loss $$=60000- input[s5v1] =Rs input[s5v2]{}$$ \\"
      }
    ]
  });
  const [c, setC] = useState(0);
  useEffect(() => {
    let func = async () => {
      // let obj = {
      //   Qid: "12345",
      //   Qtext:
      //     "A farmer sells his product at a loss of 25%. If his S.P. was Rs 45000, what was his actual loss? What was his cost price?",
      //   n_Steps: "5",
      //   Steps: [
      //     {
      //       id: "s1",
      //       n_params: "2",
      //       step_txt:
      //         "$$ \text{ Let the C.P be } x $$$$ \text{We have, S.P. = Rs } input[s1v1]{}, \text{ Loss } = input[s1v2]{}% $$ "
      //     },
      //     {
      //       id: "s2",
      //       n_params: "2",
      //       step_txt:
      //         "Loss $$= \frac{input[s2v1]{}}{100}\times x=\frac{x}{input[s2v2]{}}$$ \\S.P. = C.P. - Loss\\ "
      //     },
      //     {
      //       id: "s3",
      //       n_params: "1",
      //       step_txt:
      //         " $$ 45000 = x - \frac{input[s3v1]{}}{4} $$ $$ 45000 =\frac{3x}{4} $$"
      //     },
      //     {
      //       id: "s4",
      //       n_params: 1,
      //       step_txt: "$$ x = Rs input[s4v1]{} $$"
      //     },
      //     {
      //       id: "s5",
      //       n_params: 2,
      //       step_txt: "Loss $$=60000- input[s5v1] =Rs input[s5v2]{}$$ \\"
      //     }
      //   ]
      // };
      // await setObj(obj);
    };
    func();
  }, []);

  const clickFunc = () => {
    let k = c + 1;
    setC(k);
  };

  return (
    <Latex>
      <div className="App">
        <p>{obj.Qtext}</p>
        {obj.Steps.map((step, i) => {
          console.log(step.step_txt);
          if (i <= c) {
            return (
              <div id={step.id}>
                <p>{step.step_txt}</p>
                {i == c ? (
                  <button onClick={clickFunc}>next step</button>
                ) : (
                  <div></div>
                )}
              </div>
            );
          } else {
            return (
              <div id={step.id} style={{ display: "none" }}>
                <p>{step.step_txt}</p>
                <button onClick={clickFunc}>next step</button>
              </div>
            );
          }
        })}
        <div id="text"></div>
      </div>
    </Latex>
  );
}
