import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green and red

const TransactionChart = ({ income, expense }) => {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="h-64 bg-white rounded-xl shadow-xl overflow-hidden p-10">
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
            label={({ percent }) => ` (${(percent * 100).toFixed(0)}%)`}
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
