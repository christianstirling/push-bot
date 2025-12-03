// server/functions/calculate_mcp.js

// Calculator tool function - called by LLM response
// Takes in the task level inputs, returns message content for LLM
export function calculate_mcp(
  height,
  distance,
  frequency,
  force,
  action = "push"
) {
  const RL = 36.9;
  const CV = 0.214;
  const Z_25TH_PERCENTILE = -0.63;

  // console.log(
  //   `***\nCalculation tool called to find the mcp of the given task.\n---`
  // );
  // console.log(`Input height: ${height} meters.`);
  // console.log(`Distance: ${distance} meters.`);
  // console.log(`Frequency: ${frequency} per minute.`);
  // console.log(`Force to initiate: ${force} kg.\n---`);

  const h = -0.5304 + height / 0.3361 - height ** 2 / 0.6915;
  const d = 1.0286 - distance / 72.22 + distance ** 2 / 9782;
  const f =
    0.7251 - Math.log(frequency) / 13.19 - Math.log(frequency) ** 2 / 197.3;

  const max_acceptible_value = RL * h * d * f;

  const acceptible_force =
    max_acceptible_value + Z_25TH_PERCENTILE * max_acceptible_value * CV;

  // console.log(
  //   `The 25th percentile female strength needed for this task is: ${round(
  //     acceptible_force,
  //     2
  //   )} kg.\n---`
  // );

  let height_contribution = 1 - h;
  let distance_contribution = 1 - d;
  let frequency_contribution = 1 - f;
  let force_contribution;
  if (force - RL < 0) {
    force_contribution = 0;
  } else {
    force_contribution = (force - RL) / RL;
  }

  // console.log(`Height contribution: ${round(height_contribution, 2)}.`);
  // console.log(`Distance contribution: ${round(distance_contribution, 2)}.`);
  // console.log(`Frequency contribution: ${round(frequency_contribution, 2)}.`);
  // console.log(`Force contribution: ${round(force_contribution, 2)}.\n---`);

  let sum_of_contributions =
    height_contribution +
    distance_contribution +
    frequency_contribution +
    force_contribution;

  let height_mcp = height_contribution / sum_of_contributions;
  let distance_mcp = distance_contribution / sum_of_contributions;
  let frequency_mcp = frequency_contribution / sum_of_contributions;
  let force_mcp = force_contribution / sum_of_contributions;

  let biggest_mcp = find_largest_mcp_value(
    height_mcp,
    distance_mcp,
    frequency_mcp,
    force_mcp
  );

  // console.log(
  //   `Metric contribution percentage for height: ${round(height_mcp, 2)}.`
  // );
  // console.log(`Metric contribution for distance: ${round(distance_mcp, 2)}.`);
  // console.log(
  //   `Metric contribution percentage for frequency: ${round(frequency_mcp, 2)}.`
  // );
  // console.log(
  //   `Metric contribution percentage for force: ${round(force_mcp, 2)}.\n---`
  // );

  return `The most impactful task input for this job is ${
    biggest_mcp["name"]
  } with a metric contribution of ${round(biggest_mcp["value"], 2)}.`;
}
