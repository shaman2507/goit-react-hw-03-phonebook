import PropTypes from 'prop-types';

function Filter({ value, onChangeFilter }) {
  return (
    <div>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChangeFilter} />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;