import Chart from "chart.js/auto";
import getData from "../utils/getData";

class DateChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = [{}];
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <canvas id="chart" width="400px" height="400px"></canvas>
    `;
    return template;
  }

  async render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const ctx = this.shadowRoot.getElementById("chart");
    const data = await getData();
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Weather Data",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(0, 0, 0)",
            data: data.data,
          },
        ],
      },
      options: {
        responsive: false,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "dew",
        },
      },
    });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      this.data = newValue;
    }
  }
}

customElements.define("date-chart", DateChart);
