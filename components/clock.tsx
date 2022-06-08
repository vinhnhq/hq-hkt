const format = (t: Date) =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;

const pad = (n: Number) => (n < 10 ? `0${n}` : n);

interface ClockProps {
  lastUpdate: string | number | Date;
  light?: boolean;
}

const Clock = (props: ClockProps) => {
  const divStyle = {
    backgroundColor: props.light ? "#999" : "#000",
    color: "#82FA58",
    display: "inline-block",
    font: "50px menlo, monaco, monospace",
    padding: "15px",
  };

  return <div style={divStyle}>{format(new Date(props.lastUpdate))}</div>;
};

export default Clock;
