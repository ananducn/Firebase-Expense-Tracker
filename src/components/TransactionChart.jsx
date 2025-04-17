import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green for income, red for expense

const TransactionChart = ({ income, expense }) => {
  // Calculate percentages based on the total (income + expense)
  const total = income + expense;
  const incomePercentage = total > 0 ? (income / total) * 100 : 0;
  const expensePercentage = total > 0 ? (expense / total) * 100 : 0;

  const data = [
    { name: "Income", value: incomePercentage },
    { name: "Expense", value: expensePercentage },
  ];

  return (
    <div className="h-72 bg-white rounded-xl shadow-xl overflow-hidden p-8">
      <h2 className="text-sm font-semibold text-center mb-2">Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={60}
            dataKey="value"
            nameKey="name"
            label={({ percent, name }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Legend
            wrapperStyle={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            layout="horizontal"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;