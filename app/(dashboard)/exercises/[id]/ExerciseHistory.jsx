"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useUser } from "../../UserProvider"
import { createClient } from "@supabase/supabase-js"

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function ExerciseHistory({ exercise_data }) {
  const [showHistory, setShowHistory] = useState(false)

  const { userEmail } = useUser()

  const [exerciseHistory, setExerciseHistory] = useState([])

  const [chartData, setChartData] = useState({})

  const [activeDataset, setActiveDataset] = useState("weight")

  const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

  useEffect(() => {
    async function getExerciseHistory(exercise_id, user_email) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      )

      const { data, error } = await supabase
        .from("Exercises")
        .select("*")
        .eq("user", user_email)
        .eq("exercise_id", exercise_id)

      if (error) {
        console.error("Error fetching exercise history:", error)
        return []
      }

      return data
    }

    if (exercise_data.exerciseId && userEmail) {
      getExerciseHistory(exercise_data.exerciseId, userEmail).then((data) => {
      setExerciseHistory(data);

      if (data.length > 0) {
        const dataToSet = {
          labels: data.map(record =>
            new Date(record.created_at).toISOString().slice(0, 10)
          ),
          datasets: [
            {
              label: "Max Weight (kg)",
              data: data.map(record => record.max_weight),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.3,
              fill: true
            }
          ]
        };

        const labels = data.map(record =>
          new Date(record.created_at).toISOString().slice(0, 10)
        );

        const weightDataset = {
          label: "Max Weight (kg)",
          data: data.map(record => record.max_weight),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.3,
          fill: true
        };

        const volumeDataset = {
          label: "Total Volume",
          data: data.map(record => record.total_load),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.3,
          fill: true
        };

        setChartData({
          labels,
          datasets: [activeDataset === "weight" ? weightDataset : volumeDataset]
        });
      }
    });

    }
  }, [exercise_data.exerciseId, userEmail]) // 👈 re-run when id or email changes

  useEffect(() => {
    if (exerciseHistory.length > 0) {
      const labels = exerciseHistory.map(record =>
        new Date(record.created_at).toISOString().slice(0, 10)
      );

      const weightDataset = {
        label: "Max Weight (kg)",
        data: exerciseHistory.map(record => record.max_weight),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true
      };

      const volumeDataset = {
        label: "Total Volume",
        data: exerciseHistory.map(record => record.total_load),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
        fill: true
      };

      setChartData({
        labels,
        datasets: [activeDataset === "weight" ? weightDataset : volumeDataset]
      });
    }
  }, [activeDataset, exerciseHistory]);

  
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-6">
        <button type="button" className={`cursor-pointer ${(!showHistory) ? "bg-amber-300" : "bg-gray-100 text-gray-400"} p-4`} onClick={() => setShowHistory(false)}>Details</button>
        <button type="button" className={`cursor-pointer ${(showHistory) ? "bg-amber-300" : "bg-gray-100 text-gray-400"} p-4`} onClick={() => setShowHistory(true)}>History</button>
      </div>

      {/* Shows exercise details if on "Details" tab */}
      {!showHistory && (
        <div className="exercise-instructions-card">
          <Image src={`/exercise_img/${exercise_data.gifUrl}`} alt={exercise_data.exerciseId} width={256} height={256} className="mx-6"/>
          <div>
            <h3 className="font-semibold text-3xl mb-2">Instructions</h3>

            {exercise_data.instructions.map((instruction_step, index) => (
              <p key={index}>
                  {instruction_step}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Shows exercise history if on "History" tab */}
      {((showHistory) && (exerciseHistory.length > 0)) && (
        <div className="w-full">

          {/* Line graph */}

          <div className="my-4 p-4 flex flex-col items-center">
            <div className="max-h-[30vh]">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="flex gap-2 mb-4 mt-2">
              <button
                className={`p-2 rounded ${activeDataset === "weight" ? "bg-amber-300" : "bg-gray-200"}`}
                onClick={() => setActiveDataset("weight")}
              >
                Max Weight
              </button>
              <button
                className={`p-2 rounded ${activeDataset === "volume" ? "bg-amber-300" : "bg-gray-200"}`}
                onClick={() => setActiveDataset("volume")}
              >
                Volume
              </button>
            </div>
          </div>


          {/* Table with exercise history */}
          <div className="bg-blue-400 rounded-2xl mb-12">
            <div className="exercise-history-grid bg-gray-200 border-b py-6 text-xl font-bold border-white">
              <div>Date</div>
              
              <div>Sets</div>
              
              <div>Max weight (kg)</div>
              
              <div>Volume</div>
            </div>

            <div className="flex flex-col">
              {
                exerciseHistory.map((exercise_record, index) => (
                  <div key={exercise_record.id} className={`exercise-history-grid py-3 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}>
                    {/* Date of workout */}
                    <div>
                      <span>{new Date(exercise_record.created_at).getFullYear()}</span>
                      <span>/</span>
                      <span>{new Date(exercise_record.created_at).getMonth()}</span>
                      <span>/</span>  
                      <span>{new Date(exercise_record.created_at).getDay()}</span>  
                    </div>
                    
                    {/* Workout sets */}
                    <div className="flex flex-col items-center">
                      {exercise_record.volume.map((set_data, index) => (
                        <div key={index} className="flex">
                          <div>{set_data[0]}</div>
                          <div>x</div>
                          <div>{set_data[0]} kg</div>
                        </div>
                      ))}
                    </div>

                    {/* Workout maximum weight used */}
                    <div>{exercise_record.max_weight}</div>

                    {/* Workout volume */}
                    <div>{exercise_record.total_load}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* Shows message there is no history  if on "History" tab */}
      {((showHistory) && (exerciseHistory.length == 0)) && (
        <div>You have no history for this exercise! Add it to your workout to set new records</div>
      )}

    </div>
  )
}