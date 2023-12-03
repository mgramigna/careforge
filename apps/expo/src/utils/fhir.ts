export function getIdPartFromReference(reference: string): string {
  const [_resourceType, idPart] = reference.split('/');

  return idPart!;
}
