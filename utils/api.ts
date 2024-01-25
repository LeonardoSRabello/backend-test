export const checkDataFields = (lines: string[]): string[] | boolean => {
  if (!lines.length) {
    return false;
  }
  const fields = lines[0].trim().split(",");

  const result: string[] = [];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i].trim();
    if (!field) {
      return false;
    }
    result.push(field);
  }
  return result;
};

export const getData = (
  fields: string[],
  lines: string[]
): Record<string, string>[] => {
  return lines.map((line) => {
    const values = line.trim().split(",");
    return fields.reduce(
      (prev, curr, index) => ({
        ...prev,
        [curr]: values.length > index ? values[index].trim() : "",
      }),
      {}
    );
  });
};
