import { Link } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";

const GraphPage = () => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const data1 = [1, 3, 4, 1, 3, 2, 4];
  const data2 = [4, 2, 4, 1, 4, 1, 3];
  return (
    <div>
      <h1>Graph Page</h1>
      <Link to="/">Go Home</Link>

      <Pie
        data={{
          labels: ["Happy", "Sad", "Terrible"],
          datasets: [
            {
              data: [25, 30, 45],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
            },
          ],
        }}
      />

      <Line
        data={{
          labels: weekDays,
          datasets: [
            {
              label: "First dataset",
              data: data1,
              fill: false,
              borderColor: "red",
            },
            {
              label: "Second dataset",
              data: data2,
              fill: false,
              borderColor: "orange",
            },
          ],
        }}
      />
    </div>
  );
};

export default GraphPage;
