export function formatCamelCase(input: string | undefined): string {
  if (!input) {
    return '';
  }

  input = input.replaceAll(/(?<=[a-z])(?=[A-Z0-9])/g, ' ');

  return input.charAt(0).toUpperCase() + input.slice(1);
}
