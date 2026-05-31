export const formatZodErrors = (issues) => {
  const errors = {};

  issues.forEach((issue) => {
    const field = issue.path[0];
    errors[field] = issue.message;
  });

  return errors;
};
