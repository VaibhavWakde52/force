/**
 * @generated SignedSource<<2329a48ed01028626c3a8c11b5c2e65e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistsCarousel_partner$data = {
  readonly artistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly counts: {
        readonly artworks: any | null;
      } | null;
      readonly node: {
        readonly id: string;
        readonly slug: string;
      } | null;
      readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistsCarouselItem_artist">;
    } | null> | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "PartnerArtistsCarousel_partner";
};
export type PartnerArtistsCarousel_partner$key = {
  readonly " $data"?: PartnerArtistsCarousel_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistsCarousel_partner">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistsCarousel_partner",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "hasPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "artworks",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerArtistsCarouselItem_artist"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,first:20,hasPublishedArtworks:true)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();

(node as any).hash = "b4252ea48c05f4c22efdc890b6891d28";

export default node;
