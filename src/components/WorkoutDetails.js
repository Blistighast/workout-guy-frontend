import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const resp = await fetch(`api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const data = await resp.json()

    if (resp.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (Lbs):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails