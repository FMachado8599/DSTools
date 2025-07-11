const GradientControls = ({
  color1,
  color2,
  type,
  direction,
  onColor1Change,
  onColor2Change,
  onTypeChange,
  onDirectionChange,
}) => {
  return (
    <div>
      <div>
        <label>Color 1:</label>
        <input type="color" value={color1} onChange={(e) => onColor1Change(e.target.value)} />
      </div>
      <div>
        <label>Color 2:</label>
        <input type="color" value={color2} onChange={(e) => onColor2Change(e.target.value)} />
      </div>
      <div>
        <label>Tipo:</label>
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>
      {type === "linear" && (
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direction}
            onChange={(e) => onDirectionChange(e.target.value)}
            placeholder="to right, 45deg, etc."
          />
        </div>
      )}
    </div>
  );
};

export default GradientControls;