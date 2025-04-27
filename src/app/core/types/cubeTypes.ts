export enum CubeTypesEnum {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
}

export type CubeTypes = CubeTypesEnum;

export const cubeTypesArray = Object.values(CubeTypesEnum).filter(
  (value): value is CubeTypesEnum => typeof value === "number"
);
