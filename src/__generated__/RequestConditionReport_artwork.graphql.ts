/**
 * @generated SignedSource<<2cdd8efdf6db00503865e760061b5fd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReport_artwork$data = {
  readonly internalID: string;
  readonly slug: string;
  readonly saleArtwork: {
    readonly internalID: string;
  } | null;
  readonly " $fragmentType": "RequestConditionReport_artwork";
};
export type RequestConditionReport_artwork$key = {
  readonly " $data"?: RequestConditionReport_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestConditionReport_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "e20d4fa964b57dd0a75664fa56741ed4";

export default node;
