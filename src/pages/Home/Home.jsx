import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '~/store/slides/counterSlide';

function Home() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default Home;
