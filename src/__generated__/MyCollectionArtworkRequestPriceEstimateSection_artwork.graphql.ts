/**
 * @generated SignedSource<<d3676bf00094330134bcd63235337b4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$data = {
  readonly hasPriceEstimateRequest: boolean | null;
  readonly internalID: string;
  readonly isPriceEstimateRequestable: boolean | null;
  readonly " $fragmentType": "MyCollectionArtworkRequestPriceEstimateSection_artwork";
};
export type MyCollectionArtworkRequestPriceEstimateSection_artwork$key = {
  readonly " $data"?: MyCollectionArtworkRequestPriceEstimateSection_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkRequestPriceEstimateSection_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkRequestPriceEstimateSection_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPriceEstimateRequest",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPriceEstimateRequestable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "a40ebe03c74faf79a86b19ae902307c8";

export default node;
