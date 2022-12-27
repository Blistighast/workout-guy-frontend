import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from './../components/WorkoutForm';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      // using a proxy in package.json to get around CORS, needs to be fixed if uploading
      const resp = await fetch('/api/workouts')
      const data = await resp.json()

      if (resp.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: data})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm className=""/>
    </div>
  )
}

export default Home