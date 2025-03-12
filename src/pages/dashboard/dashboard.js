import React, { useState, useEffect } from "react"
import "./dashboard.scss"
import { formatMessage, loadMessages, locale } from 'devextreme/localization';
import service from '../../db/data.js';
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tooltip,
  CommonSeriesSettings,
  Export,
} from "devextreme-react/chart"
import { Funnel } from "devextreme-react/funnel"
import { PieChart, Series as PieSeries, Label } from "devextreme-react/pie-chart"
import { DataGrid, Column, Sorting } from "devextreme-react/data-grid"
import { Button } from "devextreme-react/button"

// Sample data
const revenueData = [
  { month: "January 2020", value: 102000 },
  { month: "February 2020", value: 95000 },
  { month: "March 2020", value: 65000 },
  { month: "April 2020", value: 30000 },
  { month: "May 2020", value: 25000 },
  { month: "June 2020", value: 28000 },
  { month: "July 2020", value: 30000 },
  { month: "August 2020", value: 42000 },
  { month: "September 2020", value: 30000 },
  { month: "October 2020", value: 35000 },
  { month: "November 2020", value: 42000 },
  { month: "December 2020", value: 28000 },
  { month: "January 2021", value: 40000 },
  { month: "February 2021", value: 35000 },
  { month: "March 2021", value: 30000 },
  { month: "April 2021", value: 32000 },
  { month: "May 2021", value: 30000 },
  { month: "June 2021", value: 35000 },
  { month: "July 2021", value: 32000 },
  { month: "August 2021", value: 30000 },
  { month: "September 2021", value: 35000 },
  { month: "October 2021", value: 38000 },
]

const funnelData = [
  { stage: "Sales", value: 3000000 },
  { stage: "Quotes", value: 2500000 },
  { stage: "Opportunities", value: 1600000 },
  { stage: "Leads", value: 612200 },
]

const revenueAnalysisData = [
  { state: "California", sales: 429075, percentage: 44 },
  { state: "Nevada", sales: 163225, percentage: 17 },
  { state: "Wyoming", sales: 129200, percentage: 13 },
  { state: "Arizona", sales: 90925, percentage: 9 },
  { state: "Colorado", sales: 87025, percentage: 9 },
  { state: "Utah", sales: 68300, percentage: 7 },
]

const pieChartData = [
  { category: "Televisions", value: 61 },
  { category: "Projectors", value: 22 },
  { category: "Video Players", value: 7 },
  { category: "Automation", value: 6 },
  { category: "Monitors", value: 5 },
]

const timeOptions = ["WEEK", "2 WEEKS", "MONTH", "YEAR", "ALL"]

const DashboardPage = () => {
  const [selectedTimeOption, setSelectedTimeOption] = useState("ALL")

  const customizeTooltip = (arg) => {
    return {
      text: `${arg.valueText}`,
    }
  }

  const customizeFunnelTooltip = (arg) => {
    return {
      text: `${arg.item.stage}: $${(arg.value / 1000000).toFixed(1)}M`,
    }
  }

  const customizePieTooltip = (arg) => {
    return {
      text: `${arg.argumentText}: ${arg.valueText}%`,
    }
  }

  useEffect(() => {
    loadMessages(service.getDictionary());
    const storedLocale = sessionStorage.getItem('locale') || 'en';
    locale(storedLocale);
  }, []);

  return (
    <React.Fragment>
      <h2 className="content-block">{formatMessage('Dashboard')}</h2>

      <div className="content-block">
        <div className="dx-card dashboard-header">
          <div className="time-filter">
            {timeOptions.map((option) => (
              <button
                key={option}
                className={`time-option ${selectedTimeOption === option ? "active" : ""}`}
                onClick={() => setSelectedTimeOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="dx-card responsive-paddings">
          <div className="kpi-cards">
            <div className="kpi-card opportunities">
              <div className="kpi-icon">📈</div>
              <div className="kpi-content">
                <div className="kpi-label">Opportunities</div>
                <div className="kpi-value">$8,048,714</div>
                <div className="kpi-change positive">+20.3%</div>
              </div>
            </div>
            <div className="kpi-card revenue">
              <div className="kpi-icon">📊</div>
              <div className="kpi-content">
                <div className="kpi-label">Revenue Total</div>
                <div className="kpi-value">$967,750</div>
                <div className="kpi-change negative">-14.7%</div>
              </div>
            </div>
            <div className="kpi-card conversion">
              <div className="kpi-icon">📋</div>
              <div className="kpi-content">
                <div className="kpi-label">Conversion</div>
                <div className="kpi-value">16%</div>
                <div className="kpi-change negative">-2.3%</div>
              </div>
            </div>
            <div className="kpi-card leads">
              <div className="kpi-icon">🔍</div>
              <div className="kpi-content">
                <div className="kpi-label">Leads</div>
                <div className="kpi-value">51</div>
                <div className="kpi-change positive">+8.5%</div>
              </div>
            </div>
          </div>

          <div className="charts-row chart-width">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Revenue</h3>
                <Button icon="more" stylingMode="text" />
              </div>
              <Chart dataSource={revenueData} palette="Soft Blue" id="revenue-chart">
                <CommonSeriesSettings argumentField="month" type="spline" area={true} />
                <Series valueField="value" name="Revenue" color="#5DADE2" />
                <ArgumentAxis
                  valueMarginsEnabled={false}
                  discreteAxisDivisionMode="crossLabels"
                  label={{
                    visible: true,
                    customizeText: (arg) => {
                      return arg.value.split(" ")[0]
                    },
                  }}
                />
                <ValueAxis
                  label={{
                    customizeText: (arg) => {
                      return `$${arg.value / 1000}k`
                    },
                  }}
                />
                <Legend visible={false} />
                <Export enabled={true} />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
              </Chart>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <h3>Conversion Funnel (All Products)</h3>
                <Button icon="more" stylingMode="text" />
              </div>
              <Funnel
                id="funnel"
                dataSource={funnelData}
                argumentField="stage"
                valueField="value"
                palette={["#5DADE2", "#F1948A", "#82E0AA", "#F7DC6F"]}
                sortData={false}
                inverted={true}
                algorithm="dynamicHeight"
                title=""
              >
                <Legend visible={true} />
                <Export enabled={true} />
                <Tooltip enabled={true} customizeTooltip={customizeFunnelTooltip} />
              </Funnel>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Revenue Analysis</h3>
                <Button icon="more" stylingMode="text" />
              </div>
              <DataGrid
                dataSource={revenueAnalysisData}
                showBorders={true}
                showColumnLines={false}
                showRowLines={true}
                rowAlternationEnabled={false}
                columnAutoWidth={true}
              >
                <Sorting mode="single" />
                <Column dataField="state" caption="State" />
                <Column
                  dataField="sales"
                  caption="Sales"
                  dataType="number"
                  format="currency"
                  alignment="right"
                  sortOrder="desc"
                />
                <Column
                  dataField="percentage"
                  caption="% Sold"
                  dataType="number"
                  format="percent"
                  alignment="right"
                  customizeText={(cellInfo) => {
                    return `${cellInfo.value}%`
                  }}
                />
                <Column
                  caption="Percentage"
                  cellRender={(data) => {
                    return (
                      <div className="percentage-bar-container">
                        <div
                          className="percentage-bar"
                          style={{
                            width: `${data.data.percentage * 2}%`,
                            backgroundColor: "#0099FF",
                          }}
                        ></div>
                      </div>
                    )
                  }}
                />
              </DataGrid>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <h3>Revenue Snapshot (All Products)</h3>
                <Button icon="more" stylingMode="text" />
              </div>
              <PieChart
                id="pie"
                palette={["#F7DC6F", "#82E0AA", "#5DADE2", "#F1948A", "#D7BDE2"]}
                dataSource={pieChartData}
                type="doughnut"
              >
                <PieSeries argumentField="category" valueField="value">
                  <Label
                    visible={true}
                    position="inside"
                    customizeText={(arg) => {
                      return `${arg.valueText}%`
                    }}
                  />
                </PieSeries>
                <Legend visible={true} horizontalAlignment="right" verticalAlignment="bottom" margin={10} />
                <Export enabled={true} />
                <Tooltip enabled={true} customizeTooltip={customizePieTooltip} />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DashboardPage

