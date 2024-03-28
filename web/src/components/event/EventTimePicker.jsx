import { TimePicker } from "antd";

export function EventTimePicker({ onChange, value }) {
  return (
    <TimePicker
      value={value}
      format="HH:mm A"
      changeOnBlur
      minuteStep={15}
      onChange={(time) => {
        if (onChange) {
          onChange(time);
        }
      }}
    />
  );
}
