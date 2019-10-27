import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";

declare var require: any;
let Boost = require("highcharts/modules/boost");
let noData = require("highcharts/modules/no-data-to-display");
let More = require("highcharts/highcharts-more");

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public options: any = {
    chart: {
      type: "bar"
    },
    title: {
      text: "Sample Chart"
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return " Sales: " + this.y.toFixed(2);
      }
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    series: [
      {
        name: "Sales",
        data: [50, 100, 150, 200, 250, 50, 100, 120, 200, 300, 210, 100]
      }
    ]
  };
  constructor() {}

  ngOnInit() {
    Highcharts.chart("container", this.options);
  }

  changeChart(graphType: String) {
    this.options.chart.type = graphType.toLowerCase();
    Highcharts.chart("container", this.options);
  }
}
