import "./styles.css";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToTypeset: false,
      mathjaxConfig: {
        tex: { packages: { "[+]": ["input"] } },
        startup: {
          ready() {
            const Configuration =
              window.MathJax._.input.tex.Configuration.Configuration;
            const CommandMap = window.MathJax._.input.tex.SymbolMap.CommandMap;
            const TEXCLASS = window.MathJax._.core.MmlTree.MmlNode.TEXCLASS;

            new CommandMap(
              "input",
              { input: "Input" },
              {
                Input(parser, name) {
                  const xml = parser.create("node", "XML");
                  const id = parser.GetBrackets(name, "");
                  const w = parser.GetBrackets(name, "5em");
                  const value = parser.GetArgument(name);
                  xml.setXML(
                    window.MathJax.startup.adaptor.node("input", {
                      id: id,
                      value: value,
                      style: { width: w },
                      xmlns: "http://www.w3.org/1999/xhtml"
                    }),
                    window.MathJax.startup.adaptor
                  );
                  xml.getSerializedXML = function () {
                    return this.adaptor.outerHTML(this.xml) + "</input>";
                  };
                  parser.Push(
                    parser.create(
                      "node",
                      "TeXAtom",
                      [
                        parser.create("node", "semantics", [
                          parser.create("node", "annotation-xml", [xml], {
                            encoding: "application/xhtml+xml"
                          })
                        ])
                      ],
                      { texClass: TEXCLASS.ORD }
                    )
                  );
                }
              }
            );
            Configuration.create("input", { handler: { macro: ["input"] } });

            MathJax.startup.defaultReady();
          }
        }
      },
      obj: {
        Qid: "12345",
        Qtext:
          "A farmer sells his product at a loss of 25%. If his S.P. was Rs 45000, what was his actual loss? What was his cost price?",
        n_Steps: "5",
        Steps: [
          {
            id: "s1",
            n_params: "2",
            step_txt:
              "$$ \\text{ Let the C.P be } x $$$$ \\text{We have, S.P. = Rs } \\input[s1v1][10px]{}, \\text{ Loss } = \\input[s1v2]{}\\% $$"
          },
          {
            id: "s2",
            n_params: "2",
            step_txt:
              "$$ \\text { Loss } = \\frac{\\input[s2v1]{}}{100}\\times x=\\frac{x}{\\input[s2v2]{}{}}$$"
          },
          {
            id: "s3",
            n_params: "1",
            step_txt:
              "$$ \\text{ S.P. = C.P. - Loss } 45000 = x - \\frac{\\input[s3v1]{}}{4} $$$$ 45000 =\\frac{3x}{4} $$"
          },
          {
            id: "s4",
            n_params: 1,
            step_txt: "$$ x = Rs \\input[s4v1]{} $$"
          },
          {
            id: "s5",
            n_params: 2,
            step_txt:
              "$$ \text { Loss } = 60000 - \\input[s5v1]{} = Rs \\input[s5v2]{} $$"
          }
        ]
      },
      c: 0
    };
  }

  componentDidMount() {
    window.MathJax = this.state.mathjaxConfig;
    let script = document.createElement("script");
    script.defer = true;
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
    document.head.appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.readyToTypeset) window.MathJax.typesetPromise();
  }
  clickFunc = () => {
    let k = this.state.c + 1;
    this.setState({ c: k });
  };

  onChangeFunc = () => {};

  render() {
    return (
      <div className="App">
        <p>{this.state.obj.Qtext}</p>
        {this.state.obj.Steps.map((step, i) => {
          console.log(step.step_txt);
          if (i <= this.state.c) {
            return (
              <div id={step.id}>
                <p>{step.step_txt}</p>
                {i == this.state.c ? (
                  <button onClick={this.clickFunc}>next step</button>
                ) : (
                  <div></div>
                )}
              </div>
            );
          } else {
            return (
              <div id={step.id} style={{ display: "none" }}>
                <p>{step.step_txt}</p>
                <button onClick={this.clickFunc}>next step</button>
              </div>
            );
          }
        })}
        <div id="text"></div>
      </div>
    );
  }
}

export default App;
