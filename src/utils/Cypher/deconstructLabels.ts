export const deconstructLabels = (labelsWord: string): string[] => {
  const labelRegexp = /(?<=\:)[\w\d]+/gi;
  const labels: RegExpMatchArray | null = labelsWord.match(labelRegexp);
  if (!labels)
    throw new Error(
      `当前语句没有label,你可能传了错误格式的labels,这是你传入的label\n${labelsWord}`,
    );
  return labels;
};
