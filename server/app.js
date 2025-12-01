import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import OpenAI from "openai";
const MODEL = "gpt-4.1-mini";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const system_message = `

Your name is Ergo. Make sure that you introduce yourself whenever appropriate by that name.
You are a helpful ergonomics assistant who helps to assess tasks that people perform at their jobs. 

You will take in input that describes the task that the user is performing, 
including the type of action being performed (push or pull), 
the force needed to get the object to move (in kg-force, if the user enters kg or just a number without a unit, then assume they are using kg-force), 
the distance that the object is being moved (in meters, if the user enters a number without a unit, then assume they are using meters), 
the height of the worker's hands above the ground during the action (in meters, if the user enters a number without a unit, then assume they are using meters), 
and the frequency at which the worker performs the action (in number of times per minute, if the user enters a number without specifying, then assume they are using meters).

If the user does not provide all of the listed information, you should prompt them to provide any 
specific input that you are missing.

Once you have all of the necessary information pertaining to the user's task, use the calcuate_mcp tool to
determine which task variable is the most impactful on worker fatigue.

Always be accurate. If you don't know the answer, say so.

`;

function round(number, decimal) {
  const factor = Math.pow(10, decimal);
  return Math.round(number * factor) / factor;
}

function find_largest_mcp_value(height, distance, frequency, force) {
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

const RL = 36.9;
const CV = 0.214;
const Z_25TH_PERCENTILE = -0.63;

function calculate_mcp(height, distance, frequency, force, action = "push") {
  console.log(
    `***\nCalculation tool called to find the mcp of the given task.\n---`
  );
  console.log(`Input height: ${height} meters.`);
  console.log(`Distance: ${distance} meters.`);
  console.log(`Frequency: ${frequency} per minute.`);
  console.log(`Force to initiate: ${force} kg.\n---`);

  const h = -0.5304 + height / 0.3361 - height ** 2 / 0.6915;
  const d = 1.0286 - distance / 72.22 + distance ** 2 / 9782;
  const f =
    0.7251 - Math.log(frequency) / 13.19 - Math.log(frequency) ** 2 / 197.3;

  const max_acceptible_value = RL * h * d * f;

  const acceptible_force =
    max_acceptible_value + Z_25TH_PERCENTILE * max_acceptible_value * CV;

  console.log(
    `The 25th percentile female strength needed for this task is: ${round(
      acceptible_force,
      2
    )} kg.\n---`
  );

  let height_contribution = 1 - h;
  let distance_contribution = 1 - d;
  let frequency_contribution = 1 - f;
  let force_contribution;
  if (force - RL < 0) {
    force_contribution = 0;
  } else {
    force_contribution = (force - RL) / RL;
  }
  //   console.log(`Height contribution: ${height_contribution}.`);
  //   console.log(`Distance contribution: ${distance_contribution}.`);
  //   console.log(`Frequency contribution: ${frequency_contribution}.`);
  //   console.log(`Force contribution: ${force_contribution}.\n---`);

  console.log(`Height contribution: ${round(height_contribution, 2)}.`);
  console.log(`Distance contribution: ${round(distance_contribution, 2)}.`);
  console.log(`Frequency contribution: ${round(frequency_contribution, 2)}.`);
  console.log(`Force contribution: ${round(force_contribution, 2)}.\n---`);

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

  console.log(
    `Metric contribution percentage for height: ${round(height_mcp, 2)}.`
  );
  console.log(`Metric contribution for distance: ${round(distance_mcp, 2)}.`);
  console.log(
    `Metric contribution percentage for frequency: ${round(frequency_mcp, 2)}.`
  );
  console.log(
    `Metric contribution percentage for force: ${round(force_mcp, 2)}.\n---`
  );

  return `The most impactful task input for this job is ${
    biggest_mcp["name"]
  } with a metric contribution of ${round(biggest_mcp["value"], 2)}.`;
}

const result = calculate_mcp(1.5, 4, 3, 10);
console.log(result);
