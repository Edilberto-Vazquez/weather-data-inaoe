import Chart from "chart.js/auto";

class DateChart extends HTMLElement {
  _fields = [];
  _dates = { fromdate: "", todate: "" };
  _handleSubmit = (e, chart) => {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // -----sets and getters-----
  set fields(value) {
    this._fields = value;
  }

  get fields() {
    return this._fields;
  }

  set dates(value) {
    this._dates = value;
  }

  get dates() {
    return this._dates;
  }

  set handleSubmit(value) {
    this._handleSubmit = value;
  }

  get handleSubmit() {
    return this._handleSubmit;
  }

  // -----create an empty chart-----
  createChart() {
    const ctx = this.shadowRoot.getElementById("chart");
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
      },
    });
  }

  // -----add the fields that the user requested-----
  handleInput(e) {
    if (e.target.checked) {
      this.fields = [...this.fields, e.target.id];
    } else {
      const index = this.fields.indexOf(e.target.id);
      this.fields.splice(index, 1);
    }
  }

  handleDate(e) {
    this.dates = { ...this.dates, [e.target.id]: e.target.value };
  }

  // -----assign the events to the specific node-----
  handleEvent(e) {
    if (e.target.name === "field") {
      this.handleInput(e);
    }
    if (e.target.id === "fromdate") {
      this.handleDate(e);
    }
    if (e.target.id === "todate") {
      this.handleDate(e);
    }
    if (e.type === "submit") {
      this.handleSubmit(e, this.chart);
    }
  }

  // -----create the events for each specific node-----
  createAddEventListener() {
    // -----add event to the checboxes-----
    this.inputs = this.shadowRoot
      .getElementById("chart-options")
      .getElementsByTagName("input");
    for (let input of this.inputs) {
      input.addEventListener("change", this);
    }
    // -----add event to the date inputs-----
    this.fromdate = this.shadowRoot.getElementById("fromdate");
    this.fromdate.addEventListener("change", this);
    this.todate = this.shadowRoot.getElementById("todate");
    this.todate.addEventListener("change", this);
    // -----add event submit to the form-----
    this.form = this.shadowRoot.getElementById("chart-options");
    this.form.addEventListener("submit", this);
  }

  // -----create the stiles-----
  getStyles() {
    return `
      <style>
      :host {
        width: 100%;
        min-height: 700px;
        max-height: 800px;
        display: grid;
        grid-template-rows: 50px calc(100% - 50px - 10px);
        gap: 10px;
        border-radius: 10px;
        border: 1px solid #4d92df;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .chart-title {
        text-align: center;
        font-size: 2.4rem;
      }
      .chart {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1.5fr 2fr;
      }
      .chart-view {
        width: 100%;
        height: 100%;
      }
      .chart-options {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 0.5fr 0.5fr;
      }
      .fields {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 100px));
        justify-content: center;
      }
      .field {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 2fr 1fr;
        place-items: center;
        font-size: 1.8rem;
      }
      .field input {
        width: 40%;
        height: 40%;
      }
      .dates {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(153px, 180px));
        justify-content: center;
      }
      .date {
        place-self: center;
      }
      .chart-button {
        width: 80px;
        height: 40px;
        place-self: center;
        border-radius: 10px;
        border: 1px solid #4d92df;
        font-family: 'Montserrat', sans-serif;
      }
      @media (min-width: 1024px) {
        :host {
          max-width: 1010px;
        }
      }
      </style>
    `;
  }

  // -----create the template of the component
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <h3 class="chart-title">Weather Cloud Data</h3>
      <div class="chart">
      <div class="chart-view">
        <canvas id="chart"></canvas>
      </div>
        <form class="chart-options" id="chart-options" name="chart-options">
          <div class="fields">
            <label class="field"><input type="checkbox" id="chill" name="field" />Chill</label>
            <label class="field"><input type="checkbox" id="dew" name="field" />Dew</label>
            <label class="field"><input type="checkbox" id="heat" name="field" />Heat</label>
            <label class="field"><input type="checkbox" id="hum" name="field" />Hum</label>
            <label class="field"><input type="checkbox" id="wspdhi" name="field" />wspdhi</label>
            <label class="field"><input type="checkbox" id="bar" name="field" />bar</label>
            <label class="field"><input type="checkbox" id="rain" name="field" />rain</label>
          </div>
          <div class="dates" id="dates">
            <label class="from-date date"><input type="date" id="fromdate" name="date" value="2019-01-01" min="2019-01-01" max="2019-12-31" /></label>
            <label class="to-date date"><input type="date" id="todate" name="date" value="2019-12-31" min="2019-01-01" max="2019-12-31"/></label>
          </div>
          <button class="chart-button" id="graphbutton" type="submit">Graph</button>
        </form>
      </div>
      ${this.getStyles()}
    `;
    return template;
  }

  // -----call to the template method and all that create nodes or events-----
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.dates = {
      fromdate: this.shadowRoot.getElementById("fromdate").value,
      todate: this.shadowRoot.getElementById("todate").value,
    };
    this.createChart();
    this.createAddEventListener();
  }

  // -----connect the component to the parent node-----
  connectedCallback() {
    this.render();
  }

  // -----sets the attributes to observe-----
  static get observedAttributes() {
    return ["fields", "handlesubmit"];
  }

  // -----detects changes in attribute values and replaces them with the new value-----
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "fields") {
      this.fields = newValue;
    }
    if (name === "handlesubmit") {
      this.handleSubmit = newValue;
    }
  }

  // -----remove all events when the component has been unmounted-----
  disconnectedCallback() {
    for (let input of this.inputs) {
      input.removeEventListener("change", this);
    }
    this.form.removeEventListener("submit", this);
    this.fromdate.removeEventListener("change", this);
    this.todate.removeEventListener("change", this);
  }
}

customElements.define("date-chart", DateChart);
