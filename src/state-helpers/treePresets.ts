import { tree44 } from "@musicenviro/ui-elements";

export const tree_44_16ths = tree44

export const tree_44_triplets = {
    nodes: [...Array(4)].map(_ => ({
        units: 1,
        subtree: {
            nodes: [1, 1, 1]
        }
    }))
}

export const tree_34_16ths = {
    nodes: [...Array(3)].map(_ => ({
        units: 1,
        subtree: {
            nodes: [1, 1, 1, 1]
        }
    }))
}