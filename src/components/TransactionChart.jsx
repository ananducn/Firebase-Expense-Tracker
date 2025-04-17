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
  // Calculate percentages
  const expensePercentage = income > 0 ? (expense / income) * 100 : 0;
  const incomePercentage = 100 - expensePercentage;

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
          <Tooltip />
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
