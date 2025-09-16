import Workouts from "./Workouts";

export default function Home() {
  return (
    <>
      <h1 className="section-title">Dashboard</h1>
      <div className="flex flex-col items-center w-full">
        <Workouts />
      </div>
    </>
  );
}