// server/functions/calculate_scale_factors.js

export function calculate_scale_factors(V, DH, F) {
  const V_SF = -0.5304 + V / 0.3361 - V ** 2 / 0.6915;
  const DH_SF = 1.0286 - DH / 72.22 + DH ** 2 / 9782;
  const F_SF = 0.7251 - Math.log(F) / 13.19 - Math.log(F) ** 2 / 197.3;

  return { V_SF, DH_SF, F_SF };
}
