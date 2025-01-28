import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/statistics");
      return res.data;
    },
  });

  const data = [
    { name: "Products", value: stats?.totalProducts || 0 },
    { name: "Users", value: stats?.totalUsers || 0 },
    { name: "Reviews", value: stats?.totalReviews || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <Helmet>
        <title>TechNest | Statistics</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Statistics;