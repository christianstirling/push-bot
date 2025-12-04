// Takes in 4 mcp values, returns the largest in format {name: "name", value: "value"}
export function determine_largest_mcp_value(
  height,
  distance,
  frequency,
  force
) {
  let name;
  let value;

  if (height >= distance && height >= frequency && height >= force) {
    name = "height";
    value = height;
  } else if (distance >= frequency && distance >= force) {
    name = "distance";
    value = distance;
  } else if (frequency >= force) {
    name = "frequency";
    value = frequency;
  } else {
    name = "force";
    value = force;
  }

  return { name: name, value: value };
}
