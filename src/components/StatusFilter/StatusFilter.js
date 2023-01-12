import { useSelector, useDispatch } from 'react-redux';
import { statusFilters } from 'Redux1/constants';
import { setStatusFilter } from 'Redux1/filterSlice';
import { getStatusFilter } from 'Redux1/selectors';
import { Button } from 'components/Button/Button';
import css from './StatusFilter.module.css';

export const StatusFilter = () => {
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();

  const handleFilterChange = filter => {
    return dispatch(setStatusFilter(filter));
  };

  return (
    <div className={css.wrapper}>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}
      >
        Completed
      </Button>
    </div>
  );
};
