export type Property = {
  name: string;
  units?: null | string;
  value: number | string;
};

export type GroupedProperties = Record<string, Property[]>;
