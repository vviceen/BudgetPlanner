import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import budgetApi from "../../api/bpapi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Summary = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "Food",
    "Transport",
    "Entertainment",
    "Health",
    "Education",
    "Clothing",
    "Bills",
    "Insurance",
    "Travel",
    "Other",
  ];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get("user_id");

  const [data, setData] = useState([]);
  const [totalExp, setTotalExp] = useState([]);
  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const response = await budgetApi.post("/user/expenses", {
          user_id: userId,
        });
        console.log(response);
        setTotalExp([response.data.total_expenses]);
        setData(response.data.categorias_totales)
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    if (userId) {
      getAllExpenses();
    }
  }, [userId]);

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
      yAxes: [
        {
          type: "linear",
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <h1 className="text-5xl font-bold">Summary</h1>
      <p className="py-6">
        This section provides an overview of your finances at a
        quick glance. It includes information such as current balance, total income and expenses, expense categories
        summary of expense categories and financial goals.
      </p>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 32 32"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path d="M 4 5 L 4 6 L 4 19 L 28 19 L 28 5 L 4 5 z M 7.9121094 7 L 24.087891 7 A 1.5 1.5 0 0 0 24 7.5 A 1.5 1.5 0 0 0 25.5 9 A 1.5 1.5 0 0 0 26 8.9121094 L 26 15.087891 A 1.5 1.5 0 0 0 25.5 15 A 1.5 1.5 0 0 0 24 16.5 A 1.5 1.5 0 0 0 24.087891 17 L 7.9121094 17 A 1.5 1.5 0 0 0 8 16.5 A 1.5 1.5 0 0 0 6.5 15 A 1.5 1.5 0 0 0 6 15.087891 L 6 8.9121094 A 1.5 1.5 0 0 0 6.5 9 A 1.5 1.5 0 0 0 8 7.5 A 1.5 1.5 0 0 0 7.9121094 7 z M 16 9 C 14.35499 9 13 10.35499 13 12 C 13 13.64501 14.35499 15 16 15 C 17.64501 15 19 13.64501 19 12 C 19 10.35499 17.64501 9 16 9 z M 10 11 A 1 1 0 0 0 9 12 A 1 1 0 0 0 10 13 A 1 1 0 0 0 11 12 A 1 1 0 0 0 10 11 z M 16 11 C 16.564129 11 17 11.435871 17 12 C 17 12.564129 16.564129 13 16 13 C 15.435871 13 15 12.564129 15 12 C 15 11.435871 15.435871 11 16 11 z M 22 11 A 1 1 0 0 0 21 12 A 1 1 0 0 0 22 13 A 1 1 0 0 0 23 12 A 1 1 0 0 0 22 11 z M 4 21 L 4 23 L 28 23 L 28 21 L 4 21 z M 4 25 L 4 27 L 28 27 L 28 25 L 4 25 z"></path>
            </svg>
          </div>
          <div className="stat-title">Income</div>
          <div className="stat-value">In dev</div>
          <div className="stat-desc">dev</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 32 32"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path d="M 2 8 L 2 25 L 16 25 L 16 24 L 16 19.806641 L 14.064453 14.96875 L 16.386719 8 L 2 8 z M 18.279297 8 L 15.935547 15.03125 L 18 20.193359 L 18 21 L 18 25 L 19 25 L 30 25 L 30 8 L 18.279297 8 z M 6 10 L 13.611328 10 L 12.826172 12.359375 C 11.752996 13.044967 11 14.640142 11 16.5 C 11 18.985 12.343 21 14 21 L 14 23 L 6 23 C 6 21.895 5.105 21 4 21 L 4 12 C 5.105 12 6 11.105 6 10 z M 19.720703 10 L 26 10 C 26 11.105 26.895 12 28 12 L 28 21 C 26.895 21 26 21.895 26 23 L 20 23 L 20 19.832031 C 20.609655 19.008317 21 17.827508 21 16.5 C 21 14.525127 20.14673 12.865484 18.966797 12.259766 L 19.720703 10 z M 7.5 15 A 1.5 1.5 0 0 0 7.5 18 A 1.5 1.5 0 0 0 7.5 15 z M 24.5 15 A 1.5 1.5 0 0 0 24.5 18 A 1.5 1.5 0 0 0 24.5 15 z"></path>
            </svg>
          </div>
          <div className="stat-title">Expended</div>
          <div className="stat-value">{totalExp}</div>
          <div className="stat-desc">--</div>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Expend per category</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default Summary;
