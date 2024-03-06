export type Property =
  | {
      name: string;
      units: null | string;
      value: number;
    }
  | {
      name: string;
      value: string;
    };

export type FloatProperty = {
  property: {
    group: {
      name: string;
    } | null;
    name: string;
    units: null | string;
  };
  value: number;
};

export type StringProperty = {
  property: { group: { name: string } | null; name: string };
  value: { value: string };
};

const isFloatProperty = (
  property: FloatProperty | StringProperty,
): property is FloatProperty => typeof property.value === 'number';

export function convertProperties(
  properties: (FloatProperty | StringProperty)[],
) {
  const propertyGroups = new Map<null | string, Property[]>();

  properties.forEach((item) => {
    const groupName = item.property.group?.name ?? null;

    if (!propertyGroups.has(groupName)) {
      propertyGroups.set(groupName, []);
    }

    if (isFloatProperty(item)) {
      propertyGroups.get(groupName)?.push({
        name: item.property.name,
        units: item.property.units,
        value: item.value,
      });
    } else {
      propertyGroups.get(groupName)?.push({
        name: item.property.name,
        value: item.value.value,
      });
    }
  });

  return Object.fromEntries(propertyGroups) as Record<string, Property[]>;
}
