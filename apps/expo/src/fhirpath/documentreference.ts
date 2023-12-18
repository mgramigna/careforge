import fhirpath from 'fhirpath';

import { type DocumentReference } from '@careforge/canvas';

export function getPDFUrl(documentReference: DocumentReference): string | undefined {
  const [url] = fhirpath.evaluate(
    documentReference,
    "content.where(attachment.contentType='application/pdf').attachment.url",
  ) as string[];

  return url;
}
