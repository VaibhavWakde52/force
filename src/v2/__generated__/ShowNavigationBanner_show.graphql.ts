/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowNavigationBanner_show = {
    readonly fair: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly " $refType": "ShowNavigationBanner_show";
};
export type ShowNavigationBanner_show$data = ShowNavigationBanner_show;
export type ShowNavigationBanner_show$key = {
    readonly " $data"?: ShowNavigationBanner_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowNavigationBanner_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowNavigationBanner_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
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
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = 'd1fd147f53bfaa8d1825b057ad1d28a7';
export default node;
