import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "../redux/counterSlice/counter.slice";

const Counter = () => {
  const state = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={()=>dispatch(decrement())}>-</button>
      <span>{state.counter}</span>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(reset())}>reset</button>
    </>
  );
};

export default Counter;