
import React from "react";
import { useAppContext } from "../context/AppContext";
import TimeFrameSelector from "../components/TimeFrameSelector";
import CategorySummary from "../components/CategorySummary";
import { ChevronUp } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const Statistics: React.FC = () => {
  const { userProfile, getFilteredExpenses, getCategoryTotal, getTotalExpenses, selectedTimeFrame } = useAppContext();
  const { currency } = userProfile;
  
  const categories = ["groceries", "food", "transportation", "entertainment"];
  const total = getTotalExpenses();

  // Generate data for the chart
  const generateChartData = () => {
    const expenses = getFilteredExpenses();
    const dateMap = new Map();

    expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      const current = dateMap.get(date) || 0;
      dateMap.set(date, current + expense.amount);
    });

    // Convert to array and sort by date
    const result = Array.from(dateMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // If no data, return placeholder data point to avoid empty chart
    return result.length ? result : [{ date: new Date().toLocaleDateString(), amount: 0 }];
  };

  const chartData = generateChartData();

  const categoryData = categories
    .map(category => {
      const categoryTotal = getCategoryTotal(category);
      return {
        category,
        total: categoryTotal,
        percentage: total > 0 ? (categoryTotal / total) * 100 : 0
      };
    })
    .filter(item => item.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="px-4 pb-32 pt-4">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Time Frame</h2>
        <TimeFrameSelector />
      </section>

      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold">Total Expenses</h2>
          <div className="text-gray-500 text-sm mb-2">{selectedTimeFrame.replace("-", " ")}</div>
          
          <div className="text-4xl font-bold mb-4">
            {currency.symbol}{total.toFixed(2)}
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-500">vs. Previous {selectedTimeFrame.replace("-", " ")}</span>
            <div className="ml-auto flex items-center text-blue-500">
              <ChevronUp size={16} />
              <span>12.5%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
          
          {categoryData.length > 0 ? (
            categoryData.map(item => (
              <CategorySummary
                key={item.category}
                category={item.category}
                total={item.total}
                percentage={item.percentage}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No expense data available.</p>
          )}
        </div>
      </section>

      <section>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Expense Trend</h2>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-1 text-sm">
              {selectedTimeFrame.replace("-", " ")}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-purple-500 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-gray-500">
              Showing overall spending trend for {selectedTimeFrame.replace("-", " ")}.
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-bold">{currency.symbol} {total.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Avg</div>
              <div className="font-bold">
                {currency.symbol} {chartData.length > 1 ? (total / (chartData.length || 1)).toFixed(2) : total.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Max</div>
              <div className="font-bold">
                {currency.symbol} {Math.max(...chartData.map(d => Number(d.amount) || 0), 0).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            {chartData.length > 0 && (
              <ChartContainer
                className="h-full"
                config={{ amount: {} }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Date
                                  </span>
                                  <span className="font-bold text-sm">
                                    {payload[0].payload.date}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Amount
                                  </span>
                                  <span className="font-bold text-sm">
                                    {currency.symbol}{Number(payload[0].value).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      activeDot={{ r: 6, fill: "#9b87f5", strokeWidth: 0 }}
                      dot={{ r: 4, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <div className="bg-orange-500 rounded-full px-4 py-1 text-white text-sm">
              Stable
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
