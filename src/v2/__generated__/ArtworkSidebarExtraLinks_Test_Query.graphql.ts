/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarExtraLinks_Test_QueryVariables = {};
export type ArtworkSidebarExtraLinks_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarExtraLinks_artwork">;
    } | null;
};
export type ArtworkSidebarExtraLinks_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly internalID: string;
        readonly is_in_auction: boolean | null;
        readonly is_for_sale: boolean | null;
        readonly is_acquireable: boolean | null;
        readonly is_inquireable: boolean | null;
        readonly artists: ReadonlyArray<({
            readonly is_consignable: boolean | null;
            readonly id: string | null;
        }) | null> | null;
        readonly sale: ({
            readonly is_closed: boolean | null;
            readonly isBenefit: boolean | null;
            readonly partner: ({
                readonly name: string | null;
                readonly id: string | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarExtraLinks_Test_Query = {
    readonly response: ArtworkSidebarExtraLinks_Test_QueryResponse;
    readonly variables: ArtworkSidebarExtraLinks_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarExtraLinks_Test_QueryRawResponse;
};



/*
query ArtworkSidebarExtraLinks_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarExtraLinks_artwork
    id
  }
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  internalID
  is_in_auction: isInAuction
  is_for_sale: isForSale
  is_acquireable: isAcquireable
  is_inquireable: isInquireable
  artists {
    is_consignable: isConsignable
    id
  }
  sale {
    is_closed: isClosed
    isBenefit
    partner {
      name
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarExtraLinks_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_in_auction",
            "name": "isInAuction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_for_sale",
            "name": "isForSale",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_acquireable",
            "name": "isAcquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_inquireable",
            "name": "isInquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "is_consignable",
                "name": "isConsignable",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "is_closed",
                "name": "isClosed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partner",
                "storageKey": null,
                "args": null,
                "concreteType": "Partner",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ]
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarExtraLinks_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarExtraLinks_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0539f2867a3fb30a8f29529d8f731ebd';
export default node;
