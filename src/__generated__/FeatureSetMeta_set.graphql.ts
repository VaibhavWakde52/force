/**
 * @generated SignedSource<<bf808b0bb7755026243db7337c18c744>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureSetMeta_set$data = {
  readonly description: string | null;
  readonly name: string | null;
  readonly " $fragmentType": "FeatureSetMeta_set";
};
export type FeatureSetMeta_set$key = {
  readonly " $data"?: FeatureSetMeta_set$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetMeta_set">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetMeta_set",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "e1163832a9d3f97595ab010c0dc8ccf5";

export default node;
