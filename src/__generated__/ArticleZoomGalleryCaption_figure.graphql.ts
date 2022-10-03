/**
 * @generated SignedSource<<69076965612fde13cf5863c9239acece>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGalleryCaption_figure$data = {
  readonly __typename: "Artwork";
  readonly href: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  readonly __typename: "ArticleImageSection";
  readonly caption: string | null;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
};
export type ArticleZoomGalleryCaption_figure$key = {
  readonly " $data"?: ArticleZoomGalleryCaption_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryCaption_figure">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleZoomGalleryCaption_figure",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Metadata_artwork"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        }
      ],
      "type": "ArticleImageSection",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};

(node as any).hash = "9542cbe3378e46fa0ff671166b18b18d";

export default node;
