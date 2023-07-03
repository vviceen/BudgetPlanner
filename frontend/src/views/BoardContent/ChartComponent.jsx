import { Bar } from "react-chartjs-2";

const ChartComponent = () => {
  const labels = ["comida", "otra cosa"];
  const data = [100, 200];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total de gastos por categoría",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
